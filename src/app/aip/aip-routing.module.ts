import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NlfAipAirspaceComponent } from 'app/aip/aip-airspace/aip-airspace.component';
import { NlfAuthGuard } from 'app/services/auth/auth.guard';


const routes: Routes = [

  // { path: '', redirectTo: '/', pathMatch: 'full' }, // redirect root
  { path: '', component: NlfAipAirspaceComponent, data: {title: 'AIP'} },
  { path: 'airspace', component: NlfAipAirspaceComponent , data: {title: 'AIP - Airspace'} },
  { path: '**',  redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NlfAipRoutingModule { }
