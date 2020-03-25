import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NlfSharedModule } from 'app/nlf-shared.module';
import { AgmCoreModule } from '@agm/core';
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
    AgmCoreModule.forRoot({ // Google maps
      apiKey: 'AIzaSyBW1IdM-nFGiwwfP4H2sJg5YiromIuysJ8'
    }),
  ],
  providers: [
    GeoLocationService
  ]
})
export class NlfAipModule { }
