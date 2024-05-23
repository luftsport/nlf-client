import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ENV
import { environment } from 'environments/environment';

// Top level app direct routes
import { NlfUiDummyComponent } from 'app/ui/dummy/dummy.component';
import { NlfOrsComponent } from 'app/ors/ors.component';
import { NlfContentComponent } from 'app/content/content.component';
import { NlfCustomPreloader } from 'app/nlf-routing-loader';
// Auth guard
import { NlfAuthGuard } from 'app/services/auth/auth.guard';
// Child appplication internal routes:
import { NlfOrsRoutingModule } from 'app/ors/ors-routing.module';
import { NlfUserRoutingModule } from 'app/user/user-routing.module';
import { NlfErrorRoutingModule } from 'app/error/error-routing.module';
import { NlfErrorComponent } from 'app/error/error.component';
import { NlfContentRoutingModule } from 'app/content/content-routing.module';
// import { NlfOrganizationsRoutingModule } from 'app/organizations/organizations-routing.module';

// Testing - error@NIF for competences
import { NlfMemberComponent } from 'app/member/member.component';
import { NlfCompetenceTableComponent } from 'app/member/competence-table/competence-table.component';

/**
 * Route object top level
 * 
 * AuthGuard just tests that user is logged in, nothing more
 * For public pages data: { isPublic: true }
 * 
 * 
 **/

const ENV = environment;

let _routes: Routes = [

  { path: 'home', component: NlfUiDummyComponent, data: { title: 'NLF - Platform', prod: true } },
  { path: 'error', component: NlfErrorComponent, data: { bc: 'Error', title: 'ERROR', prod: true } },

  // Eager loaded apps
  { path: 'ors', component: NlfOrsComponent, data: { bc: 'OBSREG', title: 'OBSREG', prod: true } },
  { path: 'content', component: NlfContentComponent, data: { bc: 'Content', title: 'Content', prod: true } },

  // Lazy loaded
  { path: 'admin', loadChildren: () => import('app/admin/admin.module').then(m => m.NlfAdminModule), data: { bc: 'Admin', preload: false, title: 'Admin', prod: true } },
  { path: 'integration', loadChildren: () => import('app/integration/integration.module').then(m => m.NlfIntegrationModule), data: { bc: 'Integration', preload: false, title: 'Integration', prod: true } },
  { path: 'aip', loadChildren: () => import('app/aip/aip.module').then(m => m.NlfAipModule), data: { bc: 'AIP', preload: false, title: 'AIP', prod: true } },
  { path: 'organizations', loadChildren: () => import('app/organizations/organizations.module').then(m => m.NlfOrganizationsModule), data: { bc: 'Organizations', preload: false, title: 'Organizations', prod: true} },
  { path: 'aircraft', loadChildren: () => import('app/aircrafts/aircrafts.module').then(m => m.NlfAircraftsModule), data: { bc: 'Aircraft', preload: false, title: 'Aircraft', prod: true } },

  // Permalinks
  { path: 'app/obs', loadChildren: () => import('app/permalinks/permalinks.module').then(m => m.NlfPermalinksModule), data: { preload: false, prod: true } },
  { path: 'app/obs/', loadChildren: () => import('app/permalinks/permalinks.module').then(m => m.NlfPermalinksModule), data: { preload: false, prod: true } },

  // Member check
  { path: 'medlem', component: NlfMemberComponent, data: { bc: 'Medlemssjekk', title: 'Medlemssjekk', prod: false } },
  { path: 'medlem/kompetanse', component: NlfCompetenceTableComponent, data: { bc: 'Kompetanser', title: 'Kompetanser', prod: false } },
  
  // Fallskjerm
  { path: 'fallskjerm', loadChildren: () => import('app/fallskjerm/fallskjerm.module').then(m => m.NlfFallskjermModule), data: { bc: 'Fallskjerm', preload: false, title: 'Fallskjerm', prod: true } },

  
  // Catch all
  { path: '**', component: NlfUiDummyComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];


// Filter return only whitelisted routes for PROD
// Whitelist route with {..., data: {prod: true}} OR no data
if(ENV.production===true) {

  _routes = _routes.filter((route) => {
    console.log('Routes filter', route);
    try {
      if(!route.hasOwnProperty('data') || route.data.prod===true) {
        return route;
      }
    } catch (e) {};

    return false;
  });
}

@NgModule({
  imports: [
    RouterModule.forRoot(_routes, { preloadingStrategy: NlfCustomPreloader, relativeLinkResolution: 'legacy' }), //, { enableTracing: true }),
    NlfOrsRoutingModule,
    NlfUserRoutingModule,
    NlfErrorRoutingModule,
    NlfContentRoutingModule
  ],
  exports: [RouterModule],
  providers: [NlfAuthGuard, NlfCustomPreloader],
  declarations: []
})
export class NlfRoutingModule { }
