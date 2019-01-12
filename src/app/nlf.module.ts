import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NlfSharedModule } from 'app/nlf-shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { HttpModule } from '@angular/http'; // NB ONLY FOR ng2-idle until ng5 support for HttpClient
import { Title } from '@angular/platform-browser';

import { NlfRoutingModule } from './nlf-routing.module';

// Third party

// import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { TableModule } from 'ngx-easy-table';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting

import { AgmCoreModule } from '@agm/core';
import { HotkeyModule } from 'angular2-hotkeys';
// File uploader
import { NgxUploaderModule } from 'ngx-uploader';

// Charting
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Tables
import { GenericTableModule } from '@angular-generic-table/core';
import { RTModule } from 'right-angled';


// Confirm dialogue using ng-bootstrap
import { ConfirmService, ConfirmState, ConfirmModalComponent } from 'app/services/confirm/confirm.service';


// import { Ng2WeatherIconsModule } from 'ng2-weather-icons'; // Broken - make fa => wi!!

// API
import { ApiNlfUserService } from 'app/api/api-nlf-user.service';
import { ApiNlfClubsService } from 'app/api/api-nlf-clubs.service';
import { ApiNlfMembershipService } from 'app/api/api-nlf-membership.service';
import { ApiNlfLicensesService } from 'app/api/api-nlf-licenses.service';
import { ApiAclRolesService } from 'app/api/api-acl-roles.service';
import { ApiAclGroupsService } from 'app/api/api-acl-groups.service';
import { ApiUserService } from 'app/api/api-user.service';
import { ApiUserAuthService } from 'app/api/api-user-auth.service';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { ApiObservationsWorkflowService } from 'app/api/api-observations-workflow.service';
import { ApiFilesService } from 'app/api/api-files.service';
import { ApiTagsService } from 'app/api/api-tags.service';
import { ApiClubsService } from 'app/api/api-clubs.service';
import { ApiHelpService } from 'app/api/api-help.service';
import { ApiContentService } from 'app/api/api-content.service';

// Api Cache service
import { ApiCacheService } from 'app/api/api-cache.service';

// API AGGREGATION
import { ApiObservationsAggService } from 'app/api/api-observations-agg.service';

// Authentication interceptor
import { NlfAuthInterceptor } from 'app/services/auth/auth.interceptor';

// Site wide notifications
import { NlfAlertService } from 'app/services/alert/alert.service';
import { NlfLocalStorageService } from 'app/services/storage/local-storage.service';

// Our custom components
import { NlfUserComponent } from 'app/user/user.component';
import { NlfUserTableComponent } from 'app/user/user-table/user-table.component';
import { NlfOrsComponent } from 'app/ors/ors.component';
import { NlfOrsChildComponent } from 'app/ors/ors-child/ors-child.component';
import { NlfConfluenceComponent } from 'app/confluence/confluence.component';
import { NlfClubComponent } from 'app/club/club.component';



// Content
import { NlfContentComponent } from 'app/content/content.component';
import { NlfContentEditComponent } from 'app/content/content-edit/content-edit.component';
import { NlfContentViewComponent } from 'app/content/content-view/content-view.component';
import { NlfContentSpaceComponent } from 'app/content/content-space/content-space.component';
import { NlfContentSummaryComponent } from 'app/content/content-summary/content-summary.component';
import { NlfContentTreeComponent } from 'app/content/content-tree/content-tree.component';
import { NlfContentLastComponent } from 'app/content/content-last/content-last.component';



// UI components
import { NlfUiNavbarComponent } from 'app/ui/navbar/navbar.component';
import { NlfUiFooterComponent } from 'app/ui/footer/footer.component';
import { NlfUiDummyComponent } from 'app/ui/dummy/dummy.component';

// Do not need dataservice
import { DataService } from 'app/ors/data.service';

// Auth
import { NlfAuthComponent } from 'app/services/auth/auth.component';
import { NlfAuthGuard } from 'app/services/auth/auth.guard';
import { NlfAuthService } from 'app/services/auth/auth.service';
import { NlfAuthSubjectService } from 'app/services/auth/auth-subject.service';



// APp root component
import { NlfComponent } from 'app/nlf.component';

// Tag
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// USER
import { NlfUserMembershipComponent } from 'app/user/user-membership/user-membership.component';
import { NlfUserSettingsComponent } from 'app/user/user-settings/user-settings.component';
import { NlfUserNotificationsComponent } from 'app/user/user-notifications/user-notifications.component';
import { NlfUserOrsComponent } from 'app/user/user-ors/user-ors.component';
import { NlfUserClubSelectorComponent } from 'app/user/user-club-selector/user-club-selector.component';

import { NlfUserAclComponent } from 'app/user/user-acl/user-acl.component';

import { NlfOrsFallskjermComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm.component';
import { NlfOrsFallskjermTodoTableComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-todo-table/ors-fallskjerm-todo-table.component';
import { NlfOrsFallskjermSelfTableComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-self-table/ors-fallskjerm-self-table.component';
import { NlfOrsFallskjermAllTableComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-all-table/ors-fallskjerm-all-table.component';
import { NlfOrsFallskjermMainComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-main/ors-fallskjerm-main.component';



// LATEST
import { NlfOrsFallskjermReportComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-report/ors-fallskjerm-report.component';
import { NlfUiPageSpinnerComponent } from 'app/ui/page-spinner/page-spinner.component';
import { NlfOrsFallskjermReportWorkflowTimelineComponent } from 'app/ors/ors-report/report-workflow-timeline/report-workflow-timeline.component';
import { NlfOrsFallskjermReportSummaryComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-report/report-summary/report-summary.component';
import { NlfResolveObservationFlagsComponent } from 'app/services/resolve/resolve-observation-flags/resolve-observation-flags.component';
import { NlfResolveObservationTypesComponent } from 'app/services/resolve/resolve-observation-types/resolve-observation-types.component';
import { NlfOrsFallskjermReportAskComponent } from 'app/ors/ors-report/report-ask/report-ask.component';
import { NlfOrsReportComponentsTimelineComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-report/report-components-timeline/report-components-timeline.component';
import { NlfOrsFallskjermReportAskTextComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-report/report-ask-text/report-ask-text.component';

import { NlfOrsFallskjermReportInvolvedComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-report/report-involved/report-involved.component';
import { NlfOrsFallskjermReportOrganizationComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-report/report-organization/report-organization.component';
import { NlfOrsFallskjermReportActionsComponent } from 'app/ors/ors-report/report-actions/report-actions.component';
import { NlfOrsFallskjermReportRelatedComponent } from 'app/ors/ors-report/report-related/report-related.component';
import { NlfOrsFallskjermReportWeatherComponent } from 'app/ors/ors-report/report-weather/report-weather.component';
import { NlfResolveObservationComponent } from 'app/services/resolve/resolve-observation/resolve-observation.component';
import { NlfUserProfileComponent } from 'app/user/user-profile/user-profile.component';
import { NlfOrsFallskjermReportFilesComponent } from 'app/ors/ors-report/report-files/report-files.component';
import { NlfOrsTagsPipe } from 'app/pipes/ors-tags.pipe';
import { NlfOrsComponentAttributesPipe } from 'app/pipes/ors-component-attributes.pipe';
import { NlfResolveObservationStateComponent } from 'app/services/resolve/resolve-observation-state/resolve-observation-state.component';
import { NlfResolveObservationComponentAttributesComponent } from 'app/services/resolve/resolve-observation-component-attributes/resolve-observation-component-attributes.component';
import { NlfResolveObservationTagsComponent } from 'app/services/resolve/resolve-observation-tags/resolve-observation-tags.component';
import { NlfOrsRatingPipe } from 'app/pipes/ors-rating.pipe';
import { NlfOrsRatingCalcPipe } from 'app/pipes/ors-rating-calc.pipe';
import { NlfDynamicColorPipe } from 'app/pipes/dynamic-color.pipe';
import { NlfOrsFallskjermLastComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-last/ors-fallskjerm-last.component';

// DIFF
import { DiffMatchPatchModule } from 'ng-diff-match-patch';
import { NlfOrsReportFilesThumbnailsComponent } from 'app/ors/ors-report/report-files-thumbnails/report-files-thumbnails.component';
import { NlfOrsCreateComponent } from 'app/ors/ors-fallskjerm/ors-create/ors-create.component'; // https://github.com/elliotforbes/ng-diff-match-patch/issues/24
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

// ORS EDITOR
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { NlfOrsEditorInvolvedService } from 'app/ors/ors-editor/ors-editor-involved.service';
import { NlfOrsEditorComponent } from 'app/ors/ors-editor/ors-editor.component';
import { NlfOrsEditorTitleComponent } from 'app/ors/ors-editor/ors-editor-title/ors-editor-title.component';
import { NlfOrsEditorTypeComponent } from 'app/ors/ors-editor/ors-editor-type/ors-editor-type.component';
import { NlfOrsEditorWhenComponent } from 'app/ors/ors-editor/ors-editor-when/ors-editor-when.component';
import { NlfOrsEditorRatingComponent } from 'app/ors/ors-editor/ors-editor-rating/ors-editor-rating.component';
import { NlfResolveObservationRatingComponent } from 'app/services/resolve/resolve-observation-rating/resolve-observation-rating.component';
import { NlfOrsEditorPeopleComponent } from 'app/ors/ors-editor/ors-editor-people/ors-editor-people.component';
import { NlfOrsEditorActionsComponent } from 'app/ors/ors-editor/ors-editor-actions/ors-editor-actions.component';
import { NlfOrsEditorAskComponent } from 'app/ors/ors-editor/ors-editor-ask/ors-editor-ask.component';
import { NlfOrsEditorAskTextComponent } from 'app/ors/ors-editor/ors-editor-ask-text/ors-editor-ask-text.component';
import { NlfOrsEditorFlagsComponent } from 'app/ors/ors-editor/ors-editor-flags/ors-editor-flags.component';
import { NlfOrsEditorFilesComponent } from 'app/ors/ors-editor/ors-editor-files/ors-editor-files.component';
import { NlfOrsEditorLocationComponent } from 'app/ors/ors-editor/ors-editor-location/ors-editor-location.component';
import { NlfOrsEditorWorkflowComponent } from 'app/ors/ors-editor/ors-editor-workflow/ors-editor-workflow.component';
import { NlfOrsEditorComponentsComponent } from 'app/ors/ors-editor/ors-editor-components/ors-editor-components.component';


// Services
import { LungoIntegrationService } from 'app/api/lungo-integration.service';
import { LungoPersonsService } from 'app/api/lungo-persons.service';
import { LungoOrganizationsService } from 'app/api/lungo-organizations.service';
import { LungoLicensesService } from 'app/api/lungo-licenses.service';
import { LungoFunctionsService } from 'app/api/lungo-functions.service';
import { LungoActivitiesService } from 'app/api/lungo-activities.service';

// CONFIG
import { NlfConfigModule } from 'app/nlf-config.module';
// import { MentionModule } from 'angular-mentions/mention'; // @TODO: Remove
// https://github.com/KostyaTretyak/ng-contenteditable instead?
import { ContenteditableDirective } from 'app/services/contenteditable/contenteditable.directive';


// Confirm directive
import { ConfirmTemplateDirective } from 'app/services/confirm/confirm.service';

// Do not work as of yet!!!
import { NlfErrorComponent } from 'app/error/error.component';

// videogular
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
// import {SingleMediaPlayer} from 'app/single-media-player';

// GEO
import { GeoLocationService } from 'app/services/geo/geo-location.service';
// Dashboard
import { NgDashboardModule } from 'ngx-dashboard';
// Dashboard widgets
import { NlfDashboardComponent } from 'app/dashboard/dashboard.component';
import { WidgetOrsPieComponent } from 'app/dashboard/widget-ors-pie/widget-ors-pie.component';
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

    NlfUserClubSelectorComponent,

    NlfUserAclComponent,
    NlfOrsFallskjermComponent,
    NlfOrsFallskjermTodoTableComponent,
    NlfOrsFallskjermSelfTableComponent,
    NlfOrsFallskjermAllTableComponent,
    NlfOrsFallskjermMainComponent,
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
    HttpClientModule,
    DragDropModule,
    NlfSharedModule,
    NlfConfigModule, // Config module
    NlfRoutingModule,
    BrowserModule,

    GenericTableModule,
    TableModule, // ngx-easy-table
    RTModule, // right-angled declarative tables
    
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxChartsModule, // Charting
    // NgxDatatableModule,
    
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    TagInputModule, // ngx-chips
    // MentionModule, // angular-mentions REMOVE
    BrowserAnimationsModule,
    NgxUploaderModule,
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
              // LUNGO
              LungoIntegrationService,
              LungoPersonsService,
              LungoOrganizationsService,
              LungoLicensesService,
              LungoFunctionsService,
              LungoActivitiesService,
              // Common Services
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
