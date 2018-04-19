import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpModule } from '@angular/http'; // NB ONLY FOR ng2-idle until ng5 support for HttpClient

// Third party
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
// import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { TableModule } from 'ngx-easy-table';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting
import { NgPipesModule } from 'angular-pipes'; // Angular pise, love them!
import { AgmCoreModule } from '@agm/core';
import { HotkeyModule } from 'angular2-hotkeys';

// File uploader
import { NgUploaderModule } from 'ngx-uploader';

// CHarting
import { NgxChartsModule } from '@swimlane/ngx-charts';

// ng-bootstrap
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// Confirm dialogue using ng-bootstrap
import { ConfirmService, ConfirmState, ConfirmModalComponent } from './services/confirm/confirm.service';

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
import { ApiTagsService } from './api/api-tags.service';
import { ApiClubsService } from './api/api-clubs.service';
import { ApiHelpService } from './api/api-help.service';
import { ApiContentService } from './api/api-content.service';

// Api Cache service
import { ApiCacheService } from './api/api-cache.service';

// API AGGREGATION
import { ApiObservationsAggService } from './api/api-observations-agg.service';

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
import { NlfConfluenceComponent } from './confluence/confluence.component';
import { NlfClubComponent } from './club/club.component';

// Admin
import { NlfAdminComponent } from './admin/admin.component';
import { NlfAdminHelpComponent } from './admin/help/help.component';
import { NlfAdminHelpEditComponent } from './admin/help/help-edit/help-edit.component';

// Content
import { NlfContentComponent } from './content/content.component';
import { NlfContentEditComponent } from './content/content-edit/content-edit.component';
import { NlfContentViewComponent } from './content/content-view/content-view.component';
import { NlfContentSpaceComponent } from './content/content-space/content-space.component';
import { NlfContentSummaryComponent } from './content/content-summary/content-summary.component';
import { NlfContentTreeComponent } from './content/content-tree/content-tree.component';
import { NlfContentLastComponent } from './content/content-last/content-last.component';



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
import { NlfAuthSubjectService } from './services/auth/auth-subject.service';

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
import { NlfOrsPeoplePipe } from './pipes/ors-people.pipe';
import { SafePipe } from './pipes/safe.pipe';

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

// ORS EDITOR
import { NlfOrsEditorService } from './ors/ors-editor/ors-editor.service';
import { NlfOrsEditorInvolvedService } from './ors/ors-editor/ors-editor-involved.service';
import { NlfOrsEditorComponent } from './ors/ors-editor/ors-editor.component';
import { NlfOrsEditorTitleComponent } from './ors/ors-editor/ors-editor-title/ors-editor-title.component';
import { NlfOrsEditorTypeComponent } from './ors/ors-editor/ors-editor-type/ors-editor-type.component';
import { NlfOrsEditorWhenComponent } from './ors/ors-editor/ors-editor-when/ors-editor-when.component';
import { NlfOrsEditorRatingComponent } from './ors/ors-editor/ors-editor-rating/ors-editor-rating.component';
import { NlfResolveObservationRatingComponent } from './services/resolve/resolve-observation-rating/resolve-observation-rating.component';
import { NlfOrsEditorPeopleComponent } from './ors/ors-editor/ors-editor-people/ors-editor-people.component';
import { NlfOrsEditorActionsComponent } from './ors/ors-editor/ors-editor-actions/ors-editor-actions.component';
import { NlfOrsEditorAskComponent } from './ors/ors-editor/ors-editor-ask/ors-editor-ask.component';
import { NlfOrsEditorAskTextComponent } from './ors/ors-editor/ors-editor-ask-text/ors-editor-ask-text.component';
import { NlfOrsEditorFlagsComponent } from './ors/ors-editor/ors-editor-flags/ors-editor-flags.component';
import { NlfOrsEditorFilesComponent } from './ors/ors-editor/ors-editor-files/ors-editor-files.component';
import { NlfOrsEditorLocationComponent } from './ors/ors-editor/ors-editor-location/ors-editor-location.component';
import { NlfOrsEditorWorkflowComponent } from './ors/ors-editor/ors-editor-workflow/ors-editor-workflow.component';
import { NlfOrsEditorComponentsComponent } from './ors/ors-editor/ors-editor-components/ors-editor-components.component';

// CONFIG
import { NlfConfigModule } from './nlf-config.module';
// import { MentionModule } from 'angular-mentions/mention'; // @TODO: Remove
import { ContenteditableDirective } from './services/contenteditable/contenteditable.directive';

