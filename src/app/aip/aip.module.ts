import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NlfSharedModule } from 'app/nlf-shared.module';
import { NlfAipRoutingModule } from './aip-routing.module';

import {NlfAipAirspaceComponent } from './aip-airspace/aip-airspace.component';
import { GeoLocationService } from 'app/services/geo/geo-location.service';

@NgModule({
  declarations: [
    NlfAipAirspaceComponent
  ],
  imports: [
    CommonModule,
    NlfSharedModule,
    NlfAipRoutingModule,
  ],
  providers: [
    GeoLocationService
  ]
})
export class NlfAipModule { }
