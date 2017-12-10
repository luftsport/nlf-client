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
<<<<<<< HEAD
export class AppRoutingModule { }
=======
export class AppRoutingModule {


}

>>>>>>> c8b0b8407cac6b25e1e5ca37e0602bf5462f4249
