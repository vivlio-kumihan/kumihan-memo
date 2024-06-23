// カートのクラス

"use strict";

class TakeCart {
  constructor() {
    // 配列カートを初期化。
    this.cartOnLSIns = JSON.parse(localStorage.getItem("localStorageCart")) || [];

    // カートのDOMを生成。
    this.cartDOM = document.querySelector(".cart");

    // take-cart__calc.jsのCartResultCalcクラスを初期化。
    this.cartResultCalcIns = new CartResultCalc(this);

    // メインの関数。
    this._init();
  }


  // カートのデータの追加・変化をlocalStorageへ保存。
  saveCartToLocalStorage() {
    localStorage.setItem("localStorageCart", JSON.stringify(this.cartOnLSIns));
    // カート保存時にCartResultCalcクラスもインスタンスを再作成。localStorageと同期させる心臓部。
    this.cartResultCalcIns = new CartResultCalc(this);
  }
  

  // 注文するタイプの数量についての取り扱いを関数に定義
  updateOrderTypeQuantity(localStrageCartItem, typeName, increment) {
    localStrageCartItem.types.forEach(type => {
      if (type.name === typeName) {
        type.quantity += increment;
        // 数量が負の値にならないようにする
        type.quantity = Math.max(0, type.quantity);

        // 対応するDOM要素の数量を更新
        const targetTypeQuantityEl = document.querySelector(`[data-item-name="${localStrageCartItem.name}"][data-item-type-name="${typeName}"]`);
        // タイプの数量の更新
        if (targetTypeQuantityEl) {
          targetTypeQuantityEl.textContent = type.quantity;
        }

        // subtotalを計算してlocalStrageCartItemを更新
        const subQuantity = localStrageCartItem.types.reduce((sum, type) => sum + type.quantity, 0);
        localStrageCartItem.subTotalPrice = subQuantity > 0 ? localStrageCartItem.price * subQuantity : "―";
        localStrageCartItem.subTotalWeight = subQuantity > 0 ? localStrageCartItem.weight * subQuantity : localStrageCartItem.weight;

        // subtotalを表示するDOM要素を更新
        const namezSubTotal = document.querySelector(`[data-namez-sub-total="${localStrageCartItem.name}"]`);
        if (namezSubTotal) {
          namezSubTotal.textContent = localStrageCartItem.subTotalPrice > 0 ? localStrageCartItem.subTotalPrice : "―";
        }  

        // 変更をLocalStorageへ保存
        this.saveCartToLocalStorage();                 
      }
    });
  }


  // アイテムを削除で発火する事柄に関する関数を定義。
  removeItemFn(cartItemDOM, localStrageCartItem, removedEl) {
    cartItemDOM.classList.add("cart__item-removed");
    setTimeout(() => cartItemDOM.remove(), 300);
    this.cartOnLSIns = this.cartOnLSIns.filter(cartItem => cartItem.name !== localStrageCartItem.name);
    removedEl.textContent = "Add To Cart";
    removedEl.disabled = false;
    this.saveCartToLocalStorage();
    // CartResultCalc の orderedEachItemResult から該当アイテムを削除する
    this.cartResultCalcIns.removeOrderedItem(localStrageCartItem.name);
  }


  // イベントリスナーを登録した関数を定義。
  handleCartItem(cartItemDOM, localStrageCartItem, targetEl) {
    // プラス、マイナス、削除ボタンのDOM生成。
    const plusBtns = cartItemDOM.querySelectorAll('[data-action="INCREASE_ITEM"]');
    const minusBtns = cartItemDOM.querySelectorAll('[data-action="DECREASE_ITEM"]');
    const removeBtn = cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]');

    // プラスボタンのイベント。
    plusBtns.forEach(plusBtn => {
      plusBtn.addEventListener("click", () => {
        const typeName = plusBtn.getAttribute("data-type-fluctuation");
        this.updateOrderTypeQuantity(localStrageCartItem, typeName, 1);          
      });   
    });
    
