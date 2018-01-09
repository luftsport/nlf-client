import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NlfContentComponent } from './content.component';
import { NlfAuthGuard } from '../services/auth/auth.guard';

const nlfContentRoutes: Routes = [{ path: '', component: NlfContentComponent, canActivate: [NlfAuthGuard]}];


@NgModule({
  imports: [ RouterModule.forRoot(nlfContentRoutes)],
  exports: [ RouterModule],
  declarations: []
})
export class NlfContentRoutingModule { }
