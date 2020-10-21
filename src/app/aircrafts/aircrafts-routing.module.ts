import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NlfAuthGuard } from 'app/services/auth/auth.guard';
import { NlfAircraftsListComponent } from 'app/aircrafts/aircrafts-list/aircrafts-list.component';
import { NlfAircraftsEditPageComponent } from 'app/aircrafts/aircrafts-edit-page/aircrafts-edit-page.component';
import { NlfAircraftsViewComponent } from './aircrafts-view/aircrafts-view.component';

const routes: Routes = [
  { path: '', component: NlfAircraftsListComponent , canActivate: [NlfAuthGuard], data: {title: 'Aircraft'} },
  { path: 'edit/:callsign', component: NlfAircraftsEditPageComponent , canActivate: [NlfAuthGuard], data: {title: 'Aircraft - Edit'} },
  { path: 'view/:callsign', component: NlfAircraftsViewComponent , canActivate: [NlfAuthGuard], data: {title: 'Aircraft - View'} },
  { path: '**',  redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NlfAircraftsRoutingModule { }
