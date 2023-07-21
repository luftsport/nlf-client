import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NlfFallskjermComponent } from './fallskjerm.component';
import { NlfFallskjermTandemComponent } from './fallskjerm-tandem/fallskjerm-tandem.component';
import { NlfAuthGuard } from 'app/services/auth/auth.guard';

const nlfFallskjermRoutes: Routes = [
  { path: '', component: NlfFallskjermComponent, canActivate: [NlfAuthGuard], data: { label: 'Fallskjerm', title: 'Fallskjerm' } },
  { path: 'tandem', component: NlfFallskjermTandemComponent, canActivate: [NlfAuthGuard], data: { label: 'Fallskejerm | Tandem rapportering' , title: 'Fallskjerm - tandem rapportering' } },
  { path: '**',  redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forChild(nlfFallskjermRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class NlfFallskjermRoutingModule { }
