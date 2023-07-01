import {Component, OnInit} from '@angular/core';
import {CoinCapHttpService} from "./coin-cap-http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  public details: any;
  constructor( private coinCapHttpService: CoinCapHttpService ) {
  }

  ngOnInit(): void {
    this.coinCapHttpService.getAllAssets().subscribe( response => {
      // @ts-ignore
      this.details = response.data;
    });
  }
}
