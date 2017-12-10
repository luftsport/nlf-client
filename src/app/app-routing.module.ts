import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Top level app direct routes
import { DummyComponent } from './dummy/dummy.component';
import { AppOrsComponent } from './app-ors/app-ors.component';
import { AppUserTableComponent } from './app-user/app-user-table/app-user-table.component';

//Child appplication internal routes:
import { AppOrsRoutingModule } from './app-ors/app-ors-routing.module';

//Route object top level
const appRoutes: Routes = [
{ path: 'home', component: DummyComponent },
{ path: 'users', component: AppUserTableComponent },
{ path: 'ors', component: AppOrsComponent },
];

//Route object default routes
const defaultRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: DummyComponent },
];

const routes: Routes = appRoutes.concat(defaultRoutes);

@NgModule({
  imports: [RouterModule.forRoot(appRoutes),
            AppOrsRoutingModule],
  exports: [ RouterModule],
  declarations: []
})


export class AppRoutingModule { }
