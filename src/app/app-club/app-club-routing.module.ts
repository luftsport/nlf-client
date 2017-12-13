import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppClubComponent } from './app-club.component';
import { AuthGuard } from '../auth/auth.guard';

const appClubRoutes:Routes = [{ path: '', component: AppClubComponent, canActivate: [AuthGuard]}];


@NgModule({
  imports: [ RouterModule.forRoot(appClubRoutes)],
  exports: [ RouterModule],
  declarations: []
})
export class AppClubRoutingModule { }
