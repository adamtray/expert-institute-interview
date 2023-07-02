export class WalletItem {
  public symbol = '';
  public qty = 0;
  public price = 0;

  constructor(symbol: string, qty: number, price: number) {
    this.symbol = symbol;
    this.qty = qty;
    this.price = price;
  }
}
