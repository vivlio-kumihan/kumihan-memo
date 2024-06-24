const pl = new ProductLoader();
pl.takeCartSpreadProduct().then(() => {
  const takeCartIns = new TakeCart();
  const cartResultCalcIns = new CartResultCalc(takeCartIns);
  const orderIns = new Order(takeCartIns, cartResultCalcIns);
  new SendFee(orderIns);
});