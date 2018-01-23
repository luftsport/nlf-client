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
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting
import { NgPipesModule } from 'angular-pipes'; // Angular pise, love them!
import { AgmCoreModule } from '@agm/core';

// CHarting
import { NgxChartsModule } from '@swimlane/ngx-charts';

// ngx-bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination'; // Dependency for ng2-table
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';



// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule, WeatherIconsModule } from 'ngx-icons';
// import { Ng2WeatherIconsModule } from 'ng2-weather-icons'; // Broken - make fa => wi!!

// API
import { ApiNlfUserService } from './api/api-nlf-user.service';
import { ApiNlfClubsService } from './api/api-nlf-clubs.service';
import { ApiNlfMembershipService } from './api/api-nlf-membership.service';
import { ApiNlfLicensesService } from './api/api-nlf-licenses.service';
import { ApiAclRolesService } from './api/api-acl-roles.service';
import { ApiAclGroupsService } from './api/api-acl-groups.service';
import { ApiUserService } from './api/api-user.service';
import { ApiUserAuthService } from './api/api-user-auth.service';
import { ApiObservationsService } from './api/api-observations.service';
import { ApiObservationsWorkflowService } from './api/api-observations-workflow.service';
import { ApiFilesService } from './api/api-files.service';
// Api Cache service
import { ApiCacheService } from './api/api-cache.service';

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

import { NlfOrsFallskjermComponent } from './ors/ors-fallskjerm/ors-fallskjerm.component';
import { NlfOrsFallskjermTodoTableComponent } from './ors/ors-fallskjerm/ors-fallskjerm-todo-table/ors-fallskjerm-todo-table.component';
import { NlfOrsFallskjermSelfTableComponent } from './ors/ors-fallskjerm/ors-fallskjerm-self-table/ors-fallskjerm-self-table.component';
import { NlfOrsFallskjermAllTableComponent } from './ors/ors-fallskjerm/ors-fallskjerm-all-table/ors-fallskjerm-all-table.component';
import { NlfOrsFallskjermMainComponent } from './ors/ors-fallskjerm/ors-fallskjerm-main/ors-fallskjerm-main.component';

// PIPES
import { NlfOrsStatePipe } from './pipes/ors-state.pipe';
import { NlfOrsTypePipe } from './pipes/ors-type.pipe';

// LATEST
import { NlfOrsFallskjermReportComponent } from './ors/ors-fallskjerm/ors-fallskjerm-report/ors-fallskjerm-report.component';
import { NlfUiPageSpinnerComponent } from './ui/page-spinner/page-spinner.component';
import { NlfOrsFallskjermReportWorkflowTimelineComponent } from './ors/ors-fallskjerm/ors-fallskjerm-report/report-workflow-timeline/report-workflow-timeline.component';
import { NlfOrsFallskjermReportSummaryComponent } from './ors/ors-fallskjerm/ors-fallskjerm-report/report-summary/report-summary.component';
import { NlfResolveObservationFlagsComponent } from './services/resolve/resolve-observation-flags/resolve-observation-flags.component';
import { NlfResolveObservationTypesComponent } from './services/resolve/resolve-observation-types/resolve-observation-types.component';
import { NlfOrsFallskjermReportAskComponent } from './ors/ors-fallskjerm/ors-fallskjerm-report/report-ask/report-ask.component';
import { NlfOrsReportComponentsTimelineComponent } from './ors/ors-fallskjerm/ors-fallskjerm-report/report-components-timeline/report-components-timeline.component';
import { NlfOrsFallskjermReportAskTextComponent } from './ors/ors-fallskjerm/ors-fallskjerm-report/report-ask-text/report-ask-text.component';

