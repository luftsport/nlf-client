import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NlfAdminComponent } from './admin.component';
import { NlfAuthGuard } from '../services/auth/auth.guard';

const nlfAdminRoutes: Routes = [{ path: '', component: NlfAdminComponent, canActivate: [NlfAuthGuard]}];

@NgModule({
  imports: [ RouterModule.forRoot(nlfAdminRoutes)],
  exports: [ RouterModule],
  declarations: []
})
export class NlfAdminRoutingModule { }
