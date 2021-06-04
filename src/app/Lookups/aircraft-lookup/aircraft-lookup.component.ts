import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IAircraft } from 'src/app/Components/Inerface/iaircraft';
import { PostStatus } from 'src/app/common-ui/PostStatus/post-status';
import { JQManager } from 'src/app/common-ui/JQManager/jqManager';

import { HttpErrorResponse } from '@angular/common/http';
import { AircraftService } from 'src/app/Components/Service/aircraft/aircraft.service';

@Component({
  selector: 'app-aircraft-lookup',
  templateUrl: './aircraft-lookup.component.html',
  styleUrls: ['./aircraft-lookup.component.css']
})
export class AircraftLookupComponent implements OnInit {

  public selectedRow: number; //for set clicked row colors
  public List: any; // Data List
  public Data: IAircraft; //store selected data

  public isRowSelected: boolean; //item is selected or nots
  respond: PostStatus;
  @Input() lookupName: String;//lookup name
  @Input() parmType: String;
  // @Input() parmValue: String;
  @Output() setValueEmitter = new EventEmitter<any>();
  constructor(
    private jqm: JQManager,
    private AircraftService: AircraftService
  ) { }

  ngOnInit(): void {

    this.OnLoadData();
  }

  ngOnChanges() {
    this.OnLoadData();
  }


  OnLoadData() {

    this.AircraftService.getAircraftList().subscribe(value => {
      this.jqm.DataTableDestroy('DataTableModel_Aircraft');
      this.List = null;
      this.List = value.data.result;
      this.jqm.DataTableModel('DataTableModel_Aircraft');
    }, (err: HttpErrorResponse) => {
      this.jqm.ErrorResponse(this.respond, err);
    });

  }

  public setValue() {
    if (this.isRowSelected) {
      this.selectedRow = -1; // Deselect the row  
      this.setValueEmitter.emit(this.Data);
      this.jqm.hideModalDialog('aircraft_lookup');
    }
  }

  public getSelectedValue(value: IAircraft, index: number): void {
    this.isRowSelected = true;
    this.Data = value;
    this.setClickedRow(index); //select clicked row
  }

  public setClickedRow(index): void {
    this.selectedRow = index;
  }

  public clearSelected() {
    this.selectedRow = null;
    this.isRowSelected = false;
  }
}