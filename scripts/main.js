const pl = new ProductLoader();
pl.takeCartSpreadProduct().then(() => {
  const takeCartIns = new TakeCart();
  new TakeCartCalc(takeCartIns);
});