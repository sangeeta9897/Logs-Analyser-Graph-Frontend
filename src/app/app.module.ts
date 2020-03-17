import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ChartComponent } from "./components/chart/chart.component";
import { HighchartsChartModule } from "highcharts-angular";
import { RequestCountTargetComponent } from './components/request-count-target/request-count-target.component';

@NgModule({
  declarations: [AppComponent, ChartComponent, RequestCountTargetComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
