import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./app.component.scss']
})
export class HistoryChartComponent implements OnInit {
  @Input()
  public prices: any;

  @Input()
  public dates: any;
  // @ts-ignore
  @ViewChild("chart") chart: ChartComponent;
  // @ts-ignore
  public chartOptions: Partial<ChartOptions>;

  ngOnInit() {
    this.chartOptions = {
      series: [
        {
          name: "Price",
          data: this.prices
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Price over time",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.dates
      }
    };
  }
}
