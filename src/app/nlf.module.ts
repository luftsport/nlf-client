import { NgModule } from '@angular/core';

/** TRACKJS
import { TrackJS } from 'trackjs';
if (location.host.indexOf('127.0.0.1') !== 0) {
  TrackJS.install({
    token: '1c185505da32495a84be23f71c2f364a',
    application: 'nlf-dev'
  });
}

//// Track JS //
import { ErrorHandler } from '@angular/core';
import { TrackJsErrorHandler } from 'app/track-js.handler';
**/

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Title } from '@angular/platform-browser';

// APP CUSTOM
import { NlfSharedModule } from 'app/nlf-shared.module';
// import { NlfAircraftsSharedModule } from 'app/aircrafts/aircrafts-shared.module';


import { NlfRoutingModule } from './nlf-routing.module';
// CONFIG
import { NlfConfigModule } from 'app/nlf-config.module';
// LOCAL STORAGE


// THIRD PARTY
// import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { TableModule } from 'ngx-easy-table';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { AgmCoreModule } from '@agm/core';
import { HotkeyModule } from 'angular2-hotkeys';
// File uploader
import { NgxUploaderModule } from 'ngx-uploader';
// Charting
import { NgxChartsModule } from '@swimlane/ngx-charts';
// Gridster instead!
import { GridsterModule } from 'angular-gridster2';
// Jodit editor
import { JoditAngularModule } from 'jodit-angular';

// Upload to canvas
import { ImageCropperModule } from 'ngx-image-cropper';

// DIFF
import { DiffMatchPatchModule } from 'ng-diff-match-patch';

// TIME
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting



// FOR REMOVAL ////////////////////////////////////
// Tables
// import { GenericTableModule } from '@angular-generic-table/core';
// import { RTModule } from 'right-angled';
// import { Ng2WeatherIconsModule } from 'ng2-weather-icons'; // Broken - make fa => wi!!

// API
import { NlfConfigService } from 'app/nlf-config.service';
import { ApiConfigService } from 'app/api/api-config.service';
import { ApiHeartbeatService } from 'app/api/api-heartbeat.service';
import { ApiNlfUserService } from 'app/api/api-nlf-user.service';
import { ApiNlfClubsService } from 'app/api/api-nlf-clubs.service';
import { ApiNlfMembershipService } from 'app/api/api-nlf-membership.service';
import { ApiNlfLicensesService } from 'app/api/api-nlf-licenses.service';
import { ApiAclRolesService } from 'app/api/api-acl-roles.service';
import { ApiAclGroupsService } from 'app/api/api-acl-groups.service';
import { ApiUserService } from 'app/api/api-user.service';
import { ApiUserAuthService } from 'app/api/api-user-auth.service';

import { ApiFilesService } from 'app/api/api-files.service';
import { ApiTagsService } from 'app/api/api-tags.service';
import { ApiClubsService } from 'app/api/api-clubs.service';
import { ApiHelpService } from 'app/api/api-help.service';
import { ApiContentService } from 'app/api/api-content.service';
import { ApiAirspacesService } from 'app/api/api-airspaces.service';
import { ApiAircraftsService } from 'app/api/api-aircrafts.service';

// notifications
import { ApiNotificationsService } from 'app/api/api-notifications.service';
// resources
import { ApiGeoAdminService } from 'app/api/api-geo-admin.service';
import { ApiLocationsService } from 'app/api/api-locations.service';

// ORS API
import { ApiObservationsService } from 'app/api/api-observations.service';
import { ApiObservationsWorkflowService } from 'app/api/api-observations-workflow.service';
// ORS E5X
import {  ApiE5xService } from 'app/api/api-e5x.service';

// Api Cache service
import { ApiCacheService } from 'app/api/api-cache.service';

// API AGGREGATION
import { ApiObservationsAggService } from 'app/api/api-observations-agg.service';



// CUSTOM APPS
import { NlfConfluenceComponent } from 'app/confluence/confluence.component';
import { NlfClubComponent } from 'app/club/club.component';


