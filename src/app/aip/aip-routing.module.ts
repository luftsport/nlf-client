import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NlfAipAirspaceComponent } from 'app/aip/aip-airspace/aip-airspace.component';
import { NlfAuthGuard } from 'app/services/auth/auth.guard';


const routes: Routes = [

  // { path: '', redirectTo: '/', pathMatch: 'full' }, // redirect root
  { path: '', component: NlfAipAirspaceComponent },
  { path: 'airspace', component: NlfAipAirspaceComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NlfAipRoutingModule { }