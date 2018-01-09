import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NlfUserComponent } from './user.component';
import { NlfAuthGuard } from '../services/auth/auth.guard';

const nlfUserRoutes: Routes = [{ path: 'user/profile', component: NlfUserComponent, canActivate: [NlfAuthGuard]}];


@NgModule({
  imports: [ RouterModule.forRoot(nlfUserRoutes)],
  exports: [ RouterModule],
  declarations: []
})
export class NlfUserRoutingModule { }
