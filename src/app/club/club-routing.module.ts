import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NlfClubComponent } from './club.component';
import { NlfAuthGuard } from 'app/services/auth/auth.guard';

const nlfClubRoutes: Routes = [{ path: 'club', component: NlfClubComponent, canActivate: [NlfAuthGuard]}];


@NgModule({
  imports: [ RouterModule.forRoot(nlfClubRoutes, { relativeLinkResolution: 'legacy' })],
  exports: [ RouterModule],
  declarations: []
})
export class NlfClubRoutingModule { }
