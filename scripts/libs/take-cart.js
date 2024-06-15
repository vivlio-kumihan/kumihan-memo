/* 
/*** カート機能を実装したクラスを定義。
*/

"use strict";

class TakeCart {
  constructor() {
    // 配列カートを初期化。
    this.cart = JSON.parse(localStorage.getItem("localStorageCart")) || [];

    // カートのDOMを生成。
    this.cartDOM = document.querySelector(".cart");

    this.takeCartCalc = new TakeCartCalc(this);

    // console.log(this.cart);
    
    // メインの関数
    this._init();
  }


  // カートのデータの追加・変化をlocalStorageへ保存。
  saveCartToLocalStorage() {
    localStorage.setItem("localStorageCart", JSON.stringify(this.cart));
  }
  

  // 注文するタイプの数量についての取り扱いを関数に定義
  updateOrderTypeQuantity(localStrageCartItem, typeName, increment) {
    localStrageCartItem.types.forEach(type => {
      if (type.name === typeName) {
        type.quantity += increment;
        // 数量が負の値にならないようにする
        type.quantity = Math.max(0, type.quantity);
        this.saveCartToLocalStorage();
        
        // 対応するDOM要素の数量を更新
        const targetTypeQuantityEl = document.querySelector(`[data-item-name="${localStrageCartItem.name}"][data-item-type-name="${typeName}"]`);
        
        if (targetTypeQuantityEl) {
          // タイプの数量の更新
          targetTypeQuantityEl.textContent = type.quantity;
        }

        const orderedEachItemResults = this.takeCartCalc.orderedEachItemResult();
        let namezSubTotal = document.querySelector(`[data-namez-sub-total="${localStrageCartItem.name}`);
        orderedEachItemResults.forEach(item => {
          if (item["品名"] === localStrageCartItem.name) {
            const subQuantity = Object.values(item["内訳"]).reduce((sum, quantity) => sum + quantity, 0);
            console.log(subQuantity, typeof subQuantity);
            
            namezSubTotal.textContent =  typeof subQuantity === "number" ? item["小計"] : "―";
          }
        });
      }
    });
  }


  // アイテムを削除で発火する事柄に関する関数を定義。
  removeItemFn(cartItemDOM, localStrageCartItem, removedEl) {
    cartItemDOM.classList.add("cart__item-removed");
    setTimeout(() => cartItemDOM.remove(), 300);
    this.cart = this.cart.filter(cartItem => cartItem.name !== localStrageCartItem.name);
    removedEl.textContent = "Add To Cart";
    removedEl.disabled = false;
    this.saveCartToLocalStorage();
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
      this.cart.forEach(cartItem => {
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
        <h3 class="cart__item-sub-total" data-namez-sub-total="${localStrageCartItem.name}">―</h3>
        <ul class="cart__item-types">${typeLiElms}</ul>
        <button class="btn btn__danger btn__small" data-action="REMOVE_ITEM">&times;</button>
      </div>
    `);

    return this.cartDOM.querySelector(`.cart__item[data-name="${localStrageCartItem.name}"]`);
  }


  // リロード後にLocalStrageに保存しているcart配列の値を使って
  // product要素のボタンの状態を維持するための関数を定義。
  // また、リロード後は、こちらのhandleCartItem関数で状態変化を扱う。
  afterReloadeGenerateCartDOM() {
    this.cart.forEach(localStrageCartItem => {
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
          // subTotal: 0,
          quantity: 1,
          inCart: true
        };
    
        // カートに投入する商品と同じものがカートの中にあれば『真（true）』を返す。
        const isInCart = this.cart.some(cartItem => cartItem.name === localStrageCartItem.name);
        // カートに投入する商品と同じものがカートの中に『無い』ことを条件に、
        // `カートのDOM`に`商品のDOM`を差し込む。
        if (!isInCart) {
          // 選択した商品名の属性を持った独自のDOMを生成
          const cartItemEl = this.createCartItemDOM(localStrageCartItem);
          // カート配列に商品のオブジェクトを差し込む。
          this.cart.push(localStrageCartItem);
          // カートに追加ボタンの表示を変える。
          this.productAddBtnStateFn(addToCartBtnEl,"In Cart", true);
          // localStorageへ保存。
          this.saveCartToLocalStorage();
          // カートの中で独立した商品のインスタンスを確保し状態を変えられるように準備した関数を宣言する。
          // 商品内のボタンをクリックする度にこの関数が呼ばれる。      
          this.handleCartItem(cartItemEl, localStrageCartItem, addToCartBtnEl);
        }
      });
    });

    // ページ読み込み時にカートを復元
    this.afterReloadeGenerateCartDOM();
  }
}

// this.resultDOM = document.querySelector(".result");