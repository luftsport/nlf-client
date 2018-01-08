import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConfluenceComponent } from './app-confluence.component';
import { AuthGuard } from '../auth/auth.guard';

const appConfluenceRoutes: Routes = [{ path: '', component: AppConfluenceComponent, canActivate: [AuthGuard]}];


@NgModule({
  imports: [ RouterModule.forRoot(appConfluenceRoutes)],
  exports: [ RouterModule],
  declarations: []
})
export class AppConfluenceRoutingModule { }
