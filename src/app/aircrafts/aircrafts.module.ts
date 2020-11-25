import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NlfSharedModule } from 'app/nlf-shared.module';
//import { NlfAircraftsSharedModule } from './aircrafts-shared.module';

import { NlfAircraftsRoutingModule } from './aircrafts-routing.module';
import { NlfAircraftsListComponent } from './aircrafts-list/aircrafts-list.component';
import { AircraftsComponent } from './aircrafts/aircrafts.component';
import { NlfAircraftsEditPageComponent } from './aircrafts-edit-page/aircrafts-edit-page.component';
import { NlfAircraftsViewComponent } from './aircrafts-view/aircrafts-view.component';
import { NlfAircraftSummaryComponent } from './aircraft-summary/aircraft-summary.component';
import { NlfAircraftOrsComponent } from './aircraft-ors/aircraft-ors.component';

import { TableModule } from 'ngx-easy-table';
import { FontAwesomeModule } from 'ngx-icons';

@NgModule({
  declarations: [
    NlfAircraftsListComponent,
    NlfAircraftsEditPageComponent,
    NlfAircraftsViewComponent,
    NlfAircraftsViewComponent ,
    NlfAircraftOrsComponent,
    AircraftsComponent,
  ],
  imports: [
    CommonModule,
    NlfAircraftsRoutingModule,
    TableModule,
    FontAwesomeModule,
    NlfSharedModule,
    //NlfAircraftsSharedModule,
  ]
})
export class NlfAircraftsModule { }
