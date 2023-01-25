import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NlfSharedModule } from 'app/nlf-shared.module';

import { NlfIntegrationRoutingModule } from './integration-routing.module';
import { NlfWorkersStatusComponent } from './workers-status/workers-status.component';
import { WorkersLogsComponent } from './workers-logs/workers-logs.component';
import { ProcessInfoComponent } from './process-info/process-info.component';

import { MomentModule } from 'ngx-moment'; // optional, provides moment-style pipes for date formatting


import { TableModule } from 'ngx-easy-table';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FontAwesomeModule } from 'ngx-icons';
import { NlfChangesHourComponent } from './changes-hour/changes-hour.component';
import { WorkerLogComponent } from './worker-log/worker-log.component';

@NgModule({
  declarations: [
    NlfWorkersStatusComponent,
    WorkersLogsComponent,
    ProcessInfoComponent,
    NlfChangesHourComponent,
    WorkerLogComponent,
  ],
  imports: [
    CommonModule,
    NlfSharedModule,
    NlfIntegrationRoutingModule,
    TableModule,
    NgxChartsModule,
    FontAwesomeModule,
    MomentModule,
  ],
  providers: [

  ]
})
export class NlfIntegrationModule { }
