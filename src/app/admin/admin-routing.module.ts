import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NlfAdminComponent } from './admin.component';
import { NlfAdminHelpComponent} from './help/help.component';
import { NlfAdminHelpEditComponent} from './help/help-edit/help-edit.component';
import { NlfAuthGuard } from 'app/services/auth/auth.guard';

const nlfAdminRoutes: Routes = [
    { path: '', component: NlfAdminComponent, canActivate: [NlfAuthGuard], data: {label: 'Admin'}},
    { path: 'help', component: NlfAdminHelpComponent, canActivate: [NlfAuthGuard], data: {label: 'Help'}},
    { path: 'help/create', component: NlfAdminHelpEditComponent, canActivate: [NlfAuthGuard], data: {label: 'Create'}},
    { path: 'help/edit/:key', component: NlfAdminHelpEditComponent, canActivate: [NlfAuthGuard], data: {label: 'Edit'}},
  ];

@NgModule({
  imports: [ RouterModule.forChild(nlfAdminRoutes)],
  exports: [ RouterModule],
  declarations: []
})
export class NlfAdminRoutingModule { }
