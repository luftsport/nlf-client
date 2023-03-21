import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PendingChangesGuard } from 'app/pending-changes.guard';

import { NlfOrsEditorWorkflowComponent } from 'app/ors/ors-editor/ors-editor-workflow/ors-editor-workflow.component';
import { NlfOrsComponent } from 'app/ors/ors.component';
import { NlfOrsActivitiesComponent } from 'app/ors/ors-activities/ors-activities.component';

// Fallskjerm
import { NlfOrsFallskjermComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm.component';
import { NlfOrsFallskjermReportComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-report/ors-fallskjerm-report.component';
import { NlfOrsFallskjermEditorComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-editor/ors-fallskjerm-editor.component';
import { NlfOrsFallskjermSearchComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-search/ors-fallskjerm-search.component';
import { NlfOrsFallskjermDashboardComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-dashboard/ors-fallskjerm-dashboard.component';

// Motorfly
import { NlfOrsMotorComponent } from 'app/ors/ors-motor/ors-motor.component';
import { NlfOrsMotorEditorComponent } from 'app/ors/ors-motor/ors-motor-editor/ors-motor-editor.component';
import { NlfOrsMotorReportComponent } from 'app/ors/ors-motor/ors-motor-report/ors-motor-report.component';
import { NlfOrsMotorSearchComponent } from 'app/ors/ors-motor/ors-motor-search/ors-motor-search.component';


// Sportsfly
import { NlfOrsSportsflyComponent } from 'app/ors/ors-sportsfly/ors-sportsfly.component';
import { NlfOrsSportsflyEditorComponent } from 'app/ors/ors-sportsfly/ors-sportsfly-editor/ors-sportsfly-editor.component';
import { NlfOrsSportsflyReportComponent } from 'app/ors/ors-sportsfly/ors-sportsfly-report/ors-sportsfly-report.component';
import { NlfOrsSportsflySearchComponent } from 'app/ors/ors-sportsfly/ors-sportsfly-search/ors-sportsfly-search.component';

// Seilfly
import { NlfOrsSeilflyComponent } from 'app/ors/ors-seilfly/ors-seilfly.component';
import { NlfOrsSeilflyEditorComponent } from 'app/ors/ors-seilfly/ors-seilfly-editor/ors-seilfly-editor.component';
import { NlfOrsSeilflyReportComponent } from 'app/ors/ors-seilfly/ors-seilfly-report/ors-seilfly-report.component';
import { NlfOrsSeilflySearchComponent } from 'app/ors/ors-seilfly/ors-seilfly-search/ors-seilfly-search.component';

import { NlfOrsStatsHeatmapComponent } from 'app/ors/ors-stats/ors-stats-heatmap/ors-stats-heatmap.component';

import { NlfAuthGuard } from 'app/services/auth/auth.guard';


const nlfOrsRoutes: Routes = [
  { path: 'ors/', component: NlfOrsComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Observasjons Registrerings System' } },
  // Fallskjerm
  { path: 'ors/fallskjerm', component: NlfOrsFallskjermComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Fallskjerm oversikt' } },
  { path: 'ors/fallskjerm/report/:id', component: NlfOrsFallskjermReportComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Fallskjerm rapportvisning' } },
  { path: 'ors/fallskjerm/report/:id/version/:version', component: NlfOrsFallskjermReportComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Fallskjerm viser versjon' } },
  { path: 'ors/fallskjerm/edit/:id', component: NlfOrsFallskjermEditorComponent, canActivate: [NlfAuthGuard], canDeactivate: [PendingChangesGuard], data: { title: 'OBSREG - Fallskjerm editor' } },
  { path: 'ors/fallskjerm/search', component: NlfOrsFallskjermSearchComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Fallskjerm søk' } },
  { path: 'ors/fallskjerm/dashboard/:id', component: NlfOrsFallskjermDashboardComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Fallskjerm dashboard' } },

  { path: 'ors/:activity/stats', component: NlfOrsStatsHeatmapComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - statistikk' } },
  { path: 'ors/:activity/stats/:id', component: NlfOrsStatsHeatmapComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - statistikk' } },

  //{ path: 'ors/fallskjerm/edit/workflow/:id', component: NlfOrsEditorWorkflowComponent, canActivate: [NlfAuthGuard]},


  // Motorfly
  { path: 'ors/motorfly', component: NlfOrsMotorComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Motorfly oversikt' } },
  { path: 'ors/motorfly/report/:id', component: NlfOrsMotorReportComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Motorfly rapportvisning' } },
  { path: 'ors/motorfly/report/:id/version/:version', component: NlfOrsMotorReportComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Motorfly viser version' } },
  { path: 'ors/motorfly/edit/:id', component: NlfOrsMotorEditorComponent, canActivate: [NlfAuthGuard], canDeactivate: [PendingChangesGuard], data: { title: 'OBSREG - Motorfly editor' } },
  { path: 'ors/motorfly/search', component: NlfOrsMotorSearchComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Motorfly søk' } },

  // Sportsfly
  { path: 'ors/sportsfly', component: NlfOrsSportsflyComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Sportsfly oversikt' } },
  { path: 'ors/sportsfly/report/:id', component: NlfOrsSportsflyReportComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Sportsfly rapportvisning' } },
  { path: 'ors/sportsfly/report/:id/version/:version', component: NlfOrsSportsflyReportComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Sportsfly viser version' } },
  { path: 'ors/sportsfly/edit/:id', component: NlfOrsSportsflyEditorComponent, canActivate: [NlfAuthGuard], canDeactivate: [PendingChangesGuard], data: { title: 'OBSREG - Sportsfly editor' } },
  { path: 'ors/sportsfly/search', component: NlfOrsSportsflySearchComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Sportsfly søk' } },

  // Seilfly
  { path: 'ors/seilfly', component: NlfOrsSeilflyComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Seilfly oversikt' } },
  { path: 'ors/seilfly/report/:id', component: NlfOrsSeilflyReportComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Seilfly rapportvisning' } },
  { path: 'ors/seilfly/report/:id/version/:version', component: NlfOrsSeilflyReportComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Seilfly viser version' } },
  { path: 'ors/seilfly/edit/:id', component: NlfOrsSeilflyEditorComponent, canActivate: [NlfAuthGuard], canDeactivate: [PendingChangesGuard], data: { title: 'OBSREG - Seilfly editor' } },
  { path: 'ors/seilfly/search', component: NlfOrsSeilflySearchComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Seilfly søk' } },

  // Standalones
  { path: 'ors/:activity/activities/:id', component: NlfOrsActivitiesComponent, canActivate: [NlfAuthGuard], data: { title: 'OBSREG - Aktivitet' } }
  ,
  { path: 'ors/**', redirectTo: 'ors/' }

  //{ path: 'ors/fallskjerm/edit/workflow/:id', component: NlfOrsEditorWorkflowComponent, canActivate: [NlfAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(nlfOrsRoutes, { onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  declarations: []
})

export class NlfOrsRoutingModule { }
