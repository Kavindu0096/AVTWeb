import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AircraftSightingsComponent } from './Components/UI/AircraftSighting/aircraft-sightings/aircraft-sightings.component';
import { AircraftSightingListComponent } from './Components/UI/AircraftSighting/aircraft-sighting-list/aircraft-sighting-list.component';
import { AircraftComponent } from './Components/UI/Aircrafts/aircraft/aircraft.component';
import { AircraftListComponent } from './Components/UI/Aircrafts/aircraft-list/aircraft-list.component';
import { DashbordComponent } from './Components/UI/dashbord/dashbord.component';

const routes: Routes = [
  {
    path: '', component: DashbordComponent
  }
  ,
  {
    path: 'AircraftList', component: AircraftListComponent

  },
  {
    path: 'Aircraft', component: AircraftComponent

  }
  ,
  {
    path: 'AircraftSightingsList', component: AircraftSightingListComponent
  },
  {
    path: 'AircraftSighting', component: AircraftSightingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
