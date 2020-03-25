import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LogService {
  constructor(private http: HttpClient) {}

  baseUrl: string = "https://logs-analyzer-graph.herokuapp.com";
  private options = {
    headers: new HttpHeaders().set("Content-Type", "application/json")
  };

  fecthingGraphData(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/getLogsData", this.options);
  }
}
