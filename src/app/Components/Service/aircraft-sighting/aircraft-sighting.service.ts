import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseAppUrl } from 'src/app/app-globals';
import { PostStatus } from 'src/app/common-ui/PostStatus/post-status';
import { IAircraftSighting } from '../../Inerface/iaircraft-sighting';

@Injectable({
  providedIn: 'root'
})
export class AircraftSightingService {

  constructor(public http: HttpClient) { }

  getAircraftSightingList(): any {
    return this.http.get<IAircraftSighting>(baseAppUrl + "/api/AircraftSighting");
    //return this.http.get<IAircraft>(baseAppUrl + "/abc");

  }

  getAircraftSightingByID(id): any {
    return this.http.get<IAircraftSighting>(baseAppUrl + "/api/AircraftSighting/GetById/" + id);


  }
  create(obj: any): any {
    return this.http.post<PostStatus>(baseAppUrl + '/api/AircraftSighting', obj);
  }
  update(obj: any): any {
    return this.http.put<PostStatus>(baseAppUrl + '/api/AircraftSighting', obj);
  }
  delete(id): any {
    return this.http.delete<PostStatus>(baseAppUrl + '/api/AircraftSighting?id=' + id);
  }
}
