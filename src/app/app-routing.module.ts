import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AircraftSightingsComponent } from './Components/UI/aircraft-sightings/aircraft-sightings.component';
import { AircraftComponent } from './Components/UI/aircraft/aircraft.component';
import { DashbordComponent } from './Components/UI/dashbord/dashbord.component';

const routes: Routes = [
  {
    path: '', component: DashbordComponent
  },
  {
    path: 'Aircraft', component: AircraftComponent
  },
  {
    path: 'AircraftSightings', component: AircraftSightingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
