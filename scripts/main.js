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


//////////////////////////////////

// "use strict";

// // 配列カートを初期化。
// let cart = [];
// console.log(cart);
// // カートのDOMを生成。
// const cartDOM = document.querySelector(".cart");
// // カートに追加するボタンのDOM生成。
// const addToCartBtns = document.querySelectorAll('[data-action="ADD_TO_CART"]');

// // 注文数の取り扱いについての関数。
// const updateCartItemQuantityFn = (cartItemDOM, cartItem, increment) => {
//   cartItem.quantity += increment;
//   cartItemDOM.querySelector(".cart__item-quantity").textContent = cartItem.quantity;
//   (cartItem.quantity === 1)
//     ? cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.add("btn__danger")
//     : cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.remove("btn__danger");
// };

// // アイテムを削除で発火する事柄に関する関数。
// const removeItemFn = (cartItemDOM, productObj, addToCartBtnEl) => {
//   cartItemDOM.classList.add("cart__item-removed");
//   setTimeout(() => cartItemDOM.remove(), 300);
//   cart = cart.filter(cartItem => cartItem.name !== productObj.name);
//   addToCartBtnEl.textContent = "Add To Cart";
//   addToCartBtnEl.disabled = false;
// };

// const handleCartItem = (cartItemDOM, productObj, addToCartBtnEl) => {
//   // プラス、マイナス、削除ボタンのDOM生成。
//   const plusBtn = cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]');
//   const minusBtn = cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]');
//   const removeBtn = cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]');

//   // プラスボタンのイベント。
//   plusBtn.addEventListener("click", () => {
//     cart.forEach(cartItem => {
//       cartItem.name === productObj.name
//         && updateCartItemQuantityFn(cartItemDOM, cartItem, 1);
//     });
//   });

//   minusBtn.addEventListener("click", () => {
//     cart.forEach(cartItem => {
//       if (cartItem.name === productObj.name) {
//         cartItem.quantity > 1
//           ? updateCartItemQuantityFn(cartItemDOM, cartItem, -1)
//           : removeItemFn(cartItemDOM, productObj, addToCartBtnEl);
//       }
//     });
//   });

//   // 削除ボタンのイベント。
//   removeBtn.addEventListener("click", () => {
//     cart.forEach(cartItem => {
//       cartItem.name === productObj.name
//         && removeItemFn(cartItemDOM, productObj, addToCartBtnEl);
//     });
//   });
// };

// // 複数あるカート追加ボタンのインスタンスを待機。
// addToCartBtns.forEach((addToCartBtnEl) => {
//   // 追加ボタンをクリックするイベントを通して購入（予定）商品のインスタンスを発生させる。
//   // このアプリの諸元の発火元。
//   addToCartBtnEl.addEventListener("click", () => {
//     // 選択した商品のDOMを生成。
//     const productEl = addToCartBtnEl.parentElement;
//     // 選択した商品各項目の値をオブジェクトに格納。
//     const productObj = {
//       image: productEl.querySelector(".product__image").src,
//       name: productEl.querySelector(".product__name").textContent,
//       price: productEl.querySelector(".product__price").textContent,
//       quantity: 1
//     }; 

//     // カートに投入する商品と同じものがカートの中にあれば『真（true）』を返す。
//     const isInCart = cart.some(cartItem => cartItem.name === productObj.name);
//     // カートに投入する商品と同じものがカートの中に『無い』ことを条件に、
//     // `カートのDOM`に`商品のDOM`を差し込む。
//     if (!isInCart) {
//       cartDOM.insertAdjacentHTML("beforeend", `
//         <div class="cart__item" data-name="${productObj.name}">
//           <img class="cart__item-image" src="${productObj.image}" alt="${productObj.name}"></img>
//           <h3 class="cart__item-name">${productObj.name}</h3>
//           <h3 class="cart__item-price">${productObj.price}</h3>
//           <button class="btn btn__primary btn__small" data-action="DECREASE_ITEM">&minus;</button>
//           <h3 class="cart__item-quantity">${productObj.quantity}</h3>
//           <button class="btn btn__primary btn__small" data-action="INCREASE_ITEM">&plus;</button>
//           <button class="btn btn__danger btn__small" data-action="REMOVE_ITEM">&times;</button>
//         </div>
//       `);
//       const cartItemEl = cartDOM.querySelector(`.cart__item[data-name="${productObj.name}"]`);

//       // カートの中で独立した商品のインスタンスを確保し、状態を変えられるように準備した関数を宣言する。
//       // 商品内のボタンをクリックする度にこの関数が呼ばれる。
//       handleCartItem(cartItemEl, productObj, addToCartBtnEl);
//       // カート配列に商品のオブジェクトを差し込む。
//       cart.push(productObj);
//       // カートに追加ボタンの表示を変える。
//       addToCartBtnEl.textContent = "In Cart";
//       addToCartBtnEl.disabled = true;
//     }
//   });
// });

//////////////////////////////////

