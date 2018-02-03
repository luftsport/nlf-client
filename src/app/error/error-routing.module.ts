import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NlfErrorComponent } from './error.component';

const nlfErrorRoutes: Routes = [{ path: 'error/not-found', component: NlfErrorComponent, data: {error: 'Siden ikke funnet', code: 404}},
                                { path: 'error/something-bad', component: NlfErrorComponent, data: {error: 'Siden ikke funnet', code: 403}},
                                { path: 'error/502', component: NlfErrorComponent, data: {error: 'Ser ut til at ting ikke funker gitt', code: 502}}
                                ];

@NgModule({
  imports: [ RouterModule.forRoot(nlfErrorRoutes)],
  exports: [ RouterModule],
  declarations: []
})

export class NlfErrorRoutingModule { }
