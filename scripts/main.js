// "use strict";

// let cart = [];
// // let cart = JSON.parse(localStorage.getItem("localStrageCart")) || [];
// const cartDOM = document.querySelector(".cart");
// const addToCartBtns = document.querySelectorAll('[data-action="ADD_TO_CART"]');

// addToCartBtns.forEach((addToCartBtnEl) => {
//   addToCartBtnEl.addEventListener("click", () => {
//     const productObjEl = addToCartBtnEl.parentElement;
//     const productObj = {
//       image: productObjEl.querySelector(".productObj__image").src,
//       name: productObjEl.querySelector(".productObj__name").textContent,
//       price: productObjEl.querySelector(".productObj__price").textContent,
//       quantity: 1
//     };

//     const isInCart = cart.filter((cartItem) => (cartItem.name === productObj.name)).length > 0;
//     if (!isInCart) {
//       cartDOM.insertAdjacentHTML("beforeend", `
//         <div class="cart__item">
//           <img class="cart__item-image" src="${ productObj.image }" alt="${ productObj.name }"></img>
//           <h3 class="cart__item-name">${ productObj.name }</h3>
//           <h3 class="cart__imte-price">${ productObj.price }</h3>
//           <button class="btn btn__primary btn__small btn__danger" data-action="DECRESE_ITEM">&minus;</button>
//           <h3 class="cart__item-quantity">${ productObj.quantity }</h3>
//           <button class="btn btn__primary btn__small" data-action="INCREASE_ITEM">&plus;</button>
//           <button class="btn btn__danger btn__small" data-action="REMOVE_ITEM">&times;</button>
//         </div>
//         `);
  
//       cart.push(productObj);

//       // localStorage.setItem("localStrageCart", JSON.stringify(cart));

//       addToCartBtnEl.textContent = "In Cart";
//       addToCartBtnEl.disabled = true;

//       const cartItems = cartDOM.querySelectorAll(".cart__item");
//       cartItems.forEach(cartItemDOM => {
//         if (cartItemDOM.querySelector(".cart__item-name").textContent === productObj.name) {
//           const plusBtn = cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]');
//           plusBtn.addEventListener("click", () => {
//             cart.forEach(cartItem => {
//               if (cartItem.name === productObj.name) {
//                 cartItemDOM.querySelector(".cart__item-quantity").textContent = ++cartItem.quantity;
//                 cartItemDOM.querySelector('[data-action="DECRESE_ITEM"]').classList.remove("btn__danger");
//                 // localStorage.setItem("localStrageCart", JSON.stringify(cart));
//               }
//             });
//           });

//           const minusBtn = cartItemDOM.querySelector('[data-action="DECRESE_ITEM"]');
//           minusBtn.addEventListener("click", () => {
//             cart.forEach(cartItem => {
//               if (cartItem.name === productObj.name) {
//                 if (cartItem.quantity > 1) {
//                   cartItemDOM.querySelector(".cart__item-quantity").textContent = --cartItem.quantity;
//                   // localStorage.setItem("localStrageCart", JSON.stringify(cart));
//                 } else {
//                   removeItemFn(cartItemDOM, productObj, addToCartBtnEl);
//                 }
//                 cartItem.quantity === 1 
//                   && cartItemDOM.querySelector('[data-action="DECRESE_ITEM"]').classList.add("btn__danger");
//               }
//             });
//           });

//           const removeBtn = cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]');
//           removeBtn.addEventListener("click", () => {
//             cart.forEach(cartItem => { 
//               cartItem.name === productObj.name 
//                 && removeItemFn(cartItemDOM, productObj, addToCartBtnEl);
//             });
//           });
//         }
//       });
//     }
//   });
// });

// const removeItemFn = (cartItemDOM, productObj, addToCartBtnEl) => {
//   cartItemDOM.classList.add("cart__item-removed");
//   setTimeout(() => cartItemDOM.remove(), 300);
//   cart = cart.filter(cartItem => cartItem.name !== productObj.name);
//   // localStorage.setItem("localStrageCart", JSON.stringify(cart));
//   addToCartBtnEl.textContent = "Add To Cart";
//   addToCartBtnEl.disabled = false;
// };




"use strict";

let cart = [];
const cartDOM = document.querySelector(".cart");
const addToCartBtns = document.querySelectorAll('[data-action="ADD_TO_CART"]');

const updateCartItemQuantity = (cartItemDOM, cartItem, increment) => {
  cartItem.quantity += increment;
  cartItemDOM.querySelector(".cart__item-quantity").textContent = cartItem.quantity;
  (cartItem.quantity === 1)
    ? cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.add("btn__danger")
    : cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.remove("btn__danger");
};

const handleCartItem = (cartItemDOM, productObj, addToCartBtnEl) => {
  const plusBtn = cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]');
  const minusBtn = cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]');
  const removeBtn = cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]');

  const removeItemFn = () => {
    cartItemDOM.classList.add("cart__item-removed");
    setTimeout(() => cartItemDOM.remove(), 300);
    cart = cart.filter(cartItem => cartItem.name !== productObj.name);
    addToCartBtnEl.textContent = "Add To Cart";
    addToCartBtnEl.disabled = false;
  };

  plusBtn.addEventListener("click", () => {
    cart.forEach(cartItem => {
      cartItem.name === productObj.name
        && updateCartItemQuantity(cartItemDOM, cartItem, 1);
    });
  });

  minusBtn.addEventListener("click", () => {
    cart.forEach(cartItem => {
      if (cartItem.name === productObj.name) {
        cartItem.quantity > 1
          ? updateCartItemQuantity(cartItemDOM, cartItem, -1)
          : removeItemFn();
      }
    });
  });

  removeBtn.addEventListener("click", () => {
    cart.forEach(cartItem => {
      cartItem.name === productObj.name
        && removeItemFn();
    });
  });
};

addToCartBtns.forEach((addToCartBtnEl) => {
  addToCartBtnEl.addEventListener("click", () => {
    const productEl = addToCartBtnEl.parentElement;
    const productObj = {
      image: productEl.querySelector(".product__image").src,
      name: productEl.querySelector(".product__name").textContent,
      price: productEl.querySelector(".product__price").textContent,
      quantity: 1
    }; 

    const isInCart = cart.some(cartItem => cartItem.name === productObj.name);
    if (!isInCart) {
      cartDOM.insertAdjacentHTML("beforeend", `
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

      cart.push(productObj);
      addToCartBtnEl.textContent = "In Cart";
      addToCartBtnEl.disabled = true;

      const cartItemEl = cartDOM.querySelector(`.cart__item[data-name="${productObj.name}"]`);
      handleCartItem(cartItemEl, productObj, addToCartBtnEl);
    }
  });
});