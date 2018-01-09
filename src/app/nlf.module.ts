import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpModule } from '@angular/http'; // NB ONLY FOR ng2-idle until ng5 support for HttpClient

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
import { PaginationModule } from 'ngx-bootstrap/pagination'; // Dependency for ng2-table
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule } from 'ngx-icons';

// API
import { ApiNlfUserService } from './api/api-nlf-user.service';
import { ApiNlfClubsService } from './api/api-nlf-clubs.service';
import { ApiNlfMembershipService } from './api/api-nlf-membership.service';
import { ApiNlfLicensesService } from './api/api-nlf-licenses.service';
import { ApiAclRolesService } from './api/api-acl-roles.service';
import { ApiAclGroupsService } from './api/api-acl-groups.service';
import { ApiUserService } from './api/api-user.service';
import { ApiUserAuthService } from './api/api-user-auth.service';

// Authentication interceptor
import { NlfAuthInterceptor } from './services/auth/auth.interceptor';

// Site wide notifications
import { NlfAlertService } from './services/alert/alert.service';
import { NlfAlertComponent } from './services/alert/alert.component';
import { NlfLocalStorageService } from './services/storage/local-storage.service';

// Our custom components
import { NlfUserComponent } from './user/user.component';
import { NlfUserTableComponent } from './user/user-table/user-table.component';
import { NlfOrsComponent } from './ors/ors.component';
import { NlfOrsChildComponent } from './ors/ors-child/ors-child.component';
import { NlfAdminComponent } from './admin/admin.component';
import { NlfContentComponent } from './content/content.component';
import { NlfConfluenceComponent } from './confluence/confluence.component';
import { NlfClubComponent } from './club/club.component';

// Routes
import { NlfRoutingModule } from './nlf-routing.module';

// UI components
import { NlfUiNavbarComponent } from './ui/navbar/navbar.component';
import { NlfUiFooterComponent } from './ui/footer/footer.component';
import { NlfUiDummyComponent } from './ui/dummy/dummy.component';

// Do not need dataservice
import { DataService } from './ors/data.service';

// Auth
import { NlfAuthComponent } from './services/auth/auth.component';
import { NlfAuthGuard } from './services/auth/auth.guard';
import { NlfAuthService } from './services/auth/auth.service';

// Resolvers
import { NlfResolveComponent } from './services/resolve/resolve.component';
import { NlfResolveUserComponent } from './services/resolve/resolve-user/resolve-user.component';
import { NlfResolveClubComponent } from './services/resolve/resolve-club/resolve-club.component';
import { NlfResolveLicenseComponent } from './services/resolve/resolve-license/resolve-license.component';
import { NlfResolveMembershipComponent } from './services/resolve/resolve-membership/resolve-membership.component';
import { NlfResolveGroupComponent } from './services/resolve/resolve-group/resolve-group.component';
import { NlfResolveRoleComponent } from './services/resolve/resolve-role/resolve-role.component';

// APp root component
import { NlfComponent } from './nlf.component';

// Tag
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NlfUserMembershipComponent } from './user/user-membership/user-membership.component';
import { NlfUserSettingsComponent } from './user/user-settings/user-settings.component';
import { NlfUserNotificationsComponent } from './user/user-notifications/user-notifications.component';
import { NlfUserOrsComponent } from './user/user-ors/user-ors.component';
import { NlfUserClubSelectorComponent } from './user/user-club-selector/user-club-selector.component';

import { NlfUserAclComponent } from './user/user-acl/user-acl.component';

@NgModule({
  declarations: [
    NlfComponent,
    NlfUiNavbarComponent,
    NlfUserComponent,
    NlfUserTableComponent,
    NlfOrsComponent,
    NlfOrsChildComponent,
    NlfUiDummyComponent,
    NlfAuthComponent,
    NlfAlertComponent,
    NlfResolveComponent,
    NlfResolveUserComponent,
    NlfAdminComponent,
    NlfContentComponent,
    NlfConfluenceComponent,
    NlfClubComponent,
    NlfUiFooterComponent,
    NlfUserMembershipComponent,
    NlfUserSettingsComponent,
    NlfUserNotificationsComponent,
    NlfUserOrsComponent,
    NlfResolveClubComponent,
    NlfResolveLicenseComponent,
    NlfUserClubSelectorComponent,
    NlfResolveMembershipComponent,
    NlfResolveGroupComponent,
    NlfResolveRoleComponent,
    NlfUserAclComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule, // NB ONLY FOR ng2-idle until ng5 support for HttpClient
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
    NlfRoutingModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    TagInputModule,
    BrowserAnimationsModule
    // NgbModule.forRoot()
  ],
  providers: [ApiUserService,
              ApiNlfUserService,
              ApiNlfClubsService,
              ApiNlfMembershipService,
              ApiNlfLicensesService,
              ApiAclRolesService,
              ApiAclGroupsService,
              ApiUserAuthService,
              DataService,
              Title,
              NlfAlertService,
              NlfAuthService,
              NlfLocalStorageService,
              {provide: HTTP_INTERCEPTORS,
               useClass: NlfAuthInterceptor,
               multi: true},
              ],
  bootstrap: [NlfComponent]
})
export class NlfModule { }
