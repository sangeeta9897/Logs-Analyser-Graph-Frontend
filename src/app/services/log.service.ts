import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LogService {
  constructor(private http: HttpClient) {}

  baseUrl: string = "http://localhost:3000";
  private options = {
    headers: new HttpHeaders().set("Content-Type", "application/json")
  };

  fecthingGraphData(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/getLogsData", this.options);
  }

  // fecthingGraphData() {
  //   return this.httpClient.get(`${this.baseURL}/getLogsData`);
  // }
}
