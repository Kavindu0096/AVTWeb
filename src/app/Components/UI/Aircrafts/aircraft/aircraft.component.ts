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
  public initFormGroup(): void {
    this.DataForm = this.formBuilder.group({
      AircraftID: ["", Validators.required],
      Make: ["", Validators.required],
      Model: ["", Validators.required],
      Registration: ["", Validators.required],
      CreatedBy: [0, Validators.required],
      ModifiedBy: [0, Validators.required],
      DeletedAt: [null, Validators.required],

    });
  }
  OnCreate() {

  }
  OnEdit(ID: any) {

  }
  OnView(ID: any) {

  }
  BackToList() {

    this.router.navigate(['/AircraftList'])
  }

  onCreateOrUpdate() {

  }

}
