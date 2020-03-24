import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import { LogService } from "src/app/services/log.service";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"]
})
export class ChartComponent implements OnInit {
  logsRecieved: boolean = false;
  requestTargetData: any;
  date: any = [];
  average: any = [];
  p90: any = [];
  p99: any = [];
  p99_9: any = [];
  p99_99: any = [];
  t10: any = [];
  t20: any = [];
  t30: any = [];
  t40: any = [];
  t50: any = [];
  t60: any = [];
  xtime: any = [];
  series: any = [];

  Highcharts = Highcharts;
  public options: any = {
    title: {
      text: "Latency Graph"
    },
    xAxis: {
      title: {
        text: "Date"
      },
      categories: this.date
    },
    yAxis: {
      title: {
        text: "Latencies"
      }
    },
    series: []
  };

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.getGraphData();
  }

  setGraphValue(bindValue) {
    this.options.title.text = "Latency Graph " + bindValue;
    this.options.xAxis.title.text = "Date";
    this.options.xAxis.categories = this.date;
    this.options.yAxis.title.text = "Latencies";
    this.series.forEach((values, i) => {
      this.date.forEach((tme, j) => {
        this.options.series[i]["data"][j] = [
          this.date[j],
          this[bindValue][i][j]
        ];
      });
    });
    Highcharts.chart("latency", this.options);
  }

  getGraphData() {
    // if (ch) console.log(bindValue);
    this.date = [];
    this.logService.fecthingGraphData().subscribe(result => {
      // console.log(result);
      let data = result.latency;

      var key = Object.keys(data)[0];

      Object.keys(data[key]).forEach(hour => {
        var xhour = hour;
        Object.keys(data[key][hour]).forEach(minute => {
          this.date.push(xhour.toString() + ":" + minute.toString());
        });
      });

      Object.keys(data).forEach((key, index) => {
        this.series.push(key);
        this.average.push([]);
        this.p99_99.push([]);
        this.p99_9.push([]);
        this.p99.push([]);
        this.p90.push([]);
        Object.keys(data[key]).forEach(hour => {
          Object.keys(data[key][hour]).forEach(minute => {
            var finalValues = data[key][hour][minute];
            this.average[index].push(finalValues.avg || null);
            this.p99_99[index].push(finalValues["p99.99"] || null);
            this.p99_9[index].push(finalValues["p99.9"] || null);
            this.p99[index].push(finalValues["p99"] || null);
            this.p90[index].push(finalValues["p90"] || null);
          });
        });
      });
      this.requestTargetData = result.targetGroup;
      this.logsRecieved = true;

      for (let index = 0; index < this.options.series.length; index++)
        this.options.series[index].setData([]);
      console.log(this.options.series);
      this.series.forEach((values, i) => {
        this.options.series.push({
          type: "line",
          yaxis: 1,
          data: [],
          name: values
        });
        this.date.forEach((tme, j) => {
          this.options.series[i]["data"][j] = [
            this.date[j],
            this.average[i][j]
          ];
        });
      });
      Highcharts.chart("latency", this.options);
    });
  }
}
