const pl = new ProductLoader();
pl.takeCartSpreadProduct().then(() => {
  const takeCartIns = new TakeCart();
  const cartResultCalcIns = new CartResultCalc(takeCartIns);
  new Order(takeCartIns, cartResultCalcIns);
});