"use strict";

// 配列カートを初期化。
let cart = JSON.parse(localStorage.getItem("localStorageCart")) || [];
// カートのDOMを生成。
const cartDOM = document.querySelector(".cart");
// カートに追加するボタンのDOM生成。
const addToCartBtns = document.querySelectorAll('[data-action="ADD_TO_CART"]');

const saveCartToLocalStorage = () => {
  localStorage.setItem("localStorageCart", JSON.stringify(cart));
};

// 注文数の取り扱いについての関数。
const updateCartItemQuantity = (cartItemDOM, cartItem, increment) => {
  cartItem.quantity += increment;
  cartItemDOM.querySelector(".cart__item-quantity").textContent = cartItem.quantity;
  (cartItem.quantity === 1)
    ? cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.add("btn__danger")
    : cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.remove("btn__danger");
  saveCartToLocalStorage();
};

// アイテムを削除で発火する事柄に関する関数。
const removeItemFn = (cartItemDOM, productObj, addToCartBtnEl) => {
  cartItemDOM.classList.add("cart__item-removed");
  setTimeout(() => cartItemDOM.remove(), 300);
  cart = cart.filter(cartItem => cartItem.name !== productObj.name);
  addToCartBtnEl.textContent = "Add To Cart";
  addToCartBtnEl.disabled = false;
  saveCartToLocalStorage();
};

const handleCartItem = (cartItemDOM, productObj, addToCartBtnEl) => {
  // プラス、マイナス、削除ボタンのDOM生成。
  const plusBtn = cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]');
  const minusBtn = cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]');
  const removeBtn = cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]');

  // プラスボタンのイベント。
  plusBtn.addEventListener("click", () => {
    cart.forEach(cartItem => {
      if (cartItem.name === productObj.name) {
        updateCartItemQuantity(cartItemDOM, cartItem, 1);
      }
    });
  });

  // マイナスボタンのイベント。
  minusBtn.addEventListener("click", () => {
    cart.forEach(cartItem => {
      if (cartItem.name === productObj.name) {
        if (cartItem.quantity > 1) {
          updateCartItemQuantity(cartItemDOM, cartItem, -1);
        } else {
          removeItemFn(cartItemDOM, productObj, addToCartBtnEl);
        }
      }
    });
  });

  // 削除ボタンのイベント。
  removeBtn.addEventListener("click", () => {
    cart.forEach(cartItem => {
      if (cartItem.name === productObj.name) {
        removeItemFn(cartItemDOM, productObj, addToCartBtnEl);
      }
    });
  });
};

const createCartItemDOM = (productObj) => {
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
  return cartDOM.querySelector(`.cart__item[data-name="${productObj.name}"]`);
};

const populateCartDOM = () => {
  cart.forEach(productObj => {
    const cartItemEl = createCartItemDOM(productObj);
    const productAddToCartBtnEl = document.querySelector(`[data-product-name="${productObj.name}"]`);
    if (productAddToCartBtnEl) {
      productAddToCartBtnEl.textContent = "In Cart";
      productAddToCartBtnEl.disabled = true;
    }
    handleCartItem(cartItemEl, productObj, productAddToCartBtnEl);
  });
};

// 複数あるカート追加ボタンのインスタンスを待機。
addToCartBtns.forEach((addToCartBtnEl) => {
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
      inCart: true // ボタンの状態を追加
    };

    // カートに投入する商品と同じものがカートの中にあれば『真（true）』を返す。
    const isInCart = cart.some(cartItem => cartItem.name === productObj.name);
    // カートに投入する商品と同じものがカートの中に『無い』ことを条件に、
    // `カートのDOM`に`商品のDOM`を差し込む。
    if (!isInCart) {
      // 選択した商品名の属性を持った独自のDOMを生成
      const cartItemEl = createCartItemDOM(productObj);
      // カート配列に商品のオブジェクトを差し込む。
      cart.push(productObj);
      // カートに追加ボタンの表示を変える。
      addToCartBtnEl.textContent = "In Cart";
      addToCartBtnEl.disabled = true;
      saveCartToLocalStorage();
      // カートの中で独立した商品のインスタンスを確保し、状態を変えられるように準備した関数を宣言する。
      // 商品内のボタンをクリックする度にこの関数が呼ばれる。      
      handleCartItem(cartItemEl, productObj, addToCartBtnEl);
    }
  });
});

// ページ読み込み時にカートを復元
document.addEventListener("DOMContentLoaded", () => {
  populateCartDOM();
  // ボタンの状態を復元
  cart.forEach(productObj => {
    const productAddToCartBtnEl = document.querySelector(`[data-product-name="${productObj.name}"]`);
    if (productAddToCartBtnEl && productObj.inCart) {
      productAddToCartBtnEl.textContent = "In Cart";
      productAddToCartBtnEl.disabled = true;
    }
  });
});








// "use strict";

