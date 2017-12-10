import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppUserTableComponent } from './app-user/app-user-table/app-user-table.component';
import { AppOrsComponent } from './app-ors/app-ors.component';
import { DummyComponent } from './dummy/dummy.component';

const appRoutes: Routes = [
{ path: 'home', component: DummyComponent },
{ path: 'users', component: AppUserTableComponent },
{ path: 'ors', component: AppOrsComponent },
];

const defaultRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: DummyComponent },
];


let routes = appRoutes
  .concat(AppOrsComponent.routes)
  .concat(defaultRoutes);

@NgModule({
  imports: [ RouterModule.forRoot(routes,{ useHash: true })],
  exports: [ RouterModule],
  declarations: []
})
export class AppRoutingModule {


}

