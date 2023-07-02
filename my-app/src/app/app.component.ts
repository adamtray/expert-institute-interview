import {Component, OnInit, ViewChild} from '@angular/core';
import {CoinCapHttpService} from "./coin-cap-http.service";
import {ColumnMode} from "@swimlane/ngx-datatable";
import {WalletItem} from "./wallet.component";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  @ViewChild('myTable') table: any;
  protected readonly ColumnMode = ColumnMode;
  public origDetails = [];
  public filteredDetails = [];
  public showWallet = false;
  public walletData: WalletItem[] = [];
  public walletTotal = 0;
  public prices$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  public dates$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor( private coinCapHttpService: CoinCapHttpService ) {
  }

  ngOnInit(): void {
    let localWalletData = localStorage.getItem('walletData');
    if ( localWalletData ) {
      let coins = JSON.parse(localWalletData);
      for (let coin of coins) {
        this.walletData.push(new WalletItem(coin.symbol, coin.qty, coin.price));
      }
    }
    this.coinCapHttpService.getAllAssets().subscribe( response => {
      // @ts-ignore
      this.origDetails = response.data;
      // @ts-ignore
      this.filteredDetails = response.data;
    });
  }

  toggleWallet() {
    this.showWallet = !this.showWallet;
  }

  addToWallet(event: any) {
    if ( this.walletData.length === 0 || this.walletData.filter(d => d.symbol === event.symbol).length === 0 ) {
      this.walletData.push(new WalletItem(event.symbol, 0, event.priceUsd));
    }
  }

  removeFromWallet(row: any) {
    let itemIdx = this.walletData.findIndex(d => d.symbol === row.symbol);
    // Splicing walletData directly was not updating the table correctly for some reason
    // @ts-ignore
    let tmp = [].concat(...this.walletData);
    tmp.splice(itemIdx, 1);
    this.walletData = tmp;
    this.updateTotal();
  }

  updateWalletQty(event: any, row: any) {
    let item = this.walletData.find(d => d.symbol === row.symbol);
    if (item) {
      item.qty = Number(event.target.value);
      this.updateTotal();
    }
  }

  updateTotal() {
    this.walletTotal = this.walletData.reduce((previousValue, currentValue) => (currentValue.qty * currentValue.price) + previousValue, 0);
    // Save wallet data to local storage
    localStorage.setItem('walletData', JSON.stringify(this.walletData));
  }

  toggleExpandRow(row: any) {
    // this.table.rowDetail.collapseAllRows();
    this.coinCapHttpService.getAssetHistory(row.id).toPromise().then(value => {
        // @ts-ignore
        this.prices$.next(value.data.map(d => Number(d.priceUsd)));
        // @ts-ignore
        this.dates$.next(value.data.map(d => d.date));
        this.table.rowDetail.toggleExpandRow(row);
      }
    );

  }

  updateFilter(event: any) {
    let val = event.target.value.toLowerCase();
    // origDetails contains the original unfiltered data
    // Filter the data
    let tmp = this.origDetails.filter(d => {
      // @ts-ignore
      return d.name.toLowerCase().indexOf(val) !== -1 || d.symbol.toLowerCase().indexOf(val) !== -1 || !val
    });

    // Update the rows
    this.filteredDetails = tmp;
  }
}
