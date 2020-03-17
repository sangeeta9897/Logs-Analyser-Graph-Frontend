import { Component, OnInit, Input } from "@angular/core";
import * as Highcharts from "highcharts";

@Component({
  selector: "app-request-count-target",
  templateUrl: "./request-count-target.component.html",
  styleUrls: ["./request-count-target.component.css"]
})
export class RequestCountTargetComponent implements OnInit {
  @Input() requestTargetData: any;
  targetGroup: any = [];
  xx2: any = [];
  xx5: any = [];

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

  constructor() {}

  ngOnInit(): void {
    this.requestTargetPerCountGraph();
  }

  requestTargetPerCountGraph() {
    let data = this.requestTargetData;
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

    for (let index = 0; index < this.targetGroup.length; index++) {
      this.options2.series[0]["data"][index] = [
        this.targetGroup[index],
        this.xx2[index]
      ];
      this.options2.series[0]["data"][index] = [
        this.targetGroup[index],
        this.xx2[index]
      ];
      this.options2.series[1]["data"][index] = [
        this.targetGroup[index],
        this.xx5[index]
      ];
      this.options2.series[1]["data"][index] = [
        this.targetGroup[index],
        this.xx5[index]
      ];
    }
    Highcharts.chart("requestTarget", this.options2);
  }
}
