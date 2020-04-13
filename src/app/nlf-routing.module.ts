import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Top level app direct routes
import { NlfUiDummyComponent } from './ui/dummy/dummy.component';
import { NlfOrsComponent } from './ors/ors.component';
import { NlfAuthComponent } from './services/auth/auth.component';
//import { NlfDashboardComponent } from './dashboard/dashboard.component';
import { NlfUserTableComponent } from './user/user-table/user-table.component';
import { NlfContentComponent } from './content/content.component';
import { NlfCustomPreloader } from 'app/nlf-routing-loader';

// Auth guard
import { NlfAuthGuard } from './services/auth/auth.guard';

// Child appplication internal routes:
import { NlfOrsRoutingModule } from './ors/ors-routing.module';
import { NlfUserRoutingModule } from './user/user-routing.module';
import { NlfErrorRoutingModule } from './error/error-routing.module';
import { NlfErrorComponent } from './error/error.component';
//import { NlfDashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { NlfContentRoutingModule } from './content/content-routing.module';
// import { NlfOrganizationsRoutingModule } from 'app/organizations/organizations-routing.module';

/// T E S T ///
//import { TestComponent } from 'app/test/test.component';
/**
  Route object top level
  AuthGuard just tests that user is logged in, nothing more

  Permalinks: https://angular.io/api/router/UrlMatcher
  eg match /obs/{int id|mongodb _id}

  For public pages data: { isPublic: true }

  @todo investigate lazy-loading

  **/
const routes: Routes = [
  { path: 'home', component: NlfUiDummyComponent },
  { path: 'error', component: NlfErrorComponent, data: { bc: 'Error' } },

  // Eager loaded apps
  { path: 'users', component: NlfUserTableComponent, data: { bc: 'Users' } },
  { path: 'ors', component: NlfOrsComponent, data: { bc: 'ORS' } },
  //{ path: 'dashboard', component: NlfDashboardComponent, data: { bc: 'Dashboard' } },
  { path: 'content', component: NlfContentComponent, data: { bc: 'Content' } },
  //{ path: 'test', component: TestComponent, data: { bc: 'Testing' } },

  // Lazy loaded
  { path: 'admin', loadChildren: './admin/admin.module#NlfAdminModule', data: { bc: 'Admin', preload: false } },
  { path: 'integration', loadChildren: './integration/integration.module#NlfIntegrationModule', data: { bc: 'Integration', preload: false } },
  { path: 'aip', loadChildren: './aip/aip.module#NlfAipModule', data: { bc: 'AIP', preload: false } },
  { path: 'organizations', loadChildren: './organizations/organizations.module#NlfOrganizationsModule', data: { bc: 'Organizations', preload: false } },
  { path: 'aircraft', loadChildren: './aircrafts/aircrafts.module#NlfAircraftsModule', data: { bc: 'Aircraft', preload: false } },

  // Permalinks
  { path: 'app/obs', loadChildren: './permalinks/permalinks.module#NlfPermalinksModule', data: { preload: false } },
  { path: 'app/obs/', loadChildren: './permalinks/permalinks.module#NlfPermalinksModule', data: { preload: false } },

  // Finishing redirects
  { path: '', redirectTo: 'home', pathMatch: 'full'}, // redirect root
  { path: '**', component: NlfUiDummyComponent },
];

// , onSameUrlNavigation: 'reload'
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: NlfCustomPreloader }), //, { enableTracing: true }),
    NlfOrsRoutingModule,
    NlfUserRoutingModule,
    //NlfDashboardRoutingModule,
    NlfErrorRoutingModule,
    NlfContentRoutingModule
  ],
  exports: [RouterModule],
  providers: [NlfAuthGuard, NlfCustomPreloader],
  declarations: []
})
export class NlfRoutingModule { }
