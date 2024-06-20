const pl = new ProductLoader();
pl.takeCartSpreadProduct().then(() => {
  const takeCartIns = new TakeCart();
  const takeCartCalcIns = new TakeCartCalc(takeCartIns);
  new TakeCartOrder(takeCartIns, takeCartCalcIns);
});