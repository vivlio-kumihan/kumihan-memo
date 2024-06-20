"use strict";

// 注文のクラス
class Order {
  constructor(calcIns) {
    this.calcIns = calcIns;
    this.confirmOrderBtn = document.querySelector(".order__confirm");
    this.orderResultEl = document.querySelector(".order-result");
    this.backToCartBtn = document.querySelector(".order__back-to-cart");
    this._init()
  }


  _init() {
    // 既存のリストをクリア
    this.confirmOrderBtn.addEventListener("click", () => {
      // 要素を初期化する。
      this.orderResultEl.innerHTML = '';      
      const tempDiv = document.createElement("div");
      
      // 注文内容の変更に随時対応する。
      const orderItems = this.calcIns.getOrderedItems();
      // リスト生成
      if (orderItems.length !== 0) {
        console.log(orderItems.length);
        console.log(orderItems);
        // 注文をリストにして返す。
        const orderLiHTML = this.getOrderlistEl();
        // 生成されたHTML文字列をDOM要素に変換
        tempDiv.innerHTML = orderLiHTML;
        // 本文の要素へ埋め込んでいく
        Array.from(tempDiv.children).forEach(el => {
          this.orderResultEl.prepend(el);
        })
      } else {
        console.log(orderItems.length);
        console.log(orderItems);
        console.log(orderResultEl);

      }
    });

    // 戻るボタンのイベントリスナー。
    this.backToCartBtn.addEventListener("click", () => {
      this.orderResultEl.innerHTML = '';
    });    
  }

  getOrderlistEl() {
    // orderedEachItemResult()から配列を取得する。
    const orderItems = this.calcIns.orderedEachItemResult();
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
          <div class="sub-total">小計 : ${obj["小計"]}円</div>
        </li>
      `;
      // accumulatorに現在のアイテムを追加して統合していく。
      return acc + itemLiContent;
    }, "");
    return liContent;
  };
}




// "use strict";

// class Order {
//   constructor(takeCartInstance) {
//     this.takeCartInstance = takeCartInstance;
//     this.confirmOrderBtn = document.querySelector(".order__confirm");
//     this.orderResultEl = document.querySelector(".order-result");
//     this.backToCartBtn = document.querySelector(".order__back-to-cart");
    
//     this._init();
//   }

//   _init() {
//     this.confirmOrderBtn.addEventListener("click", () => {
//       const getOrderlistEl = () => {
//         const orderItems = this.takeCartInstance.calcIns.orderedEachItemResult();
//         console.log(orderItems);
//         const liContent = orderItems.reduce((acc, obj) => {
//           const orderQuantity = Object.keys(obj["内訳"]).reduce((acc, key) => {
//             const list = key !== "SELF"
//               ? `<span>${key}／${obj["内訳"][key]}個</span>`
//               : `<span>${obj["内訳"][key]}個</span>`;
//             return acc + list;
//           }, "");
//           const itemLiContent = `
//             <li data-order-item-name=${obj["品名"]}>
//               <div class="name">品名 : ${obj["品名"]}</div>
//               <div class="quantity">数量 : ${orderQuantity}</div>
//               <div class="sub-total">小計 : ${obj["小計"]}円</div>
//             </li>
//           `;
//           return acc + itemLiContent;
//         }, "");
//         return liContent;
//       };

//       this.orderResultEl.innerHTML = '';
//       const tempDiv = document.createElement("div");
//       tempDiv.innerHTML = getOrderlistEl();
//       Array.from(tempDiv.children).forEach(el => {
//         this.orderResultEl.prepend(el);
//       });
//     });

//     this.backToCartBtn.addEventListener("click", () => {
//       this.orderResultEl.innerHTML = '';
//     });
//   }
// }