// CONTENT
import { NlfContentComponent } from 'app/content/content.component';
import { NlfContentEditComponent } from 'app/content/content-edit/content-edit.component';
import { NlfContentViewComponent } from 'app/content/content-view/content-view.component';
import { NlfContentSpacesComponent } from 'app/content/content-spaces/content-spaces.component';
import { NlfContentSpaceComponent } from 'app/content/content-space/content-space.component';
import { NlfContentSummaryComponent } from 'app/content/content-summary/content-summary.component';
import { NlfContentTreeComponent } from 'app/content/content-tree/content-tree.component';
import { NlfContentLastComponent } from 'app/content/content-last/content-last.component';

// UI components
import { NlfUiNavbarComponent } from 'app/ui/navbar/navbar.component';
import { NlfUiFooterComponent } from 'app/ui/footer/footer.component';
import { NlfUiDummyComponent } from 'app/ui/dummy/dummy.component';


// APP root component
import { NlfComponent } from 'app/nlf.component';

// Tag
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ORS
import { NlfOrsComponent } from 'app/ors/ors.component';
import { NlfOrsErrorComponent } from 'app/ors/ors-error/ors-error.component';

// ORS first
import { NlfOrsEditorFirstComponent } from 'app/ors/ors-editor/ors-editor-first/ors-editor-first.component';

// ORS BRIEF
import { NlfOrsTodoTableComponent } from 'app/ors/ors-brief/ors-todo-table/ors-todo-table.component';
import { NlfOrsSelfTableComponent } from 'app/ors/ors-brief/ors-self-table/ors-self-table.component';
import { NlfOrsAllTableComponent } from 'app/ors/ors-brief/ors-all-table/ors-all-table.component';
import { NlfOrsLastComponent } from 'app/ors/ors-brief/ors-last/ors-last.component';


// ORS Resolvers
import { NlfResolveObservationFlagsComponent } from 'app/services/resolve/resolve-observation-flags/resolve-observation-flags.component';
import { NlfResolveObservationTypesComponent } from 'app/services/resolve/resolve-observation-types/resolve-observation-types.component';
import { NlfResolveObservationComponent } from 'app/services/resolve/resolve-observation/resolve-observation.component';
import { NlfResolveObservationStateComponent } from 'app/services/resolve/resolve-observation-state/resolve-observation-state.component';
import { NlfResolveObservationComponentAttributesComponent } from 'app/services/resolve/resolve-observation-component-attributes/resolve-observation-component-attributes.component';
import { NlfResolveObservationTagsComponent } from 'app/services/resolve/resolve-observation-tags/resolve-observation-tags.component';
import { NlfResolveObservationRatingComponent } from 'app/services/resolve/resolve-observation-rating/resolve-observation-rating.component';

// ORS PIPES
import { NlfOrsTagsPipe } from 'app/pipes/ors-tags.pipe';
import { NlfOrsComponentAttributesPipe } from 'app/pipes/ors-component-attributes.pipe';
import { NlfOrsRatingPipe } from 'app/pipes/ors-rating.pipe';
import { NlfOrsRatingCalcPipe } from 'app/pipes/ors-rating-calc.pipe';
import { NlfDynamicColorPipe } from 'app/pipes/dynamic-color.pipe';
import { NlfActivityPipe } from 'app/pipes/activity.pipe';


