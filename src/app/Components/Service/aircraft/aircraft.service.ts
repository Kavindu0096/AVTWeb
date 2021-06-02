import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient } from "@angular/common/http";
import { baseAppUrl } from "src/app/app-globals";
import { IAircraft } from '../../Inerface/iaircraft';
@Injectable({
  providedIn: 'root'
})
export class AircraftService {

  constructor(public http: HttpClient) { }

  getAircraftList(): any {
    return this.http.get<IAircraft>(baseAppUrl + "api/Aircraft");
  }
}
