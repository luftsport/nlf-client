import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Top level app direct routes
import { NlfUiDummyComponent } from './ui/dummy/dummy.component';
import { NlfOrsComponent } from './ors/ors.component';
import { NlfAuthComponent } from './services/auth/auth.component';
import { NlfDashboardComponent } from './dashboard/dashboard.component';
import { NlfUserTableComponent } from './user/user-table/user-table.component';
import { NlfAdminComponent } from './admin/admin.component';


// Auth guard
import { NlfAuthGuard } from './services/auth/auth.guard';

// Child appplication internal routes:
import { NlfOrsRoutingModule } from './ors/ors-routing.module';
import { NlfUserRoutingModule } from './user/user-routing.module';
import { NlfErrorRoutingModule } from './error/error-routing.module';
import { NlfDashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { NlfAdminRoutingModule } from './admin/admin-routing.module';

/**
  Route object top level
  AuthGuard just tests that user is logged in, nothing more

  Permalinks: https://angular.io/api/router/UrlMatcher
  eg match /obs/{int id|mongodb _id}
  **/
const routes: Routes = [
{ path: 'users', component: NlfUserTableComponent, canActivate: [NlfAuthGuard] },
{ path: 'ors', component: NlfOrsComponent, canActivate: [NlfAuthGuard] },
{ path: 'dashboard', component: NlfDashboardComponent, canActivate: [NlfAuthGuard] },
{ path: 'admin', component: NlfAdminComponent, canActivate: [NlfAuthGuard] },
{ path: 'login', component: NlfAuthComponent },
{ path: '', redirectTo: '/', pathMatch: 'full' }, // redirect root
{ path: '**', component: NlfUiDummyComponent, canActivate: [NlfAuthGuard]  }, // Not found
];


@NgModule({
  imports: [RouterModule.forRoot(routes),
            NlfOrsRoutingModule,
            NlfUserRoutingModule,
            NlfDashboardRoutingModule,
            NlfErrorRoutingModule,
            NlfAdminRoutingModule
          ],
  exports: [ RouterModule],
  providers: [NlfAuthGuard],
  declarations: []
})


export class NlfRoutingModule { }
