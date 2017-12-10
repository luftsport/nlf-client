import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppUserTableComponent } from './app-user/app-user-table/app-user-table.component';
import { AppOrsComponent } from './app-ors/app-ors.component';
import { AppChildComponent } from './app-ors/app-child/app-child.component';
import { DummyComponent } from './dummy/dummy.component';

const topRoutes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', component: DummyComponent },
{ path: 'users', component: AppUserTableComponent },
{ path: 'ors', component: AppOrsComponent },
{ path: '**', component: DummyComponent }
];


let routes : Routes = [].concat(topRoutes)
  .concat(AppOrsComponent.routes);

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule],
  declarations: []
})
<<<<<<< HEAD
export class AppRoutingModule { }
=======
export class AppRoutingModule {


}

>>>>>>> c8b0b8407cac6b25e1e5ca37e0602bf5462f4249
