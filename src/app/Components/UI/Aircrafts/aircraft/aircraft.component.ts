import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Action } from 'src/app/common-ui/Action/action';

import { DocumentMode } from 'src/app/common-ui/documentMode/document-mode';
import { IAircraft } from '../../../Inerface/iaircraft';
import { AircraftService } from '../../../Service/aircraft/aircraft.service';
import { JQManager } from "src/app//common-ui/JQManager/jqManager";
@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.css']
})
export class AircraftComponent implements OnInit {

  AircraftList: IAircraft[];
  Mode: any;
  DataForm: FormGroup;
  action: Action;
  isValid: boolean = false;
  constructor(
    public AircraftService: AircraftService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private jqm: JQManager,
  ) { }

  ngOnInit(): void {
    //#region Parameters

    var ID = localStorage.getItem("Aircraft_Id");
    this.Mode = localStorage.getItem("Aircraft_Action");
    this.action = this.jqm.actionHandler(this.Mode);

    //#endregion
    this.initFormGroup();


    switch (String(this.Mode).toUpperCase()) {
      case DocumentMode.CREATE:
        this.OnCreate();
        break;
      case DocumentMode.VIEW:
        this.OnView(ID);
        break;
      case DocumentMode.UPDATE:
        this.OnEdit(ID);
      default:
        break;
    }
  }
  //Initiate form Group
  public initFormGroup(): void {
    this.DataForm = this.formBuilder.group({
      aircraftId: [0],
      make: ["", Validators.required],
      model: ["", Validators.required],
      registration: ["", Validators.required],
      createdBy: [0],
      modifiedBy: [0],
      DeletedAt: [null],

    });
  }
  OnCreate() {

  }
  OnEdit(ID: any) {
    this.LoadByID(ID);
  }
  OnView(ID: any) {
    this.LoadByID(ID);
  }
  BackToList() {

    this.router.navigate(['/AircraftList'])
  }

  //On creating or updating record
  onCreateOrUpdate() {

    if (this.Mode == DocumentMode.VIEW) {
      this.BackToList();
    }
    if (this.DataForm.valid) {

      if (this.Mode == DocumentMode.CREATE) {
        this.isValid = false;
        var rowData = this.DataForm.getRawValue();
        this.AircraftService.create(rowData).subscribe(
          value => {
            this.initFormGroup();
            this.jqm.toastrSuccess(value.message);


          },
          (err: HttpErrorResponse) => {

            this.jqm.toastrError(err.message);


          }
        );
      }
      if (this.Mode == DocumentMode.UPDATE) {
        this.isValid = false;
        var rowData = this.DataForm.getRawValue();
        this.AircraftService.update(rowData).subscribe(
          value => {
            this.initFormGroup();
            this.jqm.toastrSuccess(value.message);


          },
          (err: HttpErrorResponse) => {

            this.jqm.toastrError(err.message);


          }
        );
      }
    }

  }
  //get data by id
  LoadByID(ID: any) {

    var pID = 0;
    this.AircraftService.getAircraftByID(ID).subscribe(
      value => {

        var SDate = (value.data.result.sightingAt != "") ? String(value.data.result.sightingAt).substr(0, 10) : value.data.result.sightingAt;
        this.DataForm.patchValue({
          aircraftId: value.data.result.aircraftId,
          make: value.data.result.make,
          model: value.data.result.model,
          registration: value.data.result.registration,
          deletedAt: value.data.result.deletedAt,
        })



      },
      (err: HttpErrorResponse) => {
        this.jqm.toastrError(err, "Exception");
      }
    );


  }

}
