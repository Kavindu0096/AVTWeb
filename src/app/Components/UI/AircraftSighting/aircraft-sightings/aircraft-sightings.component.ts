import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Action } from 'src/app/common-ui/Action/action';
import { DocumentMode } from 'src/app/common-ui/documentMode/document-mode';
import { JQManager } from 'src/app/common-ui/JQManager/jqManager';
import { IAircraftSighting } from 'src/app/Components/Inerface/iaircraft-sighting';
import { AircraftSightingService } from 'src/app/Components/Service/aircraft-sighting/aircraft-sighting.service';
import { AircraftService } from 'src/app/Components/Service/aircraft/aircraft.service';

@Component({
  selector: 'app-aircraft-sightings',
  templateUrl: './aircraft-sightings.component.html',
  styleUrls: ['./aircraft-sightings.component.css']
})
export class AircraftSightingsComponent implements OnInit {
  AircraftSightingList: IAircraftSighting[];
  Mode: any;
  DataForm: FormGroup;
  action: Action;
  isValid: boolean = false;
  files: Array<any> = new Array<any>();
  public progress: number;
  public message: string;

  constructor(
    public AircraftService: AircraftService,
    public AircraftSightingService: AircraftSightingService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private jqm: JQManager,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    //#region Parameters

    var ID = localStorage.getItem("AircraftSighting_Id");
    this.Mode = localStorage.getItem("AircraftSighting_Action");
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
      id: [0],
      make: ["", Validators.required],
      model: ["", Validators.required],
      registration: ["", Validators.required],
      aircraftId: [0,],
      aircraft: ["",],
      location: ["", Validators.required],
      sightingAt: ["", Validators.required],
      createdBy: [0, Validators.required],
      modifiedBy: [0, Validators.required],
      deletedAt: [null],
      UImage: ["",],

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
  checkEnterDate(date) {
    if (date.value == '') return true;
    else {
      this.DataForm.controls['sightingAt'].setValue(date.value);
      return false
    }
  }
  BackToList() {

    this.router.navigate(['/AircraftSightingsList'])
  }

  onCreateOrUpdate() {
    debugger
    if (this.Mode == DocumentMode.VIEW) {
      this.BackToList();
    }
    if (this.DataForm.valid) {

      if (this.Mode == DocumentMode.CREATE) {
        this.isValid = false;
        var rowData = this.DataForm.getRawValue();
        this.AircraftSightingService.create(rowData).subscribe(
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
        this.AircraftSightingService.update(rowData).subscribe(
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
  LoadByID(ID: any) {

    var pID = 0;
    this.AircraftSightingService.getAircraftSightingByID(ID).subscribe(
      value => {

        var SDate = (value.data.result.sightingAt != "") ? String(value.data.result.sightingAt).substr(0, 10) : value.data.result.sightingAt;
        this.DataForm.patchValue({
          id: value.data.result.id,
          make: value.data.result.make,
          model: value.data.result.model,
          registration: value.data.result.registration,
          aircraftId: value.data.result.aircraftId,
          aircraft: value.data.result.aircraft,
          location: value.data.result.location,
          sightingAt: SDate,
          deletedAt: value.data.result.deletedAt,
        })

        console.log(this.DataForm)

      },
      (err: HttpErrorResponse) => {
        this.jqm.toastrError(err, "Exception");
      }
    );


  }


  public uploadFile = (files: FileList) => {
    debugger
    if (files.length === 0) {
      return;
    }
    // let fileToUpload = <File>files[0];
    // this.DataForm.controls['UImage'].setValue(fileToUpload);
    let fileToUpload = files[0]

    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(fileToUpload);

    fileReader.onload = (event: any) => {
      var url = event.target.result;
    };

    this.files.push({ data: fileToUpload, fileName: fileToUpload.name });
    this.DataForm.controls['UImage'].setValue(this.files);

    // // const formData = new FormData();
    // // formData.append('file', fileToUpload, fileToUpload.name);
    // // this.http.post('https://localhost:5001/api/upload', formData, { reportProgress: true, observe: 'events' })
    // //   .subscribe(event => {
    // //     if (event.type === HttpEventType.UploadProgress)
    // //       this.progress = Math.round(100 * event.loaded / event.total);
    // //     else if (event.type === HttpEventType.Response) {
    // //       this.message = 'Upload success.';
    // //       this.onUploadFinished.emit(event.body);
    // //     }
    // //   });
  }


}
