
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NlfDashboardComponent } from './dashboard.component';

import { NlfAuthGuard } from '../services/auth/auth.guard';


const nlfDashboardRoutes: Routes = [{ path: 'dashboard/:id', component: NlfDashboardComponent, canActivate: [NlfAuthGuard] },
                                    ];

@NgModule({
  imports: [RouterModule.forRoot(nlfDashboardRoutes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
  declarations: []
})

export class NlfDashboardRoutingModule { }
