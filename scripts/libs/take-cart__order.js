"use strict";

// 注文を管理するクラス

class Order {
  constructor(takeCartIns, cartResultCalcIns, sendFeeIns) {
    this.takeCartIns = takeCartIns;
    this.cartResultCalcIns = cartResultCalcIns;
    this.sendFeeIns = sendFeeIns;
    this.orderContainerEL = document.querySelector(".order-container");
    this.confirmOrderBtn = document.querySelector(".order__confirm");
    this.orderedResultSubTotalEl = document.querySelector(".ordered-result__sub-total");
    this.orderedResultTotalEl = document.querySelector(".ordered-result__total");
    this.backToCartBtn = document.querySelector(".order__back-to-cart");
    this.orderedItems = this.takeCartIns.cartResultCalcIns.orderedEachItemResultMth || [];    
    this.formData = this._inputItems();
    this._init();
  }


  _init() {
    // 都道府県が取れた。
    // console.log(this.sendFeeIns.PREFECTURE);
    // let formData = this._inputItems()
    console.log(this.formData);

    
    // 『申し込む』ボタンをクリックしてイベントを発火。
    this.confirmOrderBtn.addEventListener("click", () => {
      // Sub Total
      // 既存のリストをクリア
      this.orderedResultSubTotalEl.innerHTML = '';      
      // 生成されたHTML文字列をDOM要素に変換
      const tempDiv1 = document.createElement("div");
      tempDiv1.innerHTML = this.getOrderedlistElFn();
      Array.from(tempDiv1.children).forEach(el => this.orderedResultSubTotalEl.prepend(el))
      
      // Total
      // 既存のリストをクリア
      this.orderedResultTotalEl.innerHTML = '';      
      // 生成されたHTML文字列をDOM要素に変換
      const tempDiv2 = document.createElement("div");
      tempDiv2.innerHTML = this.getTotalFeeElFn();
      Array.from(tempDiv2.children).forEach(el => this.orderedResultTotalEl.prepend(el))
      this.orderContainerEL.classList.add("active");
    });
    
    // 戻るボタンのイベントリスナー。
    this.backToCartBtn.addEventListener("click", () => {
      this.orderedResultSubTotalEl.innerHTML = '';
      this.orderContainerEL.classList.remove("active");
    });
  }

  _totalCalc() {
    const orderedItems = this.takeCartIns.cartResultCalcIns.orderedEachItemResultMth;
    const totalWeight = orderedItems.reduce((acc, item) => { return acc + item["重量小計"] }, 0);
    const totalAmount = orderedItems.reduce((acc, item) => { return acc + item["小計"] }, 0);
    const result = {totalWeight: totalWeight, totalAmount: totalAmount};
    return result;
  }

  
  getOrderedlistElFn() {
    // orderedEachItemResultFn()から配列を取得する。
    const orderedItems = this.takeCartIns.cartResultCalcIns.orderedEachItemResultMth;
    // reduce()を使用してリストアイテムのHTMLを生成する。
    const liContent = orderedItems.reduce((acc, obj) => {
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
          <div class="sub-total">小計 : ${obj["小計"]}円</div>
        </li>
      `;
      // accumulatorに現在のアイテムを追加して統合していく。
      return acc + itemLiContent;
    }, "");
    return liContent;
  };

  getTotalFeeElFn() {
    const weight = this._totalCalc().totalWeight;   
    const itemAmount = this._totalCalc().totalAmount;   
    const fee = this.sendFeeIns.feeCalcMth();
    const totalAmount = itemAmount + fee;
    const liContent = `
      <li>
      <div class="weight">総重量 : ${weight}g</div>
      <div class="itemAmount">授与品合計 : ${itemAmount}円</div>
        <div class="fee">送料 : ${fee}円</div>
        <div class="fee">合計 : ${totalAmount}円</div>
      </li>
    `;    
    return liContent;
  }

  prefInOptionFn() {
    const weight = this._totalCalc().totalWeight;   
    const itemAmount = this._totalCalc().totalAmount;   
    const fee = this.sendFeeIns.feeCalcMth();
    const totalAmount = itemAmount + fee;
    const liContent = `
      <li>
      <div class="weight">総重量 : ${weight}g</div>
      <div class="itemAmount">授与品合計 : ${itemAmount}円</div>
        <div class="fee">送料 : ${fee}円</div>
        <div class="fee">合計 : ${totalAmount}円</div>
      </li>
    `;    
    return liContent;
  }

  _inputItems() {
    const inputEls = document.querySelectorAll(".order-form__input");
    const formData = {};

    inputEls.forEach(inputEl => {
      formData[inputEl.name] = inputEl.value;
      inputEl.addEventListener('input', () => {
        formData[inputEl.name] = inputEl.value;
      });
    });
    console.log(formData);
    return formData;
  }
}


// console.log(inputEls);
// return acc.inputEl.name = inputEl.value;


    // inputEls.forEach(input => {
    //   input.addEventListener('input', () => {
    //     // const inputValue = document.getElementById('inputValue');

    //     console.log(input.name);
    //     console.log(input.value);
    //     // inputValue.innerHTML = input.value;
    //   });    
    // });

    // const input = document.getElementById('input');
    // inputEls.reduce((acc, el) => {
    //   el.name
    //   return acc 
    // });
    // const name = document.querySelector(".order-form__input.name");
    // const postalCode = document.querySelector(".order-form__input.postal-code");
    // const pref = document.querySelector(".order-form__input.pref");
    // const adress = document.querySelector(".order-form__input.adress");
    // const email = document.querySelector(".order-form__input.email");
    // const tel = document.querySelector(".order-form__input.tel");
    // const memo = document.querySelector(".order-form__input.memo");

    // console.log(name);
    // console.log(name.value);
    // console.log(postalCode.value);
    // console.log(pref.value);
    // console.log(adress.value);
    // console.log(email.value);
    // console.log(tel.value);
    // console.log(memo.value);