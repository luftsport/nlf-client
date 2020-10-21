import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NlfWorkersStatusComponent } from './workers-status/workers-status.component';
import { NlfAuthGuard } from 'app/services/auth/auth.guard';
import { NlfChangesHourComponent } from './changes-hour/changes-hour.component';


const routes: Routes = [

  // { path: '', redirectTo: '/', pathMatch: 'full' }, // redirect root
  { path: '', component: NlfWorkersStatusComponent , data: {title: 'Integration'} },
  { path: 'status', component: NlfWorkersStatusComponent , data: {title: 'Integration - Status'} },
  { path: 'hours', component: NlfChangesHourComponent , data: {title: 'Integration - Hours'} },
  { path: '**',  redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NlfIntegrationRoutingModule { }
