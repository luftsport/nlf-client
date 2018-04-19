import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NlfContentComponent } from './content.component';
import { NlfContentEditComponent } from './content-edit/content-edit.component';
import { NlfContentViewComponent } from './content-view/content-view.component';
import { NlfContentSpaceComponent } from './content-space/content-space.component';

import { NlfAuthGuard } from '../services/auth/auth.guard';

const nlfContentRoutes: Routes = [{ path: 'content', component: NlfContentComponent, canActivate: [NlfAuthGuard]},
                                  { path: 'content/create/:parent', component: NlfContentEditComponent, canActivate: [NlfAuthGuard]},
                                  { path: 'content/create', component: NlfContentEditComponent, canActivate: [NlfAuthGuard]},
                                  { path: 'content/edit/:id', component: NlfContentEditComponent, canActivate: [NlfAuthGuard]},
                                  { path: 'content/view/:space_key/:slug', component: NlfContentViewComponent, canActivate: [NlfAuthGuard]},
                                  { path: 'content/space/:space_key', component: NlfContentSpaceComponent, canActivate: [NlfAuthGuard]}
                                ];


@NgModule({
  imports: [ RouterModule.forRoot(nlfContentRoutes)],
  exports: [ RouterModule],
  declarations: []
})
export class NlfContentRoutingModule { }
