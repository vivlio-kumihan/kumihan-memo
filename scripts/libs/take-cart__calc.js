// カートの注文結果を返すクラス

"use strict";

class CartResultCalc {
  constructor(takeCartIns) {
    this.cartOnLSIns = takeCartIns.cartOnLSIns;
    this.orderedEachItemResultIns = this.orderedEachItemResultFn();
  }


  orderedEachItemResultFn() {
    const order = [];
    // cart内の各アイテムに対して処理を行う
    this.cartOnLSIns.forEach(itemObject => {
      // orderに同じ品名が含まれていないかをチェック
      const isAlreadyInOrder = order.some(orderItem => orderItem["品名"] === itemObject.name);

      if (!isAlreadyInOrder) {
        // 内訳を格納するオブジェクト
        const orderTypeQuantityObj = {};

        // typesを走査し、quantity が0でないものを内訳として追加
        itemObject.types.forEach(type => {
          if (type.quantity !== 0) {
            orderTypeQuantityObj[type.name] = type.quantity;
          }
        });

        // 商品ごとの注文数を計算する。
        const subQuantity = Object.values(orderTypeQuantityObj).reduce((sum, quantity) => sum + quantity, 0);
        const subTotalPrice = parseFloat(itemObject.price) * subQuantity;
        const subTotalWeight = parseFloat(itemObject.weight) * subQuantity;
        if (subQuantity !== 0) {
          order.push({ "品名": itemObject.name, "内訳": orderTypeQuantityObj, "重量小計": subTotalWeight, "小計": subTotalPrice });
        }
      }
    });
    
    return order;
  }


  // removeOrderedItem メソッドを追加
  removeOrderedItem(itemName) {
    // 現在の orderedEachItemResultFn を取得
    let orderItems = this.orderedEachItemResultIns;
    
    // 指定された名前のアイテムを削除
    orderItems = orderItems.filter(orderItem => orderItem["品名"] !== itemName);
    // return orderItems;
    
    // 新しい結果を保存（必要に応じて）
    // 例えば、ローカルストレージや別のプロパティに保存する場合：
    // this.updatedorderedEachItemResultIns = orderItems;
  }  


}