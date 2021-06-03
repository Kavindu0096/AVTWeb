import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IAircraft } from '../../../Inerface/iaircraft';
import { AircraftService } from '../../../Service/aircraft/aircraft.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DocumentMode } from 'src/app/common-ui/documentMode/document-mode';
@Component({
  selector: 'app-aircraft-list',
  templateUrl: './aircraft-list.component.html',
  styleUrls: ['./aircraft-list.component.css']
})
export class AircraftListComponent implements OnInit {


  AircraftList: IAircraft[];

  constructor(public AircraftService: AircraftService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.getAircraftList()
  }

  getAircraftList() {

    this.AircraftService.getAircraftList().subscribe(
      value => {

        this.AircraftList = value.data.result;
        // this.toastr.success('Hello world!', 'Toastr fun!');

      },
      (err: HttpErrorResponse) => {

        console.log(err);
      }
    );
  }

  OnCreate() {
    localStorage.setItem("Aircraft_Id", "0");
    localStorage.setItem("Aircraft_Action", DocumentMode.CREATE);
    this.router.navigate(['/Aircraft'])
  }
}
