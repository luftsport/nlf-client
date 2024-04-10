import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NlfFallskjermComponent } from './fallskjerm.component';
import { TableModule } from 'ngx-easy-table';
import { NlfSharedModule } from 'app/nlf-shared.module';
import { NlfFallskjermRoutingModule } from './fallskjerm-routing.module';
import { NlfFallskjermTandemComponent } from './fallskjerm-tandem/fallskjerm-tandem.component';
//import { NgxCsvParserModule } from 'ngx-csv-parser';
import { NlfFallskjermObsregQueryComponent } from './fallskjerm-obsreg-query/fallskjerm-obsreg-query.component';
import { NlfFallskjermObsregComponent } from './fallskjerm-obsreg/fallskjerm-obsreg.component';
import { NlfFallskjermObsregUserComponent } from './fallskjerm-obsreg/fallskjerm-obsreg-user/fallskjerm-obsreg-user.component';
import { FallskjermObsregMembersOtherComponent } from './fallskjerm-obsreg/fallskjerm-obsreg-members-other/fallskjerm-obsreg-members-other.component';
import { FallskjermObsregMemberReportsComponent } from './fallskjerm-obsreg/fallskjerm-obsreg-member-reports/fallskjerm-obsreg-member-reports.component';
import { FallskjermObsregMemberReporterComponent } from './fallskjerm-obsreg/fallskjerm-obsreg-member-reporter/fallskjerm-obsreg-member-reporter.component';

@NgModule({
  declarations: [
    NlfFallskjermComponent,
    NlfFallskjermTandemComponent,
    NlfFallskjermObsregQueryComponent,
    NlfFallskjermObsregComponent,
    NlfFallskjermObsregUserComponent,
    FallskjermObsregMembersOtherComponent,
    FallskjermObsregMemberReportsComponent,
    FallskjermObsregMemberReporterComponent
  ],
  imports: [
    CommonModule,
    NlfFallskjermRoutingModule,
    NlfSharedModule,
    TableModule,
    //NgxCsvParserModule

  ]
})
export class NlfFallskjermModule { }
