/* 
/*** カート機能を実装したクラス。
*/

"use strict";

class TakeCart {
  constructor() {
    // 配列カートを初期化。
    this.cart = JSON.parse(localStorage.getItem("localStorageCart")) || [];
    // カートのDOMを生成。
    this.cartDOM = document.querySelector(".cart");

    /////////////////////////////////// 
    // 削除点
    // // カートに追加するボタンのDOM生成。
    // this.addToCartBtns = document.querySelectorAll('[data-action="ADD_TO_CART"]');
    /////////////////////////////////// 

    // メインの関数
    this._init();
  }

  // カートのデータの追加・変化をlocalStorageへ保存。
  saveCartToLocalStorage() {
    localStorage.setItem("localStorageCart", JSON.stringify(this.cart));
  }
  // 注文数の取り扱いについての関数を定義。
  updateCartItemQuantity(cartItemDOM, cartItem, increment) {
    cartItem.quantity += increment;
    cartItemDOM.querySelector(".cart__item-quantity").textContent = cartItem.quantity;
    (cartItem.quantity === 1)
      ? cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.add("btn__danger")
      : cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.remove("btn__danger");
    // localStorageへ保存。
    this.saveCartToLocalStorage();
  }
  // アイテムを削除で発火する事柄に関する関数を定義。
  removeItemFn(cartItemDOM, localStrageCartItem, removedEl) {
    cartItemDOM.classList.add("cart__item-removed");
    setTimeout(() => cartItemDOM.remove(), 300);
    this.cart = this.cart.filter(cartItem => cartItem.name !== localStrageCartItem.name);
    removedEl.textContent = "Add To Cart";
    removedEl.disabled = false;
    // localStorageへ保存。
    this.saveCartToLocalStorage();
  }
  // イベントリスナーを登録した関数を定義。
  handleCartItem(cartItemDOM, localStrageCartItem, targetEl) {
    // プラス、マイナス、削除ボタンのDOM生成。
    const plusBtn = cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]');
    const minusBtn = cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]');
    const removeBtn = cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]');

    // プラスボタンのイベント。
    plusBtn.addEventListener("click", () => {
      this.cart.forEach(cartItem => {
        if (cartItem.name === localStrageCartItem.name) {
          this.updateCartItemQuantity(cartItemDOM, cartItem, 1);
        }
      });
    });

    // マイナスボタンのイベント。
    minusBtn.addEventListener("click", () => {
      this.cart.forEach(cartItem => {
        if (cartItem.name === localStrageCartItem.name) {
          cartItem.quantity > 1
            ? this.updateCartItemQuantity(cartItemDOM, cartItem, -1)
            : this.removeItemFn(cartItemDOM, localStrageCartItem, targetEl);
        }
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
    const typeLiElms = Array.from(localStrageCartItem.types).reduce((liElements, { name, quantity }) => {
      // typeがないitemについてはtype名を表示させない。
      name = name !== "SELF" ? name : "";
      // li要素のテンプレートを作成    
      const liEl = `
        <li>
          <div class="item-title">${name}</div>
          <div class="counter">
            <button class="btn btn__primary btn__small" data-action="DECREASE_ITEM">&minus;</button>
            <h3 class="cart__item-type-quantity">${quantity}</h3>
            <button class="btn btn__primary btn__small" data-action="INCREASE_ITEM">&plus;</button>
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
    console.log(this.cart);
    this.cart.forEach(localStrageCartItem => {
      const cartItemEl = this.createCartItemDOM(localStrageCartItem);
      console.log(cartItemEl);
      const productAddToCartBtnEl = document.querySelector(`[data-product-name="${localStrageCartItem.name}"]`);
      productAddToCartBtnEl &&
        this.productAddBtnStateFn(productAddToCartBtnEl, "In Cart", true);
      this.handleCartItem(cartItemEl, localStrageCartItem, productAddToCartBtnEl);
    });
  }
  _init() {
    // カート追加ボタン（複数）のインスタンスを待機。
    // 追加ボタンのクリックでアプリが発火する。

    ////////////////////////////////
    // 追加点
    this.addToCartBtns = document.querySelectorAll('[data-action="ADD_TO_CART"]');    
    ////////////////////////////////

    this.addToCartBtns.forEach((addToCartBtnEl) => {
      // 追加ボタンをクリックするイベントを通して購入（予定）商品のインスタンスを発生させる。
      // このアプリの諸元の発火元。  
      addToCartBtnEl.addEventListener("click", () => {
        // 選択した商品のDOMを生成。
        const selectProductEl = addToCartBtnEl.parentElement;
        
        // typeパラメーターに値を代入する。
        const types = selectProductEl.querySelectorAll(".product__type-item");
        const typeArray = Array.from(types).map(el => {
          return {
            name: el.textContent || "",
            quantity: 0
          };
        });

        // typesArrayが空の場合、デフォルトのキーと空文字列の値を追加
        if (typeArray.length === 0) {
          typeArray.push({name: "self", quantity: 0});
        }     
        
        // 選択した商品各項目の値をオブジェクトに格納。
        const localStrageCartItem = {
          image: selectProductEl.querySelector(".product__image").src,
          name: selectProductEl.querySelector(".product__name").textContent,
          types: typeArray,
          price: selectProductEl.querySelector(".product__price").textContent,
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
    
    // console.log(this.cart);
    // ページ読み込み時にカートを復元
    this.afterReloadeGenerateCartDOM();
    
    ///////////////////////////////////
    // 削除点
    // document.addEventListener("DOMContentLoaded", () => {
    //   this.afterReloadeGenerateCartDOM();
    // });
    ///////////////////////////////////
  }
}