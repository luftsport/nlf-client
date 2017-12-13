import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminComponent } from './app-admin.component';
import { AuthGuard } from '../auth/auth.guard';

const appOAdminRoutes:Routes = [{ path: '', component: AppAdminComponent, canActivate: [AuthGuard]}];


@NgModule({
  imports: [ RouterModule.forRoot(appAdminRoutes)],
  exports: [ RouterModule],
  declarations: []
})
export class AppAdminRoutingModule { }
