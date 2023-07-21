import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NlfFallskjermComponent } from './fallskjerm.component';
import { TableModule } from 'ngx-easy-table';
import { NlfSharedModule } from 'app/nlf-shared.module';
import { NlfFallskjermRoutingModule } from './fallskjerm-routing.module';
import { NlfFallskjermTandemComponent } from './fallskjerm-tandem/fallskjerm-tandem.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';

@NgModule({
  declarations: [
    NlfFallskjermComponent,
    NlfFallskjermTandemComponent
  ],
  imports: [
    CommonModule,
    NlfFallskjermRoutingModule,
    NlfSharedModule,
    TableModule,
    NgxCsvParserModule

  ]
})
export class NlfFallskjermModule { }
