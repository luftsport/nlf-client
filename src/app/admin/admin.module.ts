import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NlfAdminRoutingModule } from './admin-routing.module';
// Admin
import { NlfAdminComponent } from 'app/admin/admin.component';
import { NlfAdminHelpComponent } from 'app/admin/help/help.component';
import { NlfAdminHelpEditComponent } from 'app/admin/help/help-edit/help-edit.component';

// Files
import { NlfAdminFilesComponent } from 'app/admin/files/files.component';
import { NlfAdminFilesOrphanComponent } from 'app/admin/files/files-orphan/files-orphan.component';
import { NlfAdminFilesDuplicatesComponent } from 'app/admin/files/files-duplicates/files-duplicates.component';

// Services
import { LungoIntegrationService } from 'app/api/lungo-integration.service';
// Site wide notifications
import { NlfAlertService } from 'app/services/alert/alert.service';

import { TableModule } from 'ngx-easy-table';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
// Jodit editor
import { JoditAngularModule } from 'jodit-angular';
import { NlfSharedModule } from 'app/nlf-shared.module';

@NgModule({
  declarations: [
    NlfAdminComponent,
    NlfAdminHelpComponent,
    NlfAdminHelpEditComponent,
    NlfAdminFilesComponent,
    NlfAdminFilesOrphanComponent,
    NlfAdminFilesDuplicatesComponent
  ],
  imports: [
    CommonModule,
    NlfSharedModule,
    NlfAdminRoutingModule,
    TableModule,
    JoditAngularModule
  ],
  providers: [
    LungoIntegrationService,
    NlfAlertService
  ]
})
export class NlfAdminModule { }