    // マイナスボタンのイベント。
    minusBtns.forEach(minusBtn => {
      minusBtn.addEventListener("click", () => {
        const typeName = minusBtn.getAttribute("data-type-fluctuation");
        this.updateOrderTypeQuantity(localStrageCartItem, typeName, -1);      
      });
    });


    // 削除ボタンのイベント。
    removeBtn.addEventListener("click", () => {
      this.cartOnLSIns.forEach(cartItem => {
        cartItem.name === localStrageCartItem.name
          && this.removeItemFn(cartItemDOM, localStrageCartItem, targetEl);
      });
    });
  }

  
  // product要素のカート追加ボタンの様子を扱う関数を定義。
  productAddBtnStateFn(elem, changeText, bool) {
    elem.textContent = changeText;
    elem.disabled = bool;
  }


  // cart要素に購入予定の商品のDOMを追加する関数を定義。
  createCartItemDOM(localStrageCartItem) {
    // typeのリストを生成。
    const typeLiElms = Array.from(localStrageCartItem.types)
                        .reduce((liElements, { name, quantity }) => {
      // typeがないitemについては、type名を表示させない。
      const displayName = name !== "SELF" ? name : "";
      // li要素のテンプレートを作成    
      const liEl = `
        <li>
          <div class="item-title">${displayName}</div>
          <div class="counter">
            <button class="btn btn__primary btn__small" data-action="DECREASE_ITEM" data-type-fluctuation="${name}">&minus;</button>
            <h3 class="cart__item-type-quantity" data-item-name="${localStrageCartItem.name}" data-item-type-name="${name}">${quantity}</h3>
            <button class="btn btn__primary btn__small" data-action="INCREASE_ITEM" data-type-fluctuation="${name}">&plus;</button>
          </div>
        </li>
      `;
      // 生成したli要素を連結して返す      
      return liElements + liEl;
    }, "");   

    this.cartDOM.insertAdjacentHTML("beforeend", `
      <div class="cart__item" data-name="${localStrageCartItem.name}">
        <img class="cart__item-image" src="${localStrageCartItem.image}" alt="${localStrageCartItem.name}"></img>
        <h3 class="cart__item-name">${localStrageCartItem.name}</h3>
        <h3 class="cart__item-price">${localStrageCartItem.price}</h3>
        <h3 class="cart__item-sub-total" data-namez-sub-total="${localStrageCartItem.name}">${localStrageCartItem.subTotalPrice}</h3>
        <ul class="cart__item-types">${typeLiElms}</ul>
        <button class="btn btn__danger btn__small" data-action="REMOVE_ITEM">&times;</button>
      </div>
    `);

    return this.cartDOM.querySelector(`.cart__item[data-name="${localStrageCartItem.name}"]`);
  }


  // リロード後にLocalStrageに保存している配列cartの値を使って
  // product要素のボタンの状態を維持するための関数を定義。
  // また、リロード後は、こちらのhandleCartItem関数で状態変化を扱う。
  afterReloadeGenerateCartDOM() {
    this.cartOnLSIns.forEach(localStrageCartItem => {
      const cartItemEl = this.createCartItemDOM(localStrageCartItem);
      const productAddToCartBtnEl = document.querySelector(`[data-productName="${localStrageCartItem.name}"]`);
      productAddToCartBtnEl
        && this.productAddBtnStateFn(productAddToCartBtnEl, "In Cart", true);
      this.handleCartItem(cartItemEl, localStrageCartItem, productAddToCartBtnEl);
    });
  }


  _init() {
    // カート追加ボタン（複数）のインスタンスを待機。
    // 追加ボタンのクリックでアプリが発火する。
    this.addToCartBtns = document.querySelectorAll('[data-action="ADD_TO_CART"]');    
    this.addToCartBtns.forEach((addToCartBtnEl) => {
      // 追加ボタンをクリックするイベントを通して購入（予定）商品のインスタンスを発生させる。
      // このアプリの諸元の発火元。  
      addToCartBtnEl.addEventListener("click", () => {
        // 選択した商品のDOMを生成。
        const selectProductEl = addToCartBtnEl.parentElement;

        // typeパラメーターに値を代入する。
        const types = selectProductEl.querySelectorAll(".product__type-item");
        let typesArr = [];
        if (types.length !== 0) {
          typesArr = Array.from(types).reduce((arr, dom) => {
            arr.push({ name: dom.textContent, quantity: 0 });
            return arr;
          }, []);
        } else {
          typesArr = [{ name: "SELF", quantity: 0 }];
        }        
        
        // 選択した商品各項目の値をオブジェクトに格納。
        const localStrageCartItem = {
          image: selectProductEl.querySelector(".product__image").src,
          name: selectProductEl.querySelector(".product__name").textContent,
          types: typesArr,
          price: selectProductEl.querySelector(".product__price").textContent,
          subTotalPrice: "―",
          weight: selectProductEl.querySelector(".product__weight").textContent,
          subTotalWeight: "―",
          inCart: true
        };
    
        // カートに投入する商品と同じものがカートの中にあれば『真（true）』を返す。
        const isInCart = this.cartOnLSIns.some(cartItem => cartItem.name === localStrageCartItem.name);
        // カートに投入する商品と同じものがカートの中に『無い』ことを条件に、
        // `カートのDOM`に`商品のDOM`を差し込む。
        if (!isInCart) {
          // 選択した商品名の属性を持った独自のDOMを生成
          const cartItemEl = this.createCartItemDOM(localStrageCartItem);
          // カート配列に商品のオブジェクトを差し込む。
          this.cartOnLSIns.push(localStrageCartItem);
          // カートに追加ボタンの表示を変える。
          this.productAddBtnStateFn(addToCartBtnEl, "In Cart", true);
          // localStorageへ保存。
          this.saveCartToLocalStorage();
          // カートの中で独立した商品のインスタンスを確保し状態を変えられるように準備した関数を宣言する。
          // 商品内のボタンをクリックする度にこの関数が呼ばれる。      
          this.handleCartItem(cartItemEl, localStrageCartItem, addToCartBtnEl);
        }
      });
    });

    // 注文を作る。
    this.confirmOrderBtn = document.querySelector(".order__confirm");
    this.orderResultEl = document.querySelector(".order-result");
    this.backToCartBtn = document.querySelector(".order__back-to-cart");

    this.confirmOrderBtn.addEventListener("click", () => {
      const getOrderlistEl = () => {
        // orderedEachItemResultFn()から配列を取得する。
        const orderItems = this.cartResultCalcIns.orderedEachItemResultFn();
        // reduce()を使用してリストアイテムのHTMLを生成する。
        const liContent = orderItems.reduce((acc, obj) => {
          // 個数はオブジェクトなので、文字列に変換するため分けて処理する。
          const orderQuantity = Object.keys(obj["内訳"]).reduce((acc, key) => {
            const list = key !== "SELF"
              ? `<span>${key}／${obj["内訳"][key]}個</span>`
              : `<span>${obj["内訳"][key]}個</span>`;
            return acc + list;
          }, "");
          // li要素の生成。
          const itemLiContent = `
            <li data-order-item-name=${obj["品名"]}>
              <div class="name">品名 : ${obj["品名"]}</div>
              <div class="quantity">数量 : ${orderQuantity}</div>
              <div class="quantity">重量 : ${obj["重量小計"]}g</div>
              <div class="sub-total">小計 : ${obj["小計"]}円</div>
            </li>
          `;
          // accumulatorに現在のアイテムを追加して統合していく。
          return acc + itemLiContent;
        }, "");
        return liContent;
      };

      // 既存のリストをクリア
      this.orderResultEl.innerHTML = '';      

      // 生成されたHTML文字列をDOM要素に変換
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = getOrderlistEl();
      Array.from(tempDiv.children).forEach(el => {
        this.orderResultEl.prepend(el);
      })
    });


    // 戻るボタンのイベントリスナー。
    this.backToCartBtn.addEventListener("click", () => {
      this.orderResultEl.innerHTML = '';
    });


    // ページ読み込み時にカートを復元。
    this.afterReloadeGenerateCartDOM();
  }
}