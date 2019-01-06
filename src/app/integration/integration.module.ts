import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NlfIntegrationRoutingModule } from './integration-routing.module';
import { NlfWorkersStatusComponent } from './workers-status/workers-status.component';
import { WorkersLogsComponent } from './workers-logs/workers-logs.component';
import { ProcessInfoComponent } from './process-info/process-info.component';

// Services
import { LungoService } from 'app/api/lungo.service';
// Site wide notifications
import { NlfAlertService } from 'app/services/alert/alert.service';

import { TableModule } from 'ngx-easy-table';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FontAwesomeModule } from 'ngx-icons';
import { NlfChangesHourComponent } from './changes-hour/changes-hour.component';

@NgModule({
  declarations: [
    NlfWorkersStatusComponent,
    WorkersLogsComponent,
    ProcessInfoComponent,
    NlfChangesHourComponent,
  ],
  imports: [
    CommonModule,
    NlfIntegrationRoutingModule,
    TableModule,
    NgxChartsModule,
    FontAwesomeModule
  ],
  providers: [
    LungoService,
    NlfAlertService
  ]
})
export class NlfIntegrationModule { }
