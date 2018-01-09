import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Top level app direct routes
import { NlfUiDummyComponent } from './ui/dummy/dummy.component';
import { NlfAuthComponent } from './services/auth/auth.component';
import { NlfOrsComponent } from './ors/ors.component';
import { NlfUserTableComponent } from './user/user-table/user-table.component';

// Auth guard
import { NlfAuthGuard } from './services/auth/auth.guard';

// Child appplication internal routes:
import { NlfOrsRoutingModule } from './ors/ors-routing.module';
import { NlfUserRoutingModule } from './user/user-routing.module';

/**
  Route object top level
  AuthGuard just tests that user is logged in, nothing more

  Permalinks: https://angular.io/api/router/UrlMatcher
  eg match /obs/{int id|mongodb _id}
  **/
const routes: Routes = [
{ path: 'home', component: NlfUiDummyComponent },
{ path: 'users', component: NlfUserTableComponent}, // , canActivate: [AuthGuard] },
{ path: 'ors', component: NlfOrsComponent }, // canActivate: [AuthGuard] },
{ path: 'login', component: NlfAuthComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect root
{ path: '**', component: NlfUiDummyComponent }, // Not found
];


@NgModule({
  imports: [RouterModule.forRoot(routes),
            NlfOrsRoutingModule,
            NlfUserRoutingModule],
  exports: [ RouterModule],
  providers: [NlfAuthGuard],
  declarations: []
})


export class NlfRoutingModule { }
