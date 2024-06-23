const pl = new ProductLoader();
pl.takeCartSpreadProduct().then(() => {
  const takeCartIns = new TakeCart();
  const cartResultCalcIns = new CartResultCalc(takeCartIns);
});