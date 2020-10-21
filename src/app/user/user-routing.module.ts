import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NlfUserComponent } from 'app/user/user.component';
import { NlfAuthGuard } from 'app/services/auth/auth.guard';
import { NlfUserProfileComponent } from 'app/user/user-profile/user-profile.component';

const nlfUserRoutes: Routes = [
  { path: 'user/profile', component: NlfUserProfileComponent, canActivate: [NlfAuthGuard], data: { title: 'Me - profile' } },
  { path: 'user/:person_id', component: NlfUserComponent, canActivate: [NlfAuthGuard], data: { title: 'User - Profile' } }
];


@NgModule({
  imports: [RouterModule.forRoot(nlfUserRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class NlfUserRoutingModule { }
