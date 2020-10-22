import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NlfOrsEditorWorkflowComponent } from 'app/ors/ors-editor/ors-editor-workflow/ors-editor-workflow.component';
import { NlfOrsComponent } from 'app/ors/ors.component';

import { NlfOrsFallskjermComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm.component';
import { NlfOrsFallskjermReportComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-report/ors-fallskjerm-report.component';
import { NlfOrsFallskjermEditorComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-editor/ors-fallskjerm-editor.component';
import { NlfOrsFallskjermSearchComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-search/ors-fallskjerm-search.component';
import { NlfOrsFallskjermDashboardComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-dashboard/ors-fallskjerm-dashboard.component';

import { NlfOrsMotorComponent } from 'app/ors/ors-motor/ors-motor.component';
import { NlfOrsMotorEditorComponent } from 'app/ors/ors-motor/ors-motor-editor/ors-motor-editor.component';
import { NlfOrsMotorReportComponent } from 'app/ors/ors-motor/ors-motor-report/ors-motor-report.component';
import { NlfOrsMotorSearchComponent } from 'app/ors/ors-motor/ors-motor-search/ors-motor-search.component';
import {  NlfOrsActivitiesComponent } from 'app/ors/ors-activities/ors-activities.component';

import {  NlfOrsStatsHeatmapComponent } from 'app/ors/ors-stats/ors-stats-heatmap/ors-stats-heatmap.component';

import { NlfAuthGuard } from 'app/services/auth/auth.guard';


const nlfOrsRoutes: Routes = [
  { path: 'ors/', component: NlfOrsComponent, canActivate: [NlfAuthGuard], data: { title: 'ORS - Observasjons Registrerings System' } },
  // Fallskjerm
  { path: 'ors/fallskjerm', component: NlfOrsFallskjermComponent, canActivate: [NlfAuthGuard], data: { title: 'ORS - Fallskjerm oversikt' } },
  { path: 'ors/fallskjerm/report/:id', component: NlfOrsFallskjermReportComponent, canActivate: [NlfAuthGuard], data: { title: 'ORS - Fallskjerm rapportvisning' } },
  { path: 'ors/fallskjerm/report/:id/version/:version', component: NlfOrsFallskjermReportComponent, canActivate: [NlfAuthGuard], data: { title: 'ORS - Fallskjerm viser versjon' } },
  { path: 'ors/fallskjerm/edit/:id', component: NlfOrsFallskjermEditorComponent, canActivate: [NlfAuthGuard], data: { title: 'ORS - Fallskjerm editor' } },
  { path: 'ors/fallskjerm/search', component: NlfOrsFallskjermSearchComponent, canActivate: [NlfAuthGuard], data: { title: 'ORS - Fallskjerm søk' } },
  { path: 'ors/fallskjerm/dashboard/:id', component: NlfOrsFallskjermDashboardComponent, canActivate: [NlfAuthGuard], data: { title: 'ORS - Fallskjerm dashboard' } },

  { path: 'ors/:activity/stats', component: NlfOrsStatsHeatmapComponent, canActivate: [NlfAuthGuard], data: { title: 'ORS - statistikk' } },
  { path: 'ors/:activity/stats/:id', component: NlfOrsStatsHeatmapComponent, canActivate: [NlfAuthGuard], data: { title: 'ORS - statistikk' } },

  //{ path: 'ors/fallskjerm/edit/workflow/:id', component: NlfOrsEditorWorkflowComponent, canActivate: [NlfAuthGuard]},

  
  // Motorfly
  { path: 'ors/motorfly', component: NlfOrsMotorComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Motorfly oversikt' } },
  { path: 'ors/motorfly/report/:id', component: NlfOrsMotorReportComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Motorfly rapportvisning' } },
  { path: 'ors/motorfly/report/:id/version/:version', component: NlfOrsMotorReportComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Motorfly viser version' } },
  { path: 'ors/motorfly/edit/:id', component: NlfOrsMotorEditorComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Motorfly editor' } },
  { path: 'ors/motorfly/search', component: NlfOrsMotorSearchComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Motorfly søk' } },

  // Stndalones
  { path: 'ors/:activity/activities/:id', component: NlfOrsActivitiesComponent, canActivate: [NlfAuthGuard], data: { title: 'ORS - Aktivitet' } }
  ,
  { path: 'ors/**',  redirectTo: 'ors/'}

  //{ path: 'ors/fallskjerm/edit/workflow/:id', component: NlfOrsEditorWorkflowComponent, canActivate: [NlfAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(nlfOrsRoutes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  declarations: []
})

export class NlfOrsRoutingModule { }
