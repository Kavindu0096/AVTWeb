import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient } from "@angular/common/http";
import { baseAppUrl } from "src/app/app-globals";
import { IAircraft } from '../../Inerface/iaircraft';
import { PostStatus } from 'src/app/common-ui/PostStatus/post-status';
@Injectable({
  providedIn: 'root'
})
export class AircraftService {

  constructor(public http: HttpClient) { }

  getAircraftList(): any {
    return this.http.get<IAircraft>(baseAppUrl + "/api/Aircraft");
    //return this.http.get<IAircraft>(baseAppUrl + "/abc");

  }
  getAircraftByID(id): any {
    return this.http.get<IAircraft>(baseAppUrl + "/api/Aircraft/GetById/" + id);


  }

  create(obj: any): any {
    return this.http.post<PostStatus>(baseAppUrl + '/api/Aircraft', obj);
  }
  update(obj: any): any {
    return this.http.put<PostStatus>(baseAppUrl + '/api/Aircraft', obj);
  }
  delete(id): any {
    return this.http.delete<PostStatus>(baseAppUrl + '/api/Aircraft?id=' + id);
  }

  getAircraftsByMake(value): any {
    return this.http.get<IAircraft>(baseAppUrl + "/api/Aircraft/GetByMake/" + value);


  }
  getAircraftsByModel(value): any {
    return this.http.get<IAircraft>(baseAppUrl + "/api/Aircraft/GetByModel/" + value);

  }
  getAircraftsByReg(value): any {
    return this.http.get<IAircraft>(baseAppUrl + "/api/Aircraft/GetByRegistration/" + value);

  }
}
