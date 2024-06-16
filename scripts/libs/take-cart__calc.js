class TakeCartCalc {
  constructor(takeCartInstance) {
    this.cart = takeCartInstance.cart;
    this.result = this.orderedEachItemResult();
    // console.log(this.orderedEachItemResult());
  }

  orderedEachItemResult() {
    const order = [];

    // cart内の各アイテムに対して処理を行う
    this.cart.forEach(itemObject => {
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
        const subtotal = parseFloat(itemObject.price) * subQuantity;
        if (subtotal !== 0) {
          order.push({ "品名": itemObject.name, "内訳": orderTypeQuantityObj, "小計": subtotal });
        }
      }
    });
    
    return order;
  }
}