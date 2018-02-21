import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NlfOrsChildComponent } from './ors-child/ors-child.component';
import { NlfOrsFallskjermComponent } from './ors-fallskjerm/ors-fallskjerm.component';
import { NlfOrsFallskjermReportComponent } from './ors-fallskjerm/ors-fallskjerm-report/ors-fallskjerm-report.component';
import { NlfOrsEditorComponent } from './ors-editor/ors-editor.component';
import { NlfOrsEditorWorkflowComponent } from './ors-editor/ors-editor-workflow/ors-editor-workflow.component';

import { NlfAuthGuard } from '../services/auth/auth.guard';


const nlfOrsRoutes: Routes = [{ path: 'ors/child/:id', component: NlfOrsChildComponent, canActivate: [NlfAuthGuard]},
                              { path: 'ors/fallskjerm', component: NlfOrsFallskjermComponent, canActivate: [NlfAuthGuard]},
                              { path: 'ors/fallskjerm/report/:id', component: NlfOrsFallskjermReportComponent, canActivate: [NlfAuthGuard]},
                              { path: 'ors/fallskjerm/report/:id/version/:version', component: NlfOrsFallskjermReportComponent, canActivate: [NlfAuthGuard]},
                              { path: 'ors/fallskjerm/edit/:id', component: NlfOrsEditorComponent, canActivate: [NlfAuthGuard]},
                              { path: 'ors/fallskjerm/edit/workflow/:id', component: NlfOrsEditorWorkflowComponent, canActivate: [NlfAuthGuard]}
                            ];

@NgModule({
  imports: [ RouterModule.forRoot(nlfOrsRoutes, {onSameUrlNavigation: 'reload'})],
  exports: [ RouterModule],
  declarations: []
})

export class NlfOrsRoutingModule { }