// let cart = JSON.parse(localStorage.getItem("localStorageCart")) || [];
// const cartDOM = document.querySelector(".cart");
// const addToCartBtns = document.querySelectorAll('[data-action="ADD_TO_CART"]');

// const saveCartToLocalStorage = () => {
//   localStorage.setItem("localStorageCart", JSON.stringify(cart));
// };

// const updateCartItemQuantityFn = (cartItemDOM, cartItem, increment) => {
//   cartItem.quantity += increment;
//   cartItemDOM.querySelector(".cart__item-quantity").textContent = cartItem.quantity;
//   (cartItem.quantity === 1)
//     ? cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.add("btn__danger")
//     : cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.remove("btn__danger");
//   saveCartToLocalStorage();
// };

// const handleCartItem = (cartItemDOM, productObj, addToCartBtnEl) => {
//   const plusBtn = cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]');
//   const minusBtn = cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]');
//   const removeBtn = cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]');

//   const removeItemFn = () => {
//     cartItemDOM.classList.add("cart__item-removed");
//     setTimeout(() => cartItemDOM.remove(), 300);
//     cart = cart.filter(cartItem => cartItem.name !== productObj.name);
//     addToCartBtnEl.textContent = "Add To Cart";
//     addToCartBtnEl.disabled = false;
//     saveCartToLocalStorage();
//   };

//   plusBtn.addEventListener("click", () => {
//     cart.forEach(cartItem => {
//       if (cartItem.name === productObj.name) {
//         updateCartItemQuantityFn(cartItemDOM, cartItem, 1);
//       }
//     });
//   });

//   minusBtn.addEventListener("click", () => {
//     cart.forEach(cartItem => {
//       if (cartItem.name === productObj.name) {
//         if (cartItem.quantity > 1) {
//           updateCartItemQuantityFn(cartItemDOM, cartItem, -1);
//         } else {
//           removeItemFn();
//         }
//       }
//     });
//   });

//   removeBtn.addEventListener("click", () => {
//     cart.forEach(cartItem => {
//       if (cartItem.name === productObj.name) {
//         removeItemFn();
//       }
//     });
//   });
// };

// const populateCartDOM = () => {
//   cart.forEach(productObj => {
//     cartDOM.insertAdjacentHTML("beforeend", `
//       <div class="cart__item" data-name="${productObj.name}">
//         <img class="cart__item-image" src="${productObj.image}" alt="${productObj.name}"></img>
//         <h3 class="cart__item-name">${productObj.name}</h3>
//         <h3 class="cart__item-price">${productObj.price}</h3>
//         <button class="btn btn__primary btn__small" data-action="DECREASE_ITEM">&minus;</button>
//         <h3 class="cart__item-quantity">${productObj.quantity}</h3>
//         <button class="btn btn__primary btn__small" data-action="INCREASE_ITEM">&plus;</button>
//         <button class="btn btn__danger btn__small" data-action="REMOVE_ITEM">&times;</button>
//       </div>
//     `);

//     const cartItemEl = cartDOM.querySelector(`.cart__item[data-name="${productObj.name}"]`);
//     handleCartItem(cartItemEl, productObj, document.querySelector(`[data-name="${productObj.name}"] ~ [data-action="ADD_TO_CART"]`));
//   });
// };

// addToCartBtns.forEach((addToCartBtnEl) => {
//   addToCartBtnEl.addEventListener("click", () => {
//     const productEl = addToCartBtnEl.parentElement;
//     const productObj = {
//       image: productEl.querySelector(".product__image").src,
//       name: productEl.querySelector(".product__name").textContent,
//       price: productEl.querySelector(".product__price").textContent,
//       quantity: 1
//     }; 

//     const isInCart = cart.some(cartItem => cartItem.name === productObj.name);
//     if (!isInCart) {
//       cartDOM.insertAdjacentHTML("beforeend", `
//         <div class="cart__item" data-name="${productObj.name}">
//           <img class="cart__item-image" src="${productObj.image}" alt="${productObj.name}"></img>
//           <h3 class="cart__item-name">${productObj.name}</h3>
//           <h3 class="cart__item-price">${productObj.price}</h3>
//           <button class="btn btn__primary btn__small" data-action="DECREASE_ITEM">&minus;</button>
//           <h3 class="cart__item-quantity">${productObj.quantity}</h3>
//           <button class="btn btn__primary btn__small" data-action="INCREASE_ITEM">&plus;</button>
//           <button class="btn btn__danger btn__small" data-action="REMOVE_ITEM">&times;</button>
//         </div>
//       `);

//       cart.push(productObj);
//       addToCartBtnEl.textContent = "In Cart";
//       addToCartBtnEl.disabled = true;
//       saveCartToLocalStorage();

//       const cartItemEl = cartDOM.querySelector(`.cart__item[data-name="${productObj.name}"]`);
//       handleCartItem(cartItemEl, productObj, addToCartBtnEl);
//     }
//   });
// });

// // ページ読み込み時にカートを復元
// document.addEventListener("DOMContentLoaded", populateCartDOM);
