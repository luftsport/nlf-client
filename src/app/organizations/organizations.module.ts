import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NlfSharedModule } from 'app/nlf-shared.module';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { NlfOrganizationsRoutingModule } from './organizations-routing.module';

import { NlfOrganizationsComponent } from './organizations.component'
import { NlfOrganizationComponent } from './organization/organization.component';
import { NlfOrganizationDetailsComponent } from './organization-details/organization-details.component';

import { NlfOrganizationFunctionsComponent } from './organization-functions/organization-functions.component';
import { NlfOrganizationAircraftsComponent } from './organization-aircrafts/organization-aircrafts.component';
import { NlfOrganizationLocationsComponent } from './organization-locations/organization-locations.component';
import { NlfOrganizationLocationsEditComponent } from './organization-locations-edit/organization-locations-edit.component';
import { NlfOrganizationOrsComponent } from './organization-ors/organization-ors.component';
import { NlfOrganizationToolbarComponent } from './organization-toolbar/organization-toolbar.component';
import { NlfOrganizationsNearComponent } from './organizations-near/organizations-near.component';

// Stats
import { NlfOrganizationStatsComponent } from './organization-stats/organization-stats.component';
import { NlfOrganizationStatsAgeDistributionComponent } from './organization-stats/organization-stats-age-distribution/organization-stats-age-distribution.component';

import { NlfOrganizationStatsSankeyComponent } from './organization-stats/organization-stats-sankey/organization-stats-sankey.component';
import { NlfOrganizationStatsPopulationPyramidComponent } from './organization-stats/organization-stats-population-pyramid/organization-stats-population-pyramid.component';


// SELECTERS @TODO move to seperate universal
import { NlfLocationSelectComponent } from 'app/organizations/organization-locations/location-select/location-select.component';

//import { NlfOrsEditorTagComponent } from 'app/ors/ors-editor/ors-editor-tag/ors-editor-tag.component';
// Not working yet (v3...)
// import {  NlfOrganizationsStatsDotComponent } from './organization-stats/organization-stats-dot/organization-stats-dot.component';

// GEO
import { GeoLocationService } from 'app/services/geo/geo-location.service';

// AIP
import { NlfAipAirportNearComponent } from 'app/aip/aip-airport-near/aip-airport-near.component';

// Table
import { TableModule } from 'ngx-easy-table';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    NlfOrganizationsComponent,
    NlfOrganizationComponent,
    NlfOrganizationDetailsComponent,
    NlfOrganizationFunctionsComponent,
    NlfOrganizationAircraftsComponent,
    NlfOrganizationLocationsComponent,
    NlfOrganizationLocationsEditComponent,
    // Stats
    NlfOrganizationStatsComponent,
    NlfOrganizationStatsAgeDistributionComponent,
    NlfOrganizationStatsSankeyComponent,
    NlfOrganizationStatsPopulationPyramidComponent,

    // Locations Icao selectors
    NlfLocationSelectComponent,
    // NlfOrganizationsStatsDotComponent,
    // OBSREG
    NlfOrganizationOrsComponent,
    NlfOrganizationToolbarComponent,
    NlfOrganizationsNearComponent,
    NlfAipAirportNearComponent,
  ],
  imports: [
    CommonModule,
    NlfSharedModule,
    NlfOrganizationsRoutingModule,
    TableModule,
    DragDropModule,
    NgxChartsModule,
   
  ],
  providers: [
    GeoLocationService,
  ]
})
export class NlfOrganizationsModule { }