// ORS CREATE
import { NlfOrsFallskjermCreateComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-create/ors-fallskjerm-create.component'; // https://github.com/elliotforbes/ng-diff-match-patch/issues/24
import { NlfOrsMotorCreateComponent } from 'app/ors/ors-motor/ors-motor-create/ors-motor-create.component'; // https://github.com/elliotforbes/ng-diff-match-patch/issues/24
import { NlfOrsCreateModalComponent } from 'app/ors/ors-create-modal/ors-create-modal.component';


// ORS EDITOR
import { NlfOrsEditorRouteComponent } from 'app/ors/ors-editor/ors-editor-route/ors-editor-route.component';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { NlfOrsEditorInvolvedService } from 'app/ors/ors-editor/ors-editor-involved.service';
import { NlfOrsEditorTitleComponent } from 'app/ors/ors-editor/ors-editor-title/ors-editor-title.component';
import { NlfOrsEditorTypeComponent } from 'app/ors/ors-editor/ors-editor-type/ors-editor-type.component';
import { NlfOrsEditorWhenComponent } from 'app/ors/ors-editor/ors-editor-when/ors-editor-when.component';
import { NlfOrsEditorRatingComponent } from 'app/ors/ors-editor/ors-editor-rating/ors-editor-rating.component';
import { NlfOrsEditorPeopleComponent } from 'app/ors/ors-editor/ors-editor-people/ors-editor-people.component';
import { NlfOrsEditorActionsComponent } from 'app/ors/ors-editor/ors-editor-actions/ors-editor-actions.component';
import { NlfOrsEditorAskComponent } from 'app/ors/ors-editor/ors-editor-ask/ors-editor-ask.component';
import { NlfOrsEditorAskTextComponent } from 'app/ors/ors-editor/ors-editor-ask-text/ors-editor-ask-text.component';
import { NlfOrsEditorFlagsComponent } from 'app/ors/ors-editor/ors-editor-flags/ors-editor-flags.component';
import { NlfOrsEditorFilesComponent } from 'app/ors/ors-editor/ors-editor-files/ors-editor-files.component';
import { NlfOrsEditorWorkflowComponent } from 'app/ors/ors-editor/ors-editor-workflow/ors-editor-workflow.component';
import { NlfOrsEditorComponentsComponent } from 'app/ors/ors-editor/ors-editor-components/ors-editor-components.component';
import { NlfOrsEditorHelpComponent } from 'app/ors/ors-editor/ors-editor-help/ors-editor-help.component';
import { NlfOrsEditorAboutComponent } from 'app/ors/ors-editor/ors-editor-about/ors-editor-about.component';
import { NlfOrsEditorDebugComponent } from 'app/ors/ors-editor/ors-editor-debug/ors-editor-debug.component';
import { NlfOrsEditorMetComponent } from 'app/ors/ors-editor/ors-editor-met/ors-editor-met.component';
import { NlfOrsEditorWeatherComponent } from 'app/ors/ors-editor/ors-editor-weather/ors-editor-weather.component';

import { NlfOrsEditorOperationalComponent } from 'app/ors/ors-editor/ors-editor-operational/ors-editor-operational.component';
import { NlfOrsEditorCategoriesComponent } from 'app/ors/ors-editor/ors-editor-categories/ors-editor-categories.component';

import { NlfOrsActivitiesComponent } from 'app/ors/ors-activities/ors-activities.component';
import { NlfOrsActivitiesTimelineComponent } from 'app/ors/ors-activities/ors-activities-timeline/ors-activities-timeline.component';


// USERS ACL
import { NlfOrsEditorUsersComponent } from 'app/ors/ors-editor/ors-editor-users/ors-editor-users.component';



// ORS REPORT VIEW
import { NlfOrsReportWorkflowTimelineComponent } from 'app/ors/ors-report/report-workflow-timeline/report-workflow-timeline.component';
import { NlfOrsReportAskComponent } from 'app/ors/ors-report/report-ask/report-ask.component';
import { NlfOrsReportAskTextComponent } from 'app/ors/ors-report/report-ask-text/report-ask-text.component';
import { NlfOrsReportActionsComponent } from 'app/ors/ors-report/report-actions/report-actions.component';
import { NlfOrsReportRelatedComponent } from 'app/ors/ors-report/report-related/report-related.component';
import { NlfOrsReportWeatherComponent } from 'app/ors/ors-report/report-weather/report-weather.component';
import { NlfOrsReportFilesComponent } from 'app/ors/ors-report/report-files/report-files.component';
import { NlfOrsReportComponentsTimelineComponent } from 'app/ors/ors-report/report-components-timeline/report-components-timeline.component';
import { NlfOrsReportFilesThumbnailsComponent } from 'app/ors/ors-report/report-files-thumbnails/report-files-thumbnails.component';
// FALLSKJERM REPORT
import { NlfOrsFallskjermReportInvolvedComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-report/report-involved/report-involved.component';
import { NlfOrsFallskjermReportOrganizationComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-report/report-organization/report-organization.component';
import { NlfOrsFallskjermReportSummaryComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-report/report-summary/report-summary.component';
// MOTORFLY REPORT
import {  NlfOrsMotorflyReportSummaryComponent } from 'app/ors/ors-motor/ors-motor-report/report-summary/report-summary.component';
// ORS STATISTICS & DASHBOARDS
import { NlfOrsStatsHeatmapComponent } from 'app/ors/ors-stats/ors-stats-heatmap/ors-stats-heatmap.component';
import { NlfOrsStatsComponent } from 'app/ors/ors-stats/ors-stats.component';

// ORS FALLSKJERM
import { NlfOrsFallskjermEditorComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-editor/ors-fallskjerm-editor.component';
import { NlfOrsFallskjermComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm.component';
import { NlfOrsFallskjermMainComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-main/ors-fallskjerm-main.component';
import { NlfOrsFallskjermReportComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-report/ors-fallskjerm-report.component';

import { NlfOrsFallskjermEditorLocationComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-editor/ors-fallskjerm-editor-location/ors-fallskjerm-editor-location.component';
import { NlfOrsFallskjermEditorOrganizationComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-editor/ors-fallskjerm-editor-organization/ors-fallskjerm-editor-organization.component';
import { NlfOrsFallskjermEditorInvolvedComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-editor/ors-fallskjerm-editor-involved/ors-fallskjerm-editor-involved.component';
import { NlfOrsFallskjermSearchComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-search/ors-fallskjerm-search.component';
import { NlfOrsFallskjermDashboardComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-dashboard/ors-fallskjerm-dashboard.component';
import { NlfOrsFallskjermDashboardTableComponent } from 'app/ors/ors-fallskjerm/ors-fallskjerm-dashboard/ors-fallskjerm-dashboard-table/ors-fallskjerm-dashboard-table.component';


// ORS MOTOR
import { NlfOrsMotorComponent } from 'app/ors/ors-motor/ors-motor.component';
import { NlfOrsMotorEditorComponent } from 'app/ors/ors-motor/ors-motor-editor/ors-motor-editor.component';
import { NlfOrsMotorReportComponent } from 'app/ors/ors-motor/ors-motor-report/ors-motor-report.component';
import {  NlfOrsMotorSearchComponent } from 'app/ors/ors-motor/ors-motor-search/ors-motor-search.component';


// LUNGO Services
import { LungoIntegrationService } from 'app/api/lungo-integration.service';
import { LungoPersonsService } from 'app/api/lungo-persons.service';
import { LungoOrganizationsService } from 'app/api/lungo-organizations.service';
import { LungoLicensesService } from 'app/api/lungo-licenses.service';
import { LungoFunctionsService } from 'app/api/lungo-functions.service';
import { LungoActivitiesService } from 'app/api/lungo-activities.service';

// USER
import { NlfUserProfileComponent } from 'app/user/user-profile/user-profile.component';
import { NlfUserMembershipComponent } from 'app/user/user-membership/user-membership.component';
import { NlfUserSettingsComponent } from 'app/user/user-settings/user-settings.component';
import { NlfUserNotificationsComponent } from 'app/user/user-notifications/user-notifications.component';
import { NlfUserClubSelectorComponent } from 'app/user/user-club-selector/user-club-selector.component';
import { NlfUserOrsComponent } from 'app/user/user-ors/user-ors.component';
import { NlfUserComponent } from 'app/user/user.component';
import { NlfUserTableComponent } from 'app/user/user-table/user-table.component';

// AUTH
import { NlfAuthInterceptor } from 'app/services/auth/auth.interceptor';

// USER AUTH
import { NlfAuthComponent } from 'app/services/auth/auth.component';
import { NlfAuthGuard } from 'app/services/auth/auth.guard';
import { NlfAuthService } from 'app/services/auth/auth.service';
import { NlfAuthSubjectService } from 'app/services/auth/auth-subject.service';
import { NlfUserSubjectService } from 'app/user/user-subject.service';
import { NlfUserAvatarSubjectService } from 'app/user/user-avatar-subject.service';

// USER ACL
import { NlfUserAclComponent } from 'app/user/user-acl/user-acl.component';

// MET
import { NlfMetMetarComponent } from 'app/met/met-metar/met-metar.component';


// import { MentionModule } from 'angular-mentions/mention'; // @TODO: Remove
// https://github.com/KostyaTretyak/ng-contenteditable instead?

// CONTENT EDITABLE
import { ContenteditableDirective } from 'app/services/contenteditable/contenteditable.directive';

// CONFIRMATION DIALOGUE
import { ConfirmService, ConfirmState, ConfirmModalComponent, ConfirmTemplateDirective } from 'app/services/confirm/confirm.service';

// ALERT AND ERRORS
import { NlfAlertService } from 'app/services/alert/alert.service';
import { NlfErrorComponent } from 'app/error/error.component';

// videogular
// import { VgCoreModule } from 'videogular2/core';
// import { VgControlsModule } from 'videogular2/controls';
// import { VgOverlayPlayModule } from 'videogular2/overlay-play';
// import { VgBufferingModule } from 'videogular2/buffering';

// import {SingleMediaPlayer} from 'app/single-media-player';

// GEO
import { GeoLocationService } from 'app/services/geo/geo-location.service';
// Dashboard
// import { NgDashboardModule } from 'ngx-dashboard';
// Dashboard widgets
// import { NlfDashboardComponent } from 'app/dashboard/dashboard.component';
// import { WidgetOrsPieComponent } from 'app/dashboard/widget-ors-pie/widget-ors-pie.component';

//////  TEST T  E S T TEST

//import { TestComponent } from 'app/test/test.component';

import { NlfOrsEditorTagComponent } from 'app/ors/ors-editor/ors-editor-tag/ors-editor-tag.component';
import { NlfOrsEditorTagStringComponent } from 'app/ors/ors-editor/ors-editor-tag-string/ors-editor-tag-string.component';
import { NlfOrsEditorTagPersonComponent } from 'app/ors/ors-editor/ors-editor-tag-person/ors-editor-tag-person.component';
import { NlfOrsEditorTagPersonsComponent } from 'app/ors/ors-editor/ors-editor-tag-persons/ors-editor-tag-persons.component';


// Aircraft ATTRIBUTES
import { NlfOrsEditorE5XAcWildlifeComponent } from 'app/ors/ors-editor/ors-editor-e5x-attr/ors-editor-e5x-ac-wildlife/ors-editor-e5x-ac-wildlife.component';
import { NlfOrsEditorE5XAcInjuriesComponent } from 'app/ors/ors-editor/ors-editor-e5x-attr/ors-editor-e5x-ac-injuries/ors-editor-e5x-ac-injuries.component';
import { NlfOrsEditorE5XAcWeatherComponent } from 'app/ors/ors-editor/ors-editor-e5x-attr/ors-editor-e5x-ac-weather/ors-editor-e5x-ac-weather.component';
import { NlfOrsEditorE5XAcFlightComponent } from 'app/ors/ors-editor/ors-editor-e5x-attr/ors-editor-e5x-ac-flight/ors-editor-e5x-ac-flight.component';

// OCCURRENCE ATTRIBUTES
import {  NlfOrsEditorE5XOccurrenceComponent } from 'app/ors/ors-editor/ors-editor-e5x-attr/ors-editor-e5x-occurrence/ors-editor-e5x-occurrence.component'
import { NlfOrsEditorE5XClassificationComponent } from 'app/ors/ors-editor/ors-editor-e5x-attr/ors-editor-e5x-classification/ors-editor-e5x-classification.component';
import { NlfOrsEditorE5XWeatherComponent } from 'app/ors/ors-editor/ors-editor-e5x-attr/ors-editor-e5x-weather/ors-editor-e5x-weather.component';
import { NlfOrsEditorE5XInjuriesComponent } from 'app/ors/ors-editor/ors-editor-e5x-attr/ors-editor-e5x-injuries/ors-editor-e5x-injuries.component';
import { NlfOrsEditorE5XDamageComponent } from 'app/ors/ors-editor/ors-editor-e5x-attr/ors-editor-e5x-damage/ors-editor-e5x-damage.component';
import {  NlfOrsEditorE5XWhereComponent } from 'app/ors/ors-editor/ors-editor-e5x-attr/ors-editor-e5x-where/ors-editor-e5x-where.component';
// OCCURRENCE ENTITIES
import {  NlfOrsEditorE5xEntitiesComponent } from 'app/ors/ors-editor/ors-editor-e5x-entities/ors-editor-e5x-entities.component';
import { NlfOrsEditorE5XRunwayComponent } from 'app/ors/ors-editor/ors-editor-e5x-entities/ors-editor-e5x-runway/ors-editor-e5x-runway.component';
import { NlfOrsEditorE5XAerodromeComponent } from 'app/ors/ors-editor/ors-editor-e5x-entities/ors-editor-e5x-aerodrome/ors-editor-e5x-aerodrome.component';
import {  NlfOrsEditorE5XAerodromeSingleComponent } from 'app/ors/ors-editor/ors-editor-e5x-entities/ors-editor-e5x-aerodrome-single/ors-editor-e5x-aerodrome-single.component';
import {  NlfOrsEditorE5xWxphenomenaComponent } from 'app/ors/ors-editor/ors-editor-e5x-entities/ors-editor-e5x-wxphenomena/ors-editor-e5x-wxphenomena.component';
import { NlfOrsEditorE5XAtmComponent } from 'app/ors/ors-editor/ors-editor-e5x-entities/ors-editor-e5x-atm/ors-editor-e5x-atm.component';
import {  NlfOrsEditorE5xAirspaceComponent } from 'app/ors/ors-editor/ors-editor-e5x-entities/ors-editor-e5x-airspace/ors-editor-e5x-airspace.component';
import { NlfOrsEditorE5xAirspaceSingleComponent } from 'app/ors/ors-editor/ors-editor-e5x-entities/ors-editor-e5x-airspace-single/ors-editor-e5x-airspace-single.component';
import { NlfOrsEditorE5XAircraftComponent } from 'app/ors/ors-editor/ors-editor-e5x-entities/ors-editor-e5x-aircraft/ors-editor-e5x-aircraft.component';
import {  NlfOrsEditorE5XPartinformationComponent } from 'app/ors/ors-editor/ors-editor-e5x-entities/ors-editor-e5x-aircraft/ors-editor-e5x-aircraft-partinformation/ors-editor-e5x-aircraft-partinformation.component';
import { NlfOrsEditorE5XEventsComponent } from 'app/ors/ors-editor/ors-editor-e5x-entities/ors-editor-e5x-events/ors-editor-e5x-events.component';


// dangerous goods here
import {  NlfOrsEditorE5XNarrativeComponent } from 'app/ors/ors-editor/ors-editor-e5x-entities/ors-editor-e5x-narrative/ors-editor-e5x-narrative.component';
import {  NlfOrsEditorE5xReportinghistoryComponent } from 'app/ors/ors-editor/ors-editor-e5x-entities/ors-editor-e5x-reportinghistory/ors-editor-e5x-reportinghistory.component';
import { NlfOrsEditorE5xAssessmentComponent } from 'app/ors/ors-editor/ors-editor-e5x-entities/ors-editor-e5x-assessment/ors-editor-e5x-assessment.component';
import {  NlfOrsEditorE5xRiskComponent } from 'app/ors/ors-editor/ors-editor-e5x-entities/ors-editor-e5x-risk/ors-editor-e5x-risk.component';
import { NlfOrsEditorE5xSeparationComponent } from 'app/ors/ors-editor/ors-editor-e5x-entities/ors-editor-e5x-separation/ors-editor-e5x-separation.component';

// ORS EDITOR MOTORFLY ONLY
import { NlfOrsEditorFlightComponent } from 'app/ors/ors-editor/ors-editor-e5x-entities/ors-editor-e5x-aircraft/ors-editor-flight/ors-editor-flight.component';
import { NlfOrsEditorPeopleMotorflyComponent } from 'app/ors/ors-editor/ors-editor-people-motorfly/ors-editor-people-motorfly.component';
import { NlfOrsEditorAircraftPersonComponent } from 'app/ors/ors-editor/ors-editor-e5x-entities/ors-editor-e5x-aircraft/ors-editor-aircraft-person/ors-editor-aircraft-person.component';

// E5X services
import { ApiE5XAttributesService } from 'app/api/api-e5x-attributes.service';
import { ApiE5XChoicesService } from 'app/api/api-e5x-choices.service';

// Aircrafts edit
// import { NlfAircraftsAddComponent } from 'app/aircrafts/aircrafts-add/aircrafts-add.component';
// import { NlfAircraftsEditComponent } from 'app/aircrafts/aircrafts-edit/aircrafts-edit.component';

@NgModule({
  declarations: [
    NlfComponent,
    NlfUiNavbarComponent,
    NlfUserComponent,
    NlfUserTableComponent,

    NlfUiDummyComponent,
    NlfAuthComponent,

    NlfContentComponent,
    NlfContentEditComponent,
    NlfContentViewComponent,
    NlfContentSpacesComponent,
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

    NlfOrsComponent,
    NlfOrsEditorFirstComponent,
    NlfOrsErrorComponent,
    NlfOrsFallskjermComponent,
    NlfOrsFallskjermSearchComponent,
    NlfOrsFallskjermDashboardComponent,
    NlfOrsFallskjermDashboardTableComponent,
    NlfOrsMotorComponent,
    NlfOrsMotorReportComponent,
    NlfOrsMotorSearchComponent,
    NlfOrsTodoTableComponent,
    NlfOrsSelfTableComponent,
    NlfOrsAllTableComponent,
    NlfOrsLastComponent,

    NlfOrsFallskjermMainComponent,
    NlfOrsFallskjermReportComponent,
    NlfOrsReportWorkflowTimelineComponent,
    NlfOrsFallskjermReportSummaryComponent,
    NlfOrsMotorflyReportSummaryComponent,
    NlfOrsStatsHeatmapComponent,
    NlfOrsStatsComponent,
    NlfResolveObservationFlagsComponent,
    NlfResolveObservationTypesComponent,
    NlfOrsReportAskComponent,
    NlfOrsReportComponentsTimelineComponent,
    NlfOrsReportAskTextComponent,
    NlfOrsFallskjermReportInvolvedComponent,
    NlfOrsFallskjermReportOrganizationComponent,
    NlfOrsReportActionsComponent,
    NlfOrsReportRelatedComponent,
    NlfOrsReportWeatherComponent,
    NlfResolveObservationComponent,
    NlfUserProfileComponent,
    NlfOrsReportFilesComponent,
    NlfOrsTagsPipe,
    NlfOrsComponentAttributesPipe,
    NlfResolveObservationStateComponent,
    NlfResolveObservationComponentAttributesComponent,
    NlfResolveObservationTagsComponent,
    NlfResolveObservationRatingComponent,
    NlfOrsRatingPipe,
    NlfOrsRatingCalcPipe,
    NlfDynamicColorPipe,
    NlfActivityPipe,
    ConfirmTemplateDirective,
    NlfOrsReportFilesThumbnailsComponent,
    NlfOrsFallskjermCreateComponent,
    NlfOrsMotorCreateComponent,
    NlfOrsCreateModalComponent,
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
    NlfOrsEditorFlightComponent,
    NlfOrsEditorOperationalComponent,
    NlfOrsEditorCategoriesComponent,

    // ORS activities
    NlfOrsActivitiesComponent,
    NlfOrsActivitiesTimelineComponent,
    // USER ACLS
    NlfOrsEditorUsersComponent,

    NlfOrsEditorPeopleMotorflyComponent,
    // modals
    NlfOrsEditorHelpComponent,
    NlfOrsEditorAboutComponent,
    NlfOrsEditorDebugComponent,
    NlfOrsFallskjermEditorLocationComponent,
    NlfOrsFallskjermEditorOrganizationComponent,
    NlfOrsFallskjermEditorInvolvedComponent,
    NlfOrsEditorWorkflowComponent,
    NlfOrsMotorEditorComponent,
    NlfOrsFallskjermEditorComponent,
    NlfOrsEditorComponentsComponent,

    NlfOrsEditorRouteComponent,

    NlfOrsEditorMetComponent,
    NlfOrsEditorWeatherComponent,

    NlfOrsEditorAircraftPersonComponent,

    // Aircraft attributes
    NlfOrsEditorE5XAcWildlifeComponent,
    NlfOrsEditorE5XAcInjuriesComponent,
    NlfOrsEditorE5XAcWeatherComponent,
    NlfOrsEditorE5XAcFlightComponent,
    // OCCURRENCE ATTRIBUTES
    NlfOrsEditorE5XOccurrenceComponent,
    NlfOrsEditorE5XWeatherComponent,
    NlfOrsEditorE5XClassificationComponent,
    // OCCURRENCE ENTITIES
    NlfOrsEditorE5xEntitiesComponent,
    NlfOrsEditorE5xWxphenomenaComponent,
    NlfOrsEditorE5XRunwayComponent,
    NlfOrsEditorE5XInjuriesComponent,
    NlfOrsEditorE5XDamageComponent,
    NlfOrsEditorE5XWhereComponent,
    NlfOrsEditorE5XAtmComponent,
    NlfOrsEditorE5XAerodromeComponent,
    NlfOrsEditorE5XAerodromeSingleComponent,
    NlfOrsEditorE5XNarrativeComponent,
    NlfOrsEditorE5xAssessmentComponent,
    NlfOrsEditorE5xSeparationComponent,
    NlfOrsEditorE5xAirspaceComponent,
    NlfOrsEditorE5xAirspaceSingleComponent,
    NlfOrsEditorE5XAircraftComponent,
    NlfOrsEditorE5XPartinformationComponent,
    NlfOrsEditorE5XEventsComponent,
    NlfOrsEditorE5xReportinghistoryComponent,
    NlfOrsEditorE5xRiskComponent,


    //NlfOrsE5xComponent,
    //NlfOrsEditorTagE5XComponent,

    NlfErrorComponent,
    ContenteditableDirective,
    // NlfDashboardComponent,
    // WidgetOrsPieComponent,
    ConfirmModalComponent,
    //TestComponent,
    NlfOrsEditorTagComponent,
    NlfOrsEditorTagStringComponent,
    NlfOrsEditorTagPersonComponent,
    NlfOrsEditorTagPersonsComponent,

    NlfMetMetarComponent, // metar
    // Aircrafts
    //NlfAircraftsEditComponent,
    //NlfAircraftsAddComponent,
  ],
  entryComponents: [
    // WidgetOrsPieComponent,
    ConfirmModalComponent,
    NlfOrsEditorHelpComponent,
    NlfOrsEditorAboutComponent,
    NlfOrsEditorDebugComponent,
    NlfOrsEditorWorkflowComponent,
    NlfOrsCreateModalComponent,

  ],
  imports: [
    HttpClientModule,
    DragDropModule,
    NlfSharedModule,
    //NlfAircraftsSharedModule,

    NlfConfigModule, // Config module
    NlfRoutingModule,
    BrowserModule,

    // REMOVE GenericTableModule,
    TableModule, // ngx-easy-table
    // REMOVE RTModule, // right-angled declarative tables
    ImageCropperModule,
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
      apiKey: 'AIzaSyBW1IdM-nFGiwwfP4H2sJg5YiromIuysJ8',
      libraries: ['visualization']
    }),
    DiffMatchPatchModule, // DIFF
    // NgbModule.forRoot() // ngx-bootstrap (not good rather shaitolainen!)
    //  VgCoreModule,
    //  VgControlsModule,
    //  VgOverlayPlayModule,
    //  VgBufferingModule,
    // NgDashboardModule, // Dashboards ngx-dashboard
    // GridsterModule, // Gridster
    JoditAngularModule, // Jodit editor

  ],
  providers: [
    NlfConfigService,
    ApiConfigService,
    ApiHeartbeatService,
    ApiUserService,
    ApiClubsService,
    ApiNlfUserService,
    ApiNlfClubsService,
    ApiNlfMembershipService,
    ApiNlfLicensesService,
    ApiAclRolesService,
    ApiAclGroupsService,
    ApiUserAuthService,
    ApiObservationsService,
    ApiE5xService,
    ApiObservationsWorkflowService,
    ApiFilesService,
    ApiTagsService,
    ApiCacheService,
    ApiObservationsAggService,
    ApiHelpService,
    ApiContentService,
    // AIP
    ApiAirspacesService,
    ApiAircraftsService,
    // Notfications
    ApiNotificationsService,
    // RESOURCES
    ApiGeoAdminService,
    ApiLocationsService,
    Title, // TODO: rename NlfUiTitleService
    // LUNGO
    LungoIntegrationService,
    LungoPersonsService,
    LungoOrganizationsService,
    LungoLicensesService,
    LungoFunctionsService,
    LungoActivitiesService,
    // E5X
    ApiE5XAttributesService,
    ApiE5XChoicesService,
    // Common Services
    NlfAlertService,
    NlfAuthService,
    NlfAuthSubjectService,
    NlfUserSubjectService,
    NlfUserAvatarSubjectService,
    GeoLocationService,
    NlfOrsEditorService,
    NlfOrsEditorInvolvedService,
    ConfirmService,
    ConfirmState,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NlfAuthInterceptor,
      multi: true
    },
    /** TrackJs
    {
      provide: ErrorHandler,
      useClass: TrackJsErrorHandler
    }
    */
  ],
  bootstrap: [NlfComponent]
})
export class NlfModule { }
