import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Top level app direct routes
import { AuthComponent } from './auth/auth.component';
import { DummyComponent } from './ui/dummy/dummy.component';
import { AppOrsComponent } from './app-ors/app-ors.component';
import { AppUserTableComponent } from './app-user/app-user-table/app-user-table.component';

//Auth guard
import { AuthGuard } from './auth/auth.guard';

//Child appplication internal routes:
import { AppOrsRoutingModule } from './app-ors/app-ors-routing.module';
import { AppUserRoutingModule } from './app-user/app-user-routing.module';

/**
  Route object top level
  AuthGuard just tests that user is logged in, nothing more

  Permalinks: https://angular.io/api/router/UrlMatcher
  eg match /obs/{int id|mongodb _id}
  **/
const routes: Routes = [
{ path: 'home', component: DummyComponent },
{ path: 'users', component: AppUserTableComponent, canActivate: [AuthGuard] },
{ path: 'ors', component: AppOrsComponent , canActivate: [AuthGuard] },
{ path: 'login', component: AuthComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' }, //redirect root
{ path: '**', component: DummyComponent }, //Not found
];


@NgModule({
  imports: [RouterModule.forRoot(routes),
            AppOrsRoutingModule,
            AppUserRoutingModule],
  exports: [ RouterModule],
  providers: [AuthGuard],
  declarations: []
})


export class AppRoutingModule { }
