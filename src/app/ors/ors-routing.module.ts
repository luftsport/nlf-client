import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NlfOrsChildComponent } from './ors-child/ors-child.component';
import { NlfAuthGuard } from '../services/auth/auth.guard';

const nlfOrsRoutes: Routes = [{ path: 'ors/child/:id', component: NlfOrsChildComponent, canActivate: [NlfAuthGuard]}];


@NgModule({
  imports: [ RouterModule.forRoot(nlfOrsRoutes)],
  exports: [ RouterModule],
  declarations: []
})

export class NlfOrsRoutingModule { }
