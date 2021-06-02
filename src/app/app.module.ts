import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AircraftComponent } from './Components/UI/aircraft/aircraft.component';
import { AircraftSightingsComponent } from './Components/UI/aircraft-sightings/aircraft-sightings.component';
import { DashbordComponent } from './Components/UI/dashbord/dashbord.component';
import { NavBarComponent } from './Components/UI/nav-bar/nav-bar.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AircraftComponent,
    AircraftSightingsComponent,
    DashbordComponent,
    NavBarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
