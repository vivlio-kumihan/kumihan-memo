const pl = new ProductLoader();
pl.takeCartSpreadProduct().then(() => {
  new TakeCart();
});