// Help
import { NlfHelpComponent } from './services/help/help.component';

// Confirm directive
import { ConfirmTemplateDirective } from './services/confirm/confirm.service';

// Do not work as of yet!!!
import { NlfErrorComponent } from './error/error.component';

// videogular
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
// import {SingleMediaPlayer} from './single-media-player';

// GEO
import { GeoLocationService } from './services/geo/geo-location.service';
// Dashboard
import { NgDashboardModule } from 'ngx-dashboard';
// Dashboard widgets
import { NlfDashboardComponent } from './dashboard/dashboard.component';
import { WidgetOrsPieComponent } from './dashboard/widget-ors-pie/widget-ors-pie.component';
// Gridster instead!
import { GridsterModule } from 'angular-gridster2';
// Jodit editor
import { JoditAngularModule } from 'jodit-angular';

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
    NlfAdminHelpComponent,
    NlfAdminHelpEditComponent,
    NlfContentComponent,
    NlfContentEditComponent,
    NlfContentViewComponent,
    NlfContentSpaceComponent,
    NlfContentSummaryComponent,
    NlfContentTreeComponent,
    NlfContentLastComponent,
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
    NlfResolveObservationRatingComponent,
    NlfOrsRatingPipe,
    NlfOrsRatingCalcPipe,
    NlfDynamicColorPipe,
    NlfOrsPeoplePipe,
    SafePipe,
    ConfirmTemplateDirective,
    NlfOrsFallskjermLastComponent,
    NlfOrsReportFilesThumbnailsComponent,
    NlfOrsCreateComponent,
    NlfOrsEditorComponent,
    NlfOrsEditorTitleComponent,
    NlfOrsEditorTypeComponent,
    NlfOrsEditorWhenComponent,
    NlfOrsEditorRatingComponent,
    NlfOrsEditorPeopleComponent,
    NlfOrsEditorActionsComponent,
    NlfOrsEditorAskComponent,
    NlfOrsEditorAskTextComponent,
    NlfOrsEditorFlagsComponent,
    NlfOrsEditorFilesComponent,
    NlfOrsEditorLocationComponent,
    NlfOrsEditorWorkflowComponent,
    NlfOrsEditorComponentsComponent,
    NlfErrorComponent,
    NlfHelpComponent,
    ContenteditableDirective,
    NlfDashboardComponent,
    WidgetOrsPieComponent,
    ConfirmModalComponent
  ],
  entryComponents: [
    WidgetOrsPieComponent,
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule, // NB ONLY FOR ng2-idle until ng5 support for HttpClient
    FormsModule,
    ReactiveFormsModule,
    NlfConfigModule, // Config module
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    // NgProgressRouterModule,
    NgPipesModule,
    FontAwesomeModule, // ngx-icons
    WeatherIconsModule, // ngx-icons
    TableModule, // ngx-easy-table
    NgbModule.forRoot(), // ng-bootstrap
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxChartsModule, // Charting
    // NgxDatatableModule,
    NlfRoutingModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    TagInputModule, // ngx-chips
    // MentionModule, // angular-mentions REMOVE
    BrowserAnimationsModule,
    NgUploaderModule,
    HotkeyModule.forRoot(),
    AgmCoreModule.forRoot({ // Google maps
      apiKey: 'AIzaSyBW1IdM-nFGiwwfP4H2sJg5YiromIuysJ8'
    }),
    DiffMatchPatchModule, // DIFF
    // NgbModule.forRoot() // ngx-bootstrap (not good rather shaitolainen!)
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    NgDashboardModule, // Dashboards ngx-dashboard
    GridsterModule, // Gridster
    JoditAngularModule, // Jodit editor
  ],
  providers: [ApiUserService,
              ApiClubsService,
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
              ApiTagsService,
              ApiCacheService,
              ApiObservationsAggService,
              ApiHelpService,
              ApiContentService,
              DataService, // @TODO: Remove
              Title, // TODO: rename NlfUiTitleService
              NlfAlertService,
              NlfAuthService,
              NlfAuthSubjectService,
              NlfLocalStorageService,
              GeoLocationService,
              NlfOrsEditorService,
              NlfOrsEditorInvolvedService,
              ConfirmService,
              ConfirmState,
              {provide: HTTP_INTERCEPTORS,
               useClass: NlfAuthInterceptor,
               multi: true},
              ],
  bootstrap: [NlfComponent]
})
export class NlfModule { }
