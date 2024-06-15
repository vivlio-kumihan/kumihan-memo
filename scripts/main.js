const pl = new ProductLoader();
pl.takeCartSpreadProduct().then(() => {
  const takeCartInstance = new TakeCart();
  new TakeCartCalc(takeCartInstance);
});