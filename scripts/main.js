"use strict";

let cart = [];
const cartDOM = document.querySelector(".cart");
const addToCartBtns = document.querySelectorAll('[data-action="ADD_TO_CART"]');

addToCartBtns.forEach((addToCartBtnEl) => {
  addToCartBtnEl.addEventListener("click", () => {
    const productEl = addToCartBtnEl.parentElement;
    const product = {
      image: productEl.querySelector(".product__image").src,
      name: productEl.querySelector(".product__name").textContent,
      price: productEl.querySelector(".product__price").textContent,
      quantity: 1
    };

    const isInCart = cart.filter((cartItem) => (cartItem.name === product.name)).length > 0;
    if (!isInCart) {
      cartDOM.insertAdjacentHTML("beforeend", `
        <div class="cart__item">
          <img class="cart__item-image" src="${ product.image }" alt="${ product.name }"></img>
          <h3 class="cart__item-name">${ product.name }</h3>
          <h3 class="cart__imte-price">${ product.price }</h3>
          <button class="btn btn__primary btn__small" data-action="DECRESE_ITEM">&minus;</button>
          <h3 class="cart__item-quantity">${ product.quantity }</h3>
          <button class="btn btn__primary btn__small" data-action="INCREASE_ITEM">&plus;</button>
          <button class="btn btn__danger btn__small" data-action="REMOVE_ITEM">&times;</button>
        </div>
        `);
  
      cart.push(product);
      addToCartBtnEl.textContent = "In Cart";

      const cartItems = cartDOM.querySelectorAll(".cart__item");
      cartItems.forEach(cartItemDOM => {
        if (cartItemDOM.querySelector(".cart__item-name").textContent === product.name) {
          const pluseBtn = cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]');
          pluseBtn.addEventListener("click", () => {
            cart.forEach(cartItem => {
              if (cartItem.name === product.name) {
                cartItem.quantity++;
                cartItemDOM.querySelector(".cart__item-quantity").textContent = cartItem.quantity;
              }
            });
          });
        }
      });
    }
  });
});
