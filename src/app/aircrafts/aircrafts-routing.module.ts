import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NlfAuthGuard } from 'app/services/auth/auth.guard';
import { NlfAircraftsListComponent } from 'app/aircrafts/aircrafts-list/aircrafts-list.component';
import { NlfAircraftsEditPageComponent } from 'app/aircrafts/aircrafts-edit-page/aircrafts-edit-page.component';

const routes: Routes = [
  { path: '', component: NlfAircraftsListComponent , canActivate: [NlfAuthGuard]},
  { path: 'edit/:callsign', component: NlfAircraftsEditPageComponent , canActivate: [NlfAuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NlfAircraftsRoutingModule { }
