import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppUserTableComponent } from './app-user/app-user-table/app-user-table.component';
import { AppOrsComponent } from './app-ors/app-ors.component';
import { AppChildComponent } from './app-ors/app-child/app-child.component';
import { DummyComponent } from './dummy/dummy.component';

const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', component: DummyComponent },
{ path: 'users', component: AppUserTableComponent },
{ path: 'ors', component: AppOrsComponent },
{ path: 'ors/child', component: AppChildComponent },
{ path: '**', component: DummyComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule],
  declarations: []
})
export class AppRoutingModule { }
