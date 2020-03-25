import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NlfPermaLinksComponent } from './permalinks.component';

const routes: Routes = [
  { path: '**', component: NlfPermaLinksComponent },
  { path: '', redirectTo: '/ors/fallskjerm'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NlfPermalinksRoutingModule { }

