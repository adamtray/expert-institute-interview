import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CoinCapHttpService} from "./coin-cap-http.service";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgApexchartsModule} from "ng-apexcharts";
import {HistoryChartComponent} from "./history-chart.component";

@NgModule({
  declarations: [
    AppComponent,
    HistoryChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxDatatableModule,
    NgApexchartsModule
  ],
  providers: [CoinCapHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
