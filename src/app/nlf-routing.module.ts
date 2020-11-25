import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Top level app direct routes
import { NlfUiDummyComponent } from 'app/ui/dummy/dummy.component';
import { NlfOrsComponent } from 'app/ors/ors.component';
import { NlfAuthComponent } from 'app/services/auth/auth.component';
//import { NlfDashboardComponent } from 'app/dashboard/dashboard.component';
import { NlfUserTableComponent } from 'app/user/user-table/user-table.component';
import { NlfContentComponent } from 'app/content/content.component';
import { NlfCustomPreloader } from 'app/nlf-routing-loader';

// Auth guard
import { NlfAuthGuard } from 'app/services/auth/auth.guard';

// Child appplication internal routes:
import { NlfOrsRoutingModule } from 'app/ors/ors-routing.module';
import { NlfUserRoutingModule } from 'app/user/user-routing.module';
import { NlfErrorRoutingModule } from 'app/error/error-routing.module';
import { NlfErrorComponent } from 'app/error/error.component';
//import { NlfDashboardRoutingModule } from 'app/dashboard/dashboard-routing.module';
import { NlfContentRoutingModule } from 'app/content/content-routing.module';
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
  { path: 'home', component: NlfUiDummyComponent ,data: {title: 'NLF - Platform'} },
  { path: 'error', component: NlfErrorComponent, data: { bc: 'Error', title: 'ERROR'} },

  // Eager loaded apps
  // NO! Test only{ path: 'users', component: NlfUserTableComponent, data: { bc: 'Users', title: 'Users' } },
  { path: 'ors', component: NlfOrsComponent, data: { bc: 'ORS', title: 'ORS'} },
  //{ path: 'dashboard', component: NlfDashboardComponent, data: { bc: 'Dashboard' } },
  { path: 'content', component: NlfContentComponent, data: { bc: 'Content', title: 'Content'  } },
  //{ path: 'test', component: TestComponent, data: { bc: 'Testing' } },
  // { path: 'user', component: NlfUserProfileComponent, data: { bc: 'Users', title: 'Users' } },

  // Lazy loaded
  { path: 'admin', loadChildren: 'app/admin/admin.module#NlfAdminModule', data: { bc: 'Admin', preload: false , title: 'Admin' } },
  { path: 'integration', loadChildren: 'app/integration/integration.module#NlfIntegrationModule', data: { bc: 'Integration', preload: false , title: 'Integration' } },
  { path: 'aip', loadChildren: 'app/aip/aip.module#NlfAipModule', data: { bc: 'AIP', preload: false , title: 'AIP' } },
  { path: 'organizations', loadChildren: 'app/organizations/organizations.module#NlfOrganizationsModule', data: { bc: 'Organizations', preload: false , title: 'Organizations' } },
  { path: 'aircraft', loadChildren: 'app/aircrafts/aircrafts.module#NlfAircraftsModule', data: { bc: 'Aircraft', preload: false , title: 'Aircraft' } },

  // Permalinks
  { path: 'app/obs', loadChildren: 'app/permalinks/permalinks.module#NlfPermalinksModule', data: { preload: false } },
  { path: 'app/obs/', loadChildren: 'app/permalinks/permalinks.module#NlfPermalinksModule', data: { preload: false } },

  // Finishing redirects
  { path: '', redirectTo: 'home', pathMatch: 'full'}, // redirect root
  { path: '**', component: NlfUiDummyComponent }
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
