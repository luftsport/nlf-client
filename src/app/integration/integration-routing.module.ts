import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NlfWorkersStatusComponent } from './workers-status/workers-status.component';
import { NlfAuthGuard } from 'app/services/auth/auth.guard';
import { NlfChangesHourComponent } from './changes-hour/changes-hour.component';


const routes: Routes = [

  // { path: '', redirectTo: '/', pathMatch: 'full' }, // redirect root
  { path: '', component: NlfWorkersStatusComponent },
  { path: 'status', component: NlfWorkersStatusComponent },
  { path: 'hours', component: NlfChangesHourComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NlfIntegrationRoutingModule { }
