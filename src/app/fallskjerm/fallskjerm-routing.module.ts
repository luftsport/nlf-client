import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NlfFallskjermComponent } from './fallskjerm.component';
import { NlfFallskjermTandemComponent } from './fallskjerm-tandem/fallskjerm-tandem.component';
import { NlfFallskjermObsregQueryComponent } from './fallskjerm-obsreg-query/fallskjerm-obsreg-query.component';
import { NlfFallskjermObsregComponent } from './fallskjerm-obsreg/fallskjerm-obsreg.component';
import { NlfFallskjermObsregUserComponent } from './fallskjerm-obsreg/fallskjerm-obsreg-user/fallskjerm-obsreg-user.component';
import { NlfAuthGuard } from 'app/services/auth/auth.guard';

const nlfFallskjermRoutes: Routes = [
  { path: '', component: NlfFallskjermComponent, canActivate: [NlfAuthGuard], data: { label: 'Fallskjerm', title: 'Fallskjerm' } },
  { path: 'tandem', component: NlfFallskjermTandemComponent, canActivate: [NlfAuthGuard], data: { label: 'Fallskjerm | Tandem rapportering' , title: 'Fallskjerm - tandem rapportering' } },
  { path: 'obsreg/hi', component: NlfFallskjermObsregComponent, canActivate: [NlfAuthGuard], data: { label: 'Fallskjerm | Tandem rapportering' , title: 'Fallskjerm - søk etter person' } },
  { path: 'obsreg/user/reports/:person_id', component: NlfFallskjermObsregUserComponent, canActivate: [NlfAuthGuard], data: { label: 'Fallskjerm | Tandem rapportering' , title: 'Fallskjerm - søk etter person' } },  
  { path: 'obsreg/query', component: NlfFallskjermObsregQueryComponent, canActivate: [NlfAuthGuard], data: { label: 'Fallskjerm | Tandem rapportering' , title: 'Fallskjerm - søk etter person' } },
  { path: '**',  redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forChild(nlfFallskjermRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class NlfFallskjermRoutingModule { }
