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
    series: [
      {
        type: "line",
        yaxis: 1,
        data: [],
        name: "average"
      },
      {
        type: "line",
        yaxis: 1,
        data: [],
        name: "p90"
      },
      {
        type: "line",
        yaxis: 1,
        data: [],
        name: "p99"
      },
      {
        type: "line",
        yaxis: 1,
        data: [],
        name: "p99.9"
      },
      {
        type: "line",
        yaxis: 1,
        data: [],
        name: "p99.99"
      }
    ]
  };

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.getGraphData();
  }

  getGraphData() {
    this.logService.fecthingGraphData().subscribe(result => {
      var data = result.latency;
      Object.keys(data).forEach(key => {
        this.date.push(key);
        this.average.push(data[key]["avg"]);
        this.p90.push(data[key]["p90"]);
        this.p99.push(data[key]["p99"]);
        this.p99_9.push(data[key]["p99.9"]);
        this.p99_99.push(data[key]["p99.99"]);
      });
      this.requestTargetData = result.targetGroup;
      this.logsRecieved = true;

      for (let index = 0; index < this.date.length; index++) {
        this.options.series[0]["data"][index] = [
          this.date[index],
          this.average[index]
        ];
        this.options.series[1]["data"][index] = [
          this.date[index],
          this.p90[index]
        ];
        this.options.series[2]["data"][index] = [
          this.date[index],
          this.p99[index]
        ];
        this.options.series[3]["data"][index] = [
          this.date[index],
          this.p99_9[index]
        ];
        this.options.series[4]["data"][index] = [
          this.date[index],
          this.p99_99[index]
        ];
      }
      Highcharts.chart("latency", this.options);
    });
  }
}
