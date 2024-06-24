const pl = new ProductLoader();
pl.takeCartSpreadProduct().then(() => {
  const takeCartIns = new TakeCart();
  const cartResultCalcIns = new CartResultCalc(takeCartIns);
  const sendFeeIns = new SendFee(takeCartIns);
  new Order(takeCartIns, cartResultCalcIns, sendFeeIns);
});