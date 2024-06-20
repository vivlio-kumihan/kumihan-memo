"use strict";

class TakeCartOrder {
  constructor(takeCartInstance, takeCartCalcInstance) {
    this.takeCartInstance = takeCartInstance;
    this.takeCartCalc = takeCartCalcInstance;
    this.confirmOrderBtn = document.querySelector(".order__confirm");
    this.orderResultEl = document.querySelector(".order-result");
    this.backToCartBtn = document.querySelector(".order__back-to-cart");
    
    this._init();
  }

  _init() {
    this.confirmOrderBtn.addEventListener("click", () => {
      const getOrderlistEl = () => {
        const orderItems = this.takeCartCalc.orderedEachItemResult();
        console.log(orderItems);
        const liContent = orderItems.reduce((acc, obj) => {
          const orderQuantity = Object.keys(obj["内訳"]).reduce((acc, key) => {
            const list = key !== "SELF"
              ? `<span>${key}／${obj["内訳"][key]}個</span>`
              : `<span>${obj["内訳"][key]}個</span>`;
            return acc + list;
          }, "");
          const itemLiContent = `
            <li data-order-item-name=${obj["品名"]}>
              <div class="name">品名 : ${obj["品名"]}</div>
              <div class="quantity">数量 : ${orderQuantity}</div>
              <div class="sub-total">小計 : ${obj["小計"]}円</div>
            </li>
          `;
          return acc + itemLiContent;
        }, "");
        return liContent;
      };

      this.orderResultEl.innerHTML = '';
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = getOrderlistEl();
      Array.from(tempDiv.children).forEach(el => {
        this.orderResultEl.prepend(el);
      });
    });

    this.backToCartBtn.addEventListener("click", () => {
      this.orderResultEl.innerHTML = '';
    });
  }
}