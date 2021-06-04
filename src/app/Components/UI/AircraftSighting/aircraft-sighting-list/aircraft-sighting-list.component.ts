import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocumentMode } from 'src/app/common-ui/documentMode/document-mode';
import { JQManager } from 'src/app/common-ui/JQManager/jqManager';
import { IAircraftSighting } from 'src/app/Components/Inerface/iaircraft-sighting';
import { AircraftSightingService } from 'src/app/Components/Service/aircraft-sighting/aircraft-sighting.service';
import { AircraftService } from 'src/app/Components/Service/aircraft/aircraft.service';

@Component({
  selector: 'app-aircraft-sighting-list',
  templateUrl: './aircraft-sighting-list.component.html',
  styleUrls: ['./aircraft-sighting-list.component.css']
})
export class AircraftSightingListComponent implements OnInit {



  AircraftSightingList: IAircraftSighting[];

  constructor
    (public AircraftSightingService: AircraftSightingService,
      public AircraftService: AircraftService,
      private toastr: ToastrService,
      private router: Router,
      private jqm: JQManager,

  ) { }

  ngOnInit(): void {
    this.getAircraftList()
  }

  getAircraftList() {

    this.AircraftSightingService.getAircraftSightingList().subscribe(
      value => {
        // this.jqm.DataTableDestroy('DataTable_AST');
        this.AircraftSightingList = value.data.result;
        // this.toastr.success('Hello world!', 'Toastr fun!');
        this.jqm.DataTable('DataTable_AST');
      },
      (err: HttpErrorResponse) => {


      }
    );
  }

  OnCreate() {
    localStorage.setItem("AircraftSighting_Id", "0");
    localStorage.setItem("AircraftSighting_Action", DocumentMode.CREATE);
    this.router.navigate(['/AircraftSighting'])
  }
  OnView(ID) {

    localStorage.setItem("AircraftSighting_Id", ID);
    localStorage.setItem("AircraftSighting_Action", DocumentMode.VIEW);
    this.router.navigate(['/AircraftSighting'])
  }
  OnEdit(ID) {
    localStorage.setItem("AircraftSighting_Id", ID);
    localStorage.setItem("AircraftSighting_Action", DocumentMode.UPDATE);
    this.router.navigate(['/AircraftSighting'])
  }

  onDelete(ID) {
    if (confirm('Are you sure you want to delete?')) {
      debugger
      this.AircraftSightingService.delete(ID).subscribe(
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
