import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NlfContentComponent } from './content.component';
import { NlfContentEditComponent } from './content-edit/content-edit.component';
import { NlfContentViewComponent } from './content-view/content-view.component';
import { NlfContentSpaceComponent } from './content-space/content-space.component';
import { NlfContentSpacesComponent } from './content-spaces/content-spaces.component';

import { NlfAuthGuard } from 'app/services/auth/auth.guard';

const nlfContentRoutes: Routes = [
  { path: 'content', component: NlfContentSpacesComponent, canActivate: [NlfAuthGuard], data: { bc: 'Content', title: 'Content'} },
  { path: 'content/create', component: NlfContentEditComponent, canActivate: [NlfAuthGuard], data: { bc: 'Create', title: 'Content - Create' } },
  { path: 'content/create/:parent', component: NlfContentEditComponent, canActivate: [NlfAuthGuard], data: { bc: 'Create from parent' , title: 'Content - Create from parent'} },
  { path: 'content/edit/:id', component: NlfContentEditComponent, canActivate: [NlfAuthGuard], data: { bc: 'Edit' , title: 'Content - Edit'} },
  { path: 'content/space', component: NlfContentSpacesComponent, canActivate: [NlfAuthGuard], data: { bc: 'Spaces' , title: 'Content - Spaces' } },
  { path: 'content/space/:space_key', component: NlfContentSpaceComponent, canActivate: [NlfAuthGuard], data: { bc: 'Space' , title: 'Content - Space' } },
  { path: 'content/space/:space_key/:slug', component: NlfContentViewComponent, canActivate: [NlfAuthGuard], data: { bc: 'View' , title: 'Content - View'} },
  { path: 'content/view/:space_key/:slug', component: NlfContentViewComponent, canActivate: [NlfAuthGuard], data: { bc: 'View' , title: 'Content - View'} },
  { path: 'content/**',  redirectTo: 'content'}

];


@NgModule({
  imports: [RouterModule.forChild(nlfContentRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class NlfContentRoutingModule { }
