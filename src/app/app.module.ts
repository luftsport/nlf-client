import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpModule } from '@angular/http'; //NB ONLY FOR ng2-idle until ng5 support for HttpClient

// Third party
import { AlertModule } from 'ngx-bootstrap';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpClientModule } from '@ngx-progressbar/http-client';
import { TableModule } from 'ngx-easy-table';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting
import { NgPipesModule } from 'ngx-pipes';
// ngx-bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination'; //Dependency for ng2-table
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule } from 'ngx-icons';

// API
import { MelwinUserService } from './api/melwin-user.service';
import { MelwinClubsService } from './api/melwin-clubs.service';
import { MelwinMembershipService } from './api/melwin-membership.service';
import { MelwinLicensesService } from './api/melwin-licenses.service';
import { AclRolesService } from './api/acl-roles.service';
import { AclGroupsService } from './api/acl-groups.service';
import { UserService } from './api/user.service';
import { UserAuthService } from './api/user-auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';

// Site wide notifications
import { AlertService } from './services/alert/alert.service';
import { AlertComponent } from './services/alert/alert.component';
import { LocalStorageService } from './services/storage/local-storage.service';

// Our custom components
import { AppUserComponent } from './app-user/app-user.component';
import { AppUserTableComponent } from './app-user/user-table/user-table.component';
import { AppOrsComponent } from './app-ors/app-ors.component';
import { AppChildComponent } from './app-ors/app-child/app-child.component';
import { AppAdminComponent } from './app-admin/app-admin.component';
import { AppContentComponent } from './app-content/app-content.component';
import { AppConfluenceComponent } from './app-confluence/app-confluence.component';
import { AppClubComponent } from './app-club/app-club.component';

// Routes
import { AppRoutingModule } from './app-routing.module';

// UI components
import { NavbarComponent } from './ui/navbar/navbar.component';
import { FooterComponent } from './ui/footer/footer.component';
import { DummyComponent } from './ui/dummy/dummy.component';

// Do not need dataservice
import { DataService } from './app-ors/data.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

// Resolvers
import { ResolveComponent } from './resolve/resolve.component';
import { ResolveUserComponent } from './resolve/resolve-user/resolve-user.component';
import { ResolveClubComponent } from './resolve/resolve-club/resolve-club.component';
import { ResolveLicenseComponent } from './resolve/resolve-license/resolve-license.component';
import { ResolveMembershipComponent } from './resolve/resolve-membership/resolve-membership.component';
import { ResolveGroupComponent } from './resolve/resolve-group/resolve-group.component';
import { ResolveRoleComponent } from './resolve/resolve-role/resolve-role.component';

// APp root component
import { AppComponent } from './app.component';

// Tag
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppUserMembershipComponent } from './app-user/user-membership/user-membership.component';
import { AppUserSettingsComponent } from './app-user/user-settings/user-settings.component';
import { AppUserNotificationsComponent } from './app-user/user-notifications/user-notifications.component';
import { AppUserOrsComponent } from './app-user/user-ors/user-ors.component';
import { AppUserClubSelectorComponent } from './app-user/user-club-selector/user-club-selector.component';

import { AppUserAclComponent } from './app-user/user-acl/user-acl.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AppUserComponent,
    AppUserTableComponent,
    AppOrsComponent,
    AppChildComponent,
    DummyComponent,
    AuthComponent,
    AlertComponent,
    ResolveComponent,
    ResolveUserComponent,
    AppAdminComponent,
    AppContentComponent,
    AppConfluenceComponent,
    AppClubComponent,
    FooterComponent,
    AppUserMembershipComponent,
    AppUserSettingsComponent,
    AppUserNotificationsComponent,
    AppUserOrsComponent,
    ResolveClubComponent,
    ResolveLicenseComponent,
    AppUserClubSelectorComponent,
    ResolveMembershipComponent,
    ResolveGroupComponent,
    ResolveRoleComponent,
    AppUserAclComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule, //NB ONLY FOR ng2-idle until ng5 support for HttpClient
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    NgProgressModule.forRoot(),
    NgProgressHttpClientModule,
    NgPipesModule,
    BsDropdownModule.forRoot(),
    CollapseModule,
    PopoverModule.forRoot(),
    TabsModule.forRoot(),
    FontAwesomeModule,
    PaginationModule.forRoot(),
    TableModule,
    AppRoutingModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    TagInputModule,
    BrowserAnimationsModule
    //NgbModule.forRoot()
  ],
  providers: [UserService,
              MelwinUserService,
              MelwinClubsService,
              MelwinMembershipService,
              MelwinLicensesService,
              AclRolesService,
              AclGroupsService,
              UserAuthService,
              DataService,
              Title,
              AlertService,
              AuthService,
              LocalStorageService,
              {provide: HTTP_INTERCEPTORS,
               useClass: AuthInterceptor,
               multi: true},
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
