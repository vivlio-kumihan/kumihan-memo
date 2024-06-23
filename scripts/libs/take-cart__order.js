"use strict";

// 注文を管理するクラス

class Order {
  constructor(takeCartIns, cartResultCalcIns) {
    this.takeCartIns = takeCartIns;
    this.cartResultCalcIns = cartResultCalcIns;
    this.confirmOrderBtn = document.querySelector(".order__confirm");
    this.orderedResultEl = document.querySelector(".ordered-result");
    this.backToCartBtn = document.querySelector(".order__back-to-cart");
    this.getOrderedlistElFn();
    this._init();
  }

  _init() {
    this.confirmOrderBtn.addEventListener("click", () => {
      
      // 既存のリストをクリア
      this.orderedResultEl.innerHTML = '';      
      // 生成されたHTML文字列をDOM要素に変換
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = this.getOrderedlistElFn();
      Array.from(tempDiv.children).forEach(el => this.orderedResultEl.prepend(el))
      console.log(this.getOrderedlistElFn());
      console.log("from cart => ", this.takeCartIns.cartResultCalcIns.orderedEachItemResultIns);
      console.log("ひとつ古いデータ", this.cartResultCalcIns.orderedEachItemResultIns);
    });
    
    // 戻るボタンのイベントリスナー。
    this.backToCartBtn.addEventListener("click", () => {
      this.orderedResultEl.innerHTML = '';
    });
  }

  getOrderedlistElFn() {
    // orderedEachItemResultFn()から配列を取得する。
    // const orderedItems = this.cartResultCalcIns.orderedEachItemResultFn();
    const orderedItems = this.takeCartIns.cartResultCalcIns.orderedEachItemResultIns;
    console.log("orderedItems => ", orderedItems);
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
          <div class="quantity">重量 : ${obj["重量小計"]}g</div>
          <div class="sub-total">小計 : ${obj["小計"]}円</div>
        </li>
      `;
      // accumulatorに現在のアイテムを追加して統合していく。
      return acc + itemLiContent;
    }, "");
    return liContent;
  };
}