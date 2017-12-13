import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppUserComponent } from './app-user.component';
import { AuthGuard } from '../auth/auth.guard';

const appUserRoutes:Routes = [{ path: '', component: AppUserComponent, canActivate: [AuthGuard]}];


@NgModule({
  imports: [ RouterModule.forRoot(appUserRoutes)],
  exports: [ RouterModule],
  declarations: []
})
export class AppUserRoutingModule { }
