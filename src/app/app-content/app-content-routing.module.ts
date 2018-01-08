import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppContentComponent } from './app-content.component';
import { AuthGuard } from '../auth/auth.guard';

const appContentRoutes: Routes = [{ path: '', component: AppContentComponent, canActivate: [AuthGuard]}];


@NgModule({
  imports: [ RouterModule.forRoot(appContentRoutes)],
  exports: [ RouterModule],
  declarations: []
})
export class AppContentRoutingModule { }
