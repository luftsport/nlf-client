import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppChildComponent } from './app-child/app-child.component';

const appOrsRoutes:Routes = [{ path: 'ors/child', component: AppChildComponent }];


@NgModule({
  imports: [ RouterModule.forRoot(appOrsRoutes)],
  exports: [ RouterModule],
  declarations: []
})

export class AppOrsRoutingModule { }
