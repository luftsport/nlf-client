import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NlfAdminComponent } from './admin.component';
import { NlfAdminHelpComponent } from './help/help.component';
import { NlfAdminHelpEditComponent } from './help/help-edit/help-edit.component';

import { NlfAdminFilesComponent } from 'app/admin/files/files.component';
import {  NlfAdminFilesOrphanComponent } from 'app/admin/files/files-orphan/files-orphan.component';
import { NlfAdminFilesDuplicatesComponent } from 'app/admin/files/files-duplicates/files-duplicates.component';

import { NlfAuthGuard } from 'app/services/auth/auth.guard';

const nlfAdminRoutes: Routes = [
  { path: '', component: NlfAdminComponent, canActivate: [NlfAuthGuard], data: { label: 'Admin' } },
  { path: 'help', component: NlfAdminHelpComponent, canActivate: [NlfAuthGuard], data: { label: 'Help' } },
  { path: 'help/create', component: NlfAdminHelpEditComponent, canActivate: [NlfAuthGuard], data: { label: 'Create' } },
  { path: 'help/edit/:key', component: NlfAdminHelpEditComponent, canActivate: [NlfAuthGuard], data: { label: 'Edit' } },
  { path: 'files', component: NlfAdminFilesComponent, canActivate: [NlfAuthGuard], data: { label: 'Files' } },
  { path: 'files/orphan', component: NlfAdminFilesOrphanComponent, canActivate: [NlfAuthGuard], data: { label: 'Orphan Files' } },
  { path: 'files/duplicates', component: NlfAdminFilesDuplicatesComponent, canActivate: [NlfAuthGuard], data: { label: 'Orphan Files' } },

];

@NgModule({
  imports: [RouterModule.forChild(nlfAdminRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class NlfAdminRoutingModule { }
