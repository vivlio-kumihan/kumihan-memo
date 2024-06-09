"use strict";

class TakeCart {
  constructor() {
    // 配列カートを初期化。
    this.cart = JSON.parse(localStorage.getItem("localStorageCart")) || [];
    // カートのDOMを生成。
    this.cartDOM = document.querySelector(".cart");
    // カートに追加するボタンのDOM生成。
    this.addToCartBtns = document.querySelectorAll('[data-action="ADD_TO_CART"]');
    // メインの関数
    this.init();
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
  removeItemFn(cartItemDOM, productObj, removedEl) {
    cartItemDOM.classList.add("cart__item-removed");
    setTimeout(() => cartItemDOM.remove(), 300);
    this.cart = this.cart.filter(cartItem => cartItem.name !== productObj.name);
    removedEl.textContent = "Add To Cart";
    removedEl.disabled = false;
    // localStorageへ保存。
    this.saveCartToLocalStorage();
  }
  // イベントリスナーを登録した関数を定義。
  handleCartItem(cartItemDOM, productObj, targetEl) {
    // プラス、マイナス、削除ボタンのDOM生成。
    const plusBtn = cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]');
    const minusBtn = cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]');
    const removeBtn = cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]');

    // プラスボタンのイベント。
    plusBtn.addEventListener("click", () => {
      this.cart.forEach(cartItem => {
        if (cartItem.name === productObj.name) {
          this.updateCartItemQuantity(cartItemDOM, cartItem, 1);
        }
      });
    });

    // マイナスボタンのイベント。
    minusBtn.addEventListener("click", () => {
      this.cart.forEach(cartItem => {
        if (cartItem.name === productObj.name) {
          cartItem.quantity > 1
            ? this.updateCartItemQuantity(cartItemDOM, cartItem, -1)
            : this.removeItemFn(cartItemDOM, productObj, targetEl);
        }
      });
    });

    // 削除ボタンのイベント。
    removeBtn.addEventListener("click", () => {
      this.cart.forEach(cartItem => {
        cartItem.name === productObj.name
          && this.removeItemFn(cartItemDOM, productObj, targetEl);
      });
    });
  }
  // product要素のカート追加ボタンの様子を扱う関数を定義。
  productAddBtnStateFn(elem, changeText, bool) {
    elem.textContent = changeText;
    elem.disabled = bool;
  }
  // cart要素に購入予定の商品のDOMを追加する関数を定義。
  createCartItemDOM(productObj) {
    this.cartDOM.insertAdjacentHTML("beforeend", `
      <div class="cart__item" data-name="${productObj.name}">
        <img class="cart__item-image" src="${productObj.image}" alt="${productObj.name}"></img>
        <h3 class="cart__item-name">${productObj.name}</h3>
        <h3 class="cart__item-price">${productObj.price}</h3>
        <button class="btn btn__primary btn__small" data-action="DECREASE_ITEM">&minus;</button>
        <h3 class="cart__item-quantity">${productObj.quantity}</h3>
        <button class="btn btn__primary btn__small" data-action="INCREASE_ITEM">&plus;</button>
        <button class="btn btn__danger btn__small" data-action="REMOVE_ITEM">&times;</button>
      </div>
    `);
    return this.cartDOM.querySelector(`.cart__item[data-name="${productObj.name}"]`);
  }
  // リロード後にLocalStrageに保存しているcart配列の値を使って
  // product要素のボタンの状態を維持するための関数を定義。
  // また、リロード後は、こちらのhandleCartItem関数で状態変化を扱う。
  afterReloadeGenerateCartDOM() {
    this.cart.forEach(productObj => {
      const cartItemEl = this.createCartItemDOM(productObj);
      const productAddToCartBtnEl = document.querySelector(`[data-product-name="${productObj.name}"]`);
      productAddToCartBtnEl &&
        this.productAddBtnStateFn(productAddToCartBtnEl, "In Cart", true);
      this.handleCartItem(cartItemEl, productObj, productAddToCartBtnEl);
    });
  }
  init() {
    // カート追加ボタン（複数）のインスタンスを待機。
    this.addToCartBtns.forEach((addToCartBtnEl) => {
      // 追加ボタンをクリックするイベントを通して購入（予定）商品のインスタンスを発生させる。
      // このアプリの諸元の発火元。  
      addToCartBtnEl.addEventListener("click", () => {
        // 選択した商品のDOMを生成。
        const productEl = addToCartBtnEl.parentElement;
        // 選択した商品各項目の値をオブジェクトに格納。
        const productObj = {
          image: productEl.querySelector(".product__image").src,
          name: productEl.querySelector(".product__name").textContent,
          price: productEl.querySelector(".product__price").textContent,
          quantity: 1,
          inCart: true
        };
    
        // カートに投入する商品と同じものがカートの中にあれば『真（true）』を返す。
        const isInCart = this.cart.some(cartItem => cartItem.name === productObj.name);
        // カートに投入する商品と同じものがカートの中に『無い』ことを条件に、
        // `カートのDOM`に`商品のDOM`を差し込む。
        if (!isInCart) {
          // 選択した商品名の属性を持った独自のDOMを生成
          const cartItemEl = this.createCartItemDOM(productObj);
          // カート配列に商品のオブジェクトを差し込む。
          this.cart.push(productObj);
          // カートに追加ボタンの表示を変える。
          this.productAddBtnStateFn(addToCartBtnEl,"In Cart", true);
          // localStorageへ保存。
          this.saveCartToLocalStorage();
          // カートの中で独立した商品のインスタンスを確保し状態を変えられるように準備した関数を宣言する。
          // 商品内のボタンをクリックする度にこの関数が呼ばれる。      
          this.handleCartItem(cartItemEl, productObj, addToCartBtnEl);
        }
      });
    });
    
    // ページ読み込み時にカートを復元
    document.addEventListener("DOMContentLoaded", () => {
      this.afterReloadeGenerateCartDOM();
    });
  }
}

new TakeCart();