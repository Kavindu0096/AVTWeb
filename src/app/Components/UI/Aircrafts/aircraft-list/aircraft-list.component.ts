import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IAircraft } from '../../../Inerface/iaircraft';
import { AircraftService } from '../../../Service/aircraft/aircraft.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DocumentMode } from 'src/app/common-ui/documentMode/document-mode';
import { JQManager } from 'src/app/common-ui/JQManager/jqManager';
@Component({
  selector: 'app-aircraft-list',
  templateUrl: './aircraft-list.component.html',
  styleUrls: ['./aircraft-list.component.css']
})
export class AircraftListComponent implements OnInit {


  AircraftList: IAircraft[];

  constructor(public AircraftService: AircraftService,
    private toastr: ToastrService,
    private router: Router,
    private jqm: JQManager
  ) { }

  ngOnInit(): void {
    this.getAircraftList()
  }

  getAircraftList() {

    this.AircraftService.getAircraftList().subscribe(
      value => {

        this.AircraftList = value.data.result;
        this.jqm.DataTable('DataTable_AT');
        // this.toastr.success('Hello world!', 'Toastr fun!');

      },
      (err: HttpErrorResponse) => {


      }
    );
  }

  OnCreate() {
    localStorage.setItem("Aircraft_Id", "0");
    localStorage.setItem("Aircraft_Action", DocumentMode.CREATE);
    this.router.navigate(['/Aircraft'])
  }
  OnView(ID) {

    localStorage.setItem("Aircraft_Id", ID);
    localStorage.setItem("Aircraft_Action", DocumentMode.VIEW);
    this.router.navigate(['/Aircraft'])
  }
  OnEdit(ID) {
    localStorage.setItem("Aircraft_Id", ID);
    localStorage.setItem("Aircraft_Action", DocumentMode.UPDATE);
    this.router.navigate(['/Aircraft'])
  }

  onDelete(ID) {
    if (confirm('Are you sure you want to delete?')) {
      debugger
      this.AircraftService.delete(ID).subscribe(
        value => {

          this.jqm.toastrSuccess(value.message);
          this.getAircraftList();

        },
        (err: HttpErrorResponse) => {

          this.jqm.toastrError(err.message);


        }
      );
    }
  }
}
