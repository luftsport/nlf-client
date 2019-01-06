import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NlfAdminComponent } from './admin.component';
import { NlfAdminHelpComponent} from './help/help.component';
import { NlfAdminHelpEditComponent} from './help/help-edit/help-edit.component';
import { NlfAuthGuard } from 'app/services/auth/auth.guard';

const nlfAdminRoutes: Routes = [
    { path: 'admin/', component: NlfAdminComponent, canActivate: [NlfAuthGuard]},
    { path: 'admin/help', component: NlfAdminHelpComponent, canActivate: [NlfAuthGuard]},
    { path: 'admin/help/create', component: NlfAdminHelpEditComponent, canActivate: [NlfAuthGuard]},
    { path: 'admin/help/edit/:key', component: NlfAdminHelpEditComponent, canActivate: [NlfAuthGuard]},
  ];

@NgModule({
  imports: [ RouterModule.forChild(nlfAdminRoutes)],
  exports: [ RouterModule],
  declarations: []
})
export class NlfAdminRoutingModule { }
