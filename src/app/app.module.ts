import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AircraftSightingListComponent } from './Components/UI/AircraftSighting/aircraft-sighting-list/aircraft-sighting-list.component';
import { AircraftSightingsComponent } from './Components/UI/AircraftSighting/aircraft-sightings/aircraft-sightings.component';
import { DashbordComponent } from './Components/UI/dashbord/dashbord.component';
import { NavBarComponent } from './Components/UI/nav-bar/nav-bar.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AircraftListComponent } from './Components/UI/Aircrafts/aircraft-list/aircraft-list.component';
import { AircraftComponent } from './Components/UI/Aircrafts/aircraft/aircraft.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    AircraftSightingListComponent,
    AircraftSightingsComponent,
    DashbordComponent,
    NavBarComponent,
    AircraftListComponent,
    AircraftComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
