import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NlfAuthGuard } from 'app/services/auth/auth.guard';

import { NlfOrganizationsComponent } from 'app/organizations/organizations.component';
import { NlfOrganizationComponent } from 'app/organizations/organization/organization.component';

import { NlfOrganizationAircraftsComponent } from './organization-aircrafts/organization-aircrafts.component';
import { NlfOrganizationStatsComponent } from 'app/organizations/organization-stats/organization-stats.component';
import { NlfOrganizationLocationsComponent } from 'app/organizations/organization-locations/organization-locations.component';
import { NlfOrganizationLocationsEditComponent } from 'app/organizations/organization-locations-edit/organization-locations-edit.component';
import { NlfOrganizationDetailsComponent } from 'app/organizations/organization-details/organization-details.component';

const routes: Routes = [
  //{ path: '', component: NlfOrganizationsComponent, canActivate: [NlfAuthGuard]},

  { path: '', component: NlfOrganizationsComponent, canActivate: [NlfAuthGuard] },

  {
    path: ':id', component: NlfOrganizationComponent, canActivate: [NlfAuthGuard],
    children: [
      { path: '', component: NlfOrganizationDetailsComponent, canActivate: [NlfAuthGuard] },
      { path: 'aircraft', component: NlfOrganizationAircraftsComponent, canActivate: [NlfAuthGuard] },
      { path: 'locations', component: NlfOrganizationLocationsComponent, canActivate: [NlfAuthGuard] },
      { path: 'location/edit/:idx', component: NlfOrganizationLocationsEditComponent, canActivate: [NlfAuthGuard] },
      // ORS is just a redirect

      { path: 'stats', component: NlfOrganizationStatsComponent, canActivate: [NlfAuthGuard] }
    ]
  },
  { path: ':id/ors', redirectTo: '/ors', pathMatch: 'full' },
  //{ path: '', redirectTo: '376', pathMatch: 'full' },
  // ORS, STATS, LOCATIONS & AIRCRAFTS


  // Also do it for the fun of it?
  { path: 'fallskjerm/:id', component: NlfOrganizationComponent, canActivate: [NlfAuthGuard] },
  { path: 'motorfly/:id', component: NlfOrganizationComponent, canActivate: [NlfAuthGuard] },
  { path: 'ballong/:id', component: NlfOrganizationComponent, canActivate: [NlfAuthGuard] },
  { path: 'mikrofly/:id', component: NlfOrganizationComponent, canActivate: [NlfAuthGuard] },
  { path: 'modellfly/:id', component: NlfOrganizationComponent, canActivate: [NlfAuthGuard] },
  { path: 'seilfly/:id', component: NlfOrganizationComponent, canActivate: [NlfAuthGuard] },

  { path: '**', component: NlfOrganizationsComponent, canActivate: [NlfAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NlfOrganizationsRoutingModule { }
