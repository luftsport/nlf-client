import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppChildComponent } from './app-child/app-child.component';
import { AuthGuard } from '../auth/auth.guard';

const appOrsRoutes:Routes = [{ path: 'ors/child', component: AppChildComponent, canActivate: [AuthGuard]}];


@NgModule({
  imports: [ RouterModule.forRoot(appOrsRoutes)],
  exports: [ RouterModule],
  declarations: []
})

export class AppOrsRoutingModule { }
