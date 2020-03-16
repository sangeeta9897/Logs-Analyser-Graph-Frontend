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

  date: any = [];
  average: any = [];
  p90: any = [];
  p99: any = [];
  p99_9: any = [];
  p99_99: any = [];
  targetGroup: any = [];
  xx2: any = [];
  xx5: any = [];

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

  TargetGroupChart = Highcharts;
  public options2: any = {
    title: {
      text: "Request Count Per Target"
    },
    xAxis: {
      title: {
        text: "Target Group"
      },
      categories: this.targetGroup
    },
    yAxis: {
      title: {
        text: "Request Count"
      }
    },
    series: [
      {
        type: "line",
        yaxis: 1,
        data: [],
        name: "2xx"
      },
      {
        type: "line",
        yaxis: 1,
        data: [],
        name: "5xx"
      }
    ]
  };

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.getGraphData();
  }

  getGraphData() {
    this.logService.fecthingGraphData().subscribe(result => {
      console.log(result);
      var data = result.latency;
      Object.keys(data).forEach(key => {
        this.date.push(key);
        this.average.push(data[key]["avg"]);
        this.p90.push(data[key]["p90"]);
        this.p99.push(data[key]["p99"]);
        this.p99_9.push(data[key]["p99.9"]);
        this.p99_99.push(data[key]["p99.99"]);
        // console.log(this.date);
      });
      var data = result.targetGroup;
      Object.keys(data).forEach(key => {
        this.targetGroup.push(key);
        if (data[key]["2xx"]) {
          this.xx2.push(data[key]["2xx"]);
        } else {
          this.xx2.push(0);
        }
        if (data[key]["5xx"]) {
          this.xx5.push(data[key]["5xx"]);
        } else {
          this.xx5.push(0);
        }
      });

      this.logsRecieved = true;
      this.options.series[0]["data"][0] = [this.date[0], this.average[0]];
      this.options.series[0]["data"][1] = [this.date[1], this.average[1]];
      this.options.series[1]["data"][0] = [this.date[0], this.p90[0]];
      this.options.series[1]["data"][1] = [this.date[1], this.p90[1]];
      this.options.series[2]["data"][0] = [this.date[0], this.p99[0]];
      this.options.series[2]["data"][1] = [this.date[1], this.p99[1]];
      this.options.series[3]["data"][0] = [this.date[0], this.p99_9[0]];
      this.options.series[3]["data"][1] = [this.date[1], this.p99_9[1]];
      this.options.series[4]["data"][0] = [this.date[0], this.p99_99[0]];
      this.options.series[4]["data"][1] = [this.date[1], this.p99_99[1]];
      Highcharts.chart("container", this.options);
      for (var i = 0; i < this.targetGroup.length; i++) {
        this.options2.series[0]["data"][i] = [this.targetGroup[i], this.xx2[i]];
        this.options2.series[0]["data"][i] = [this.targetGroup[i], this.xx2[i]];
        this.options2.series[1]["data"][i] = [this.targetGroup[i], this.xx5[i]];
        this.options2.series[1]["data"][i] = [this.targetGroup[i], this.xx5[i]];
      }
      Highcharts.chart("container2", this.options2);
      console.log(this.options2);
    });
  }
}