import { NlfOrsFallskjermReportInvolvedComponent } from './ors/ors-fallskjerm/ors-fallskjerm-report/report-involved/report-involved.component';
import { NlfOrsFallskjermReportOrganizationComponent } from './ors/ors-fallskjerm/ors-fallskjerm-report/report-organization/report-organization.component';
import { NlfOrsFallskjermReportActionsComponent } from './ors/ors-fallskjerm/ors-fallskjerm-report/report-actions/report-actions.component';
import { NlfOrsFallskjermReportRelatedComponent } from './ors/ors-fallskjerm/ors-fallskjerm-report/report-related/report-related.component';
import { NlfOrsFallskjermReportWeatherComponent } from './ors/ors-fallskjerm/ors-fallskjerm-report/report-weather/report-weather.component';
import { NlfResolveObservationComponent } from './services/resolve/resolve-observation/resolve-observation.component';
import { NlfUserProfileComponent } from './user/user-profile/user-profile.component';
import { NlfOrsFallskjermReportFilesComponent } from './ors/ors-fallskjerm/ors-fallskjerm-report/report-files/report-files.component';
import { NlfOrsTagsPipe } from './pipes/ors-tags.pipe';
import { NlfOrsComponentAttributesPipe } from './pipes/ors-component-attributes.pipe';
import { NlfResolveObservationStateComponent } from './services/resolve/resolve-observation-state/resolve-observation-state.component';
import { NlfResolveObservationComponentAttributesComponent } from './services/resolve/resolve-observation-component-attributes/resolve-observation-component-attributes.component';
import { NlfResolveObservationTagsComponent } from './services/resolve/resolve-observation-tags/resolve-observation-tags.component';
import { NlfOrsRatingPipe } from './pipes/ors-rating.pipe';
import { NlfOrsRatingCalcPipe } from './pipes/ors-rating-calc.pipe';
import { NlfDynamicColorPipe } from './pipes/dynamic-color.pipe';
import { NlfOrsFallskjermLastComponent } from './ors/ors-fallskjerm/ors-fallskjerm-last/ors-fallskjerm-last.component';

// DIFF
import { DiffMatchPatchModule } from 'ng-diff-match-patch';
import { NlfOrsReportFilesThumbnailsComponent } from './ors/ors-fallskjerm/ors-fallskjerm-report/report-files-thumbnails/report-files-thumbnails.component';
import { NlfOrsCreateComponent } from './ors/ors-fallskjerm/ors-create/ors-create.component'; // https://github.com/elliotforbes/ng-diff-match-patch/issues/24
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

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
    NlfOrsFallskjermComponent,
    NlfOrsFallskjermTodoTableComponent,
    NlfOrsFallskjermSelfTableComponent,
    NlfOrsFallskjermAllTableComponent,
    NlfOrsFallskjermMainComponent,
    NlfOrsStatePipe,
    NlfOrsTypePipe,
    NlfOrsFallskjermReportComponent,
    NlfUiPageSpinnerComponent,
    NlfOrsFallskjermReportWorkflowTimelineComponent,
    NlfOrsFallskjermReportSummaryComponent,
    NlfResolveObservationFlagsComponent,
    NlfResolveObservationTypesComponent,
    NlfOrsFallskjermReportAskComponent,
    NlfOrsReportComponentsTimelineComponent,
    NlfOrsFallskjermReportAskTextComponent,
    NlfOrsFallskjermReportInvolvedComponent,
    NlfOrsFallskjermReportOrganizationComponent,
    NlfOrsFallskjermReportActionsComponent,
    NlfOrsFallskjermReportRelatedComponent,
    NlfOrsFallskjermReportWeatherComponent,
    NlfResolveObservationComponent,
    NlfUserProfileComponent,
    NlfOrsFallskjermReportFilesComponent,
    NlfOrsTagsPipe,
    NlfOrsComponentAttributesPipe,
    NlfResolveObservationStateComponent,
    NlfResolveObservationComponentAttributesComponent,
    NlfResolveObservationTagsComponent,
    NlfOrsRatingPipe,
    NlfOrsRatingCalcPipe,
    NlfDynamicColorPipe,
    NlfOrsFallskjermLastComponent,
    NlfOrsReportFilesThumbnailsComponent,
    NlfOrsCreateComponent,
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
    RatingModule.forRoot(),
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    FontAwesomeModule,
    WeatherIconsModule,
    PaginationModule.forRoot(),
    TableModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    NgxChartsModule, // Charting
    // NgxDatatableModule,
    NlfRoutingModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    TagInputModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBW1IdM-nFGiwwfP4H2sJg5YiromIuysJ8'
    }),
    DiffMatchPatchModule // DIFF
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
              ApiObservationsService,
              ApiObservationsWorkflowService,
              ApiFilesService,
              ApiCacheService,
              DataService, // @TODO: Remove
              Title, // TODO: rename NlfUiTitleService
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
