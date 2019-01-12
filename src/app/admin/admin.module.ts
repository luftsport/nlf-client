import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NlfAdminRoutingModule } from './admin-routing.module';
// Admin
import { NlfAdminComponent } from 'app/admin/admin.component';
import { NlfAdminHelpComponent } from 'app/admin/help/help.component';
import { NlfAdminHelpEditComponent } from 'app/admin/help/help-edit/help-edit.component';

// Services
import { LungoIntegrationService } from 'app/api/lungo-integration.service';
// Site wide notifications
import { NlfAlertService } from 'app/services/alert/alert.service';

import { TableModule } from 'ngx-easy-table';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FontAwesomeModule } from 'ngx-icons';
// Jodit editor
import { JoditAngularModule } from 'jodit-angular';
import { NlfSharedModule } from 'app/nlf-shared.module';

@NgModule({
  declarations: [
    NlfAdminComponent,
    NlfAdminHelpComponent,
    NlfAdminHelpEditComponent,
  ],
  imports: [
    CommonModule,
    NlfSharedModule,
    NlfAdminRoutingModule,
    TableModule,
    //NgxChartsModule,
    FontAwesomeModule,
    JoditAngularModule
  ],
  providers: [
    LungoIntegrationService,
    NlfAlertService
  ]
})
export class NlfAdminModule { }
