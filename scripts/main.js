const pl = new ProductLoader();
pl.takeCartSpreadProduct().then(() => {
  const takeCartIns = new TakeCart();
  const calcIns = new Calc(takeCartIns);
  const orderIns = new Order(calcIns);
});