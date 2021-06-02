import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IAircraft } from '../../Inerface/iaircraft';
import { AircraftService } from '../../Service/aircraft/aircraft.service';

@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.css']
})
export class AircraftComponent implements OnInit {

  AircraftList: IAircraft[];

  constructor(public AircraftService: AircraftService) { }

  ngOnInit(): void {
    this.getAircraftList()
  }

  getAircraftList() {
    debugger
    this.AircraftService.getAircraftList().subscribe(
      value => {
        this.AircraftList = value;

      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
