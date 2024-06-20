class Calc {
  constructor(takeCartInstance) {
    this.cart = takeCartInstance.cart;
    this.orderedItems = this.orderedEachItemResult();
  }

  getOrderedItems() {
    return this.cart; // 最新のカートのアイテムを返す
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


  // removeOrderedItem メソッドを追加
  removeOrderedItem(itemName) {
    // 現在の orderedEachItemResult を取得
    let orderItems = this.orderedItems;
    
    // 指定された名前のアイテムを削除
    orderItems = orderItems.filter(orderItem => orderItem["品名"] !== itemName);
    
    // 新しい結果を保存（必要に応じて）
    // 例えば、ローカルストレージや別のプロパティに保存する場合：
    // this.updatedOrderedItems = orderItems;
  }  
}