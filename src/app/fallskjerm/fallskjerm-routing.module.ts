import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NlfFallskjermComponent } from './fallskjerm.component';
import { NlfFallskjermTandemComponent } from './fallskjerm-tandem/fallskjerm-tandem.component';
import { NlfFallskjermObsregQueryComponent } from './fallskjerm-obsreg-query/fallskjerm-obsreg-query.component';
import { NlfFallskjermObsregComponent } from './fallskjerm-obsreg/fallskjerm-obsreg.component';
import { NlfFallskjermObsregUserComponent } from './fallskjerm-obsreg/fallskjerm-obsreg-user/fallskjerm-obsreg-user.component';
import { NlfAuthGuard } from 'app/services/auth/auth.guard';
import { NlfRoleGuard } from 'app/services/auth/role.guard';

const nlfFallskjermRoutes: Routes = [
  { path: '', component: NlfFallskjermComponent, canActivate: [NlfAuthGuard], data: { label: 'Fallskjerm', title: 'Fallskjerm' } },
  { path: 'tandem', component: NlfFallskjermTandemComponent, canActivate: [NlfAuthGuard], data: { label: 'Fallskjerm | Tandem rapportering' , title: 'Fallskjerm - tandem rapportering' } },
  { path: 'obsreg/hi', component: NlfFallskjermObsregComponent, canActivate: [NlfRoleGuard], data: { roles: [201120, 202692, 202659], label: 'Fallskjerm | Tandem rapportering' , title: 'Fallskjerm - HI' } },
  { path: 'obsreg/user/reports/:person_id', component: NlfFallskjermObsregUserComponent, canActivate: [NlfRoleGuard], data: { roles: [201120, 202692, 202659], label: 'Fallskjerm | Hopper' , title: 'Fallskjerm - søk etter person' } },  
  { path: 'obsreg/query', component: NlfFallskjermObsregQueryComponent, canActivate: [NlfRoleGuard], data: { roles: [201120, 202692, 202659], label: 'Fallskjerm | OBSREG query' , title: 'Fallskjerm - søk i obsreg' } },
  { path: '**',  redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forChild(nlfFallskjermRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class NlfFallskjermRoutingModule { }
