import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';

// progressbar
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

// Select
import { NgSelectModule } from '@ng-select/ng-select';

// Icons
// import { FontAwesomeModule as r, WeatherIconsModule } from 'ngx-icons';
// Font awesome modle - NOT installed
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaConfig } from '@fortawesome/angular-fontawesome';

// MAPS
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
// Charts
import { NgxEchartsModule } from 'ngx-echarts';


//import { NgxCsvParserModule } from 'ngx-csv-parser';


// PIPES
import { NlfOrsStatePipe } from 'app/pipes/ors-state.pipe';
import { NlfOrsTypePipe } from 'app/pipes/ors-type.pipe';
import { NlfOrsPeoplePipe } from 'app/pipes/ors-people.pipe';
import { SafePipe } from 'app/pipes/safe.pipe';
import { HighliteTextPipe } from 'app/pipes/highlite-text.pipe';
import { NgPipesModule } from 'angular-pipes'; // Angular pipes, love them!

// Note: services in nlf.module
import { NlfAlertComponent } from 'app/services/alert/alert.component';
import { NlfToastComponent } from 'app/services/toast/toast.component';


// Help system
import { NlfHelpComponent } from 'app/services/help/help.component';

// UI
import { NlfUiPageSpinnerComponent } from 'app/ui/page-spinner/page-spinner.component';
import { NlfUiComponentSpinnerComponent } from 'app/ui/component-spinner/component-spinner.component';
import { NlfOrgSelectorComponent } from 'app/ui/org-selector/org-selector.component';
import { NlfBreadcrumbComponent } from 'app/ui/breadcrumb/breadcrumb.component';
import { NlfUiDatepickerComponent } from './ui/datepicker/datepicker.component';

// Resolvers
import { NlfResolveComponent } from 'app/services/resolve/resolve.component';
import { NlfResolveUserComponent } from 'app/services/resolve/resolve-user/resolve-user.component';
import { NlfResolveClubComponent } from 'app/services/resolve/resolve-club/resolve-club.component';
import { NlfResolveLicenseComponent } from 'app/services/resolve/resolve-license/resolve-license.component';
import { NlfResolveMembershipComponent } from 'app/services/resolve/resolve-membership/resolve-membership.component';
import { NlfResolveGroupComponent } from 'app/services/resolve/resolve-group/resolve-group.component';
import { NlfResolveRoleComponent } from 'app/services/resolve/resolve-role/resolve-role.component';
import { NlfResolveFileComponent } from 'app/services/resolve/resolve-file/resolve-file.component';
import { NlfResolveReverseFileComponent } from 'app/services/resolve/resolve-reverse-file/resolve-reverse-file.component';
// Resolvers - Lungo
import { NlfResolveLungoPersonComponent } from 'app/services/resolve/resolve-lungo-person/resolve-lungo-person.component';
import { NlfResolveLungoOrganizationComponent } from 'app/services/resolve/resolve-lungo-organization/resolve-lungo-organization.component';
import { NlfResolveLungoLicenseComponent } from 'app/services/resolve/resolve-lungo-license/resolve-lungo-license.component';
import { NlfResolveLungoFunctionComponent } from 'app/services/resolve/resolve-lungo-function/resolve-lungo-function.component';
import { NlfResolveLungoMembershipComponent } from 'app/services/resolve/resolve-lungo-membership/resolve-lungo-membership.component';
import { NlfResolveLungoActivityComponent } from 'app/services/resolve/resolve-lungo-activity/resolve-lungo-activity.component';
import { ResolveLungoOrganizationTypeComponent } from 'app/services/resolve/resolve-lungo-organization-type/resolve-lungo-organization-type.component';
import { ResolveLungoFunctionTypeComponent } from 'app/services/resolve/resolve-lungo-function-type/resolve-lungo-function-type.component';
import { ResolveLungoCompetenceComponent } from 'app/services/resolve/resolve-lungo-competence/resolve-lungo-competence.component';
import { ResolveLungoCountryComponent } from 'app/services/resolve/resolve-lungo-country/resolve-lungo-country.component';
import { ResolveLungoCountyComponent } from 'app/services/resolve/resolve-lungo-county/resolve-lungo-county.component';
// Resolvers - avatar
import { NlfResolveAvatarsComponent } from 'app/services/resolve/resolve-avatars/resolve-avatars.component';
import { NlfResolveAvatarComponent } from 'app/services/resolve/resolve-avatar/resolve-avatar.component';
import { NlfResolveAvatarLetterComponent } from 'app/services/resolve/resolve-avatar-letter/resolve-avatar-letter.component';
// Resolve config items
import { NlfResolveConfigComponent } from 'app/services/resolve/resolve-config/resolve-config.component';
// OBSREG Resolvers
import { NlfResolveObservationFlagsComponent } from 'app/services/resolve/resolve-observation-flags/resolve-observation-flags.component';
import { NlfResolveObservationTypesComponent } from 'app/services/resolve/resolve-observation-types/resolve-observation-types.component';
import { NlfResolveObservationComponent } from 'app/services/resolve/resolve-observation/resolve-observation.component';
import { NlfResolveObservationStateComponent } from 'app/services/resolve/resolve-observation-state/resolve-observation-state.component';
import { NlfResolveObservationComponentAttributesComponent } from 'app/services/resolve/resolve-observation-component-attributes/resolve-observation-component-attributes.component';
import { NlfResolveObservationTagsComponent } from 'app/services/resolve/resolve-observation-tags/resolve-observation-tags.component';
import { NlfResolveObservationRatingComponent } from 'app/services/resolve/resolve-observation-rating/resolve-observation-rating.component';


// OBSREG PIPES
import { NlfOrsTagsPipe } from 'app/pipes/ors-tags.pipe';
import { NlfOrsComponentAttributesPipe } from 'app/pipes/ors-component-attributes.pipe';
import { NlfOrsRatingPipe } from 'app/pipes/ors-rating.pipe';
import { NlfOrsRatingCalcPipe } from 'app/pipes/ors-rating-calc.pipe';
import { NlfDynamicColorPipe } from 'app/pipes/dynamic-color.pipe';
import { NlfDynamicColorErcPipe } from 'app/pipes/dynamic-color-erc.pipe';
import { NlfActivityPipe } from 'app/pipes/activity.pipe';

// USER
import { NlfUserOrsComponent } from 'app/user/user-ors/user-ors.component';
// TIME
import { MomentModule } from 'ngx-moment'; // optional, provides moment-style pipes for date formatting

// First login
import { NlfUserFirstLoginComponent } from 'app/user/user-first-login/user-first-login.component';

import { NlfNifCompareComponent } from 'app/member/nif-compare/nif-compare.component';

// ng-bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// OBSREG
import { NlfOrsEditorTagStaticComponent } from 'app/ors/ors-editor/ors-editor-tag-static/ors-editor-tag-static.component';
import { NlfOrsE5xComponent } from 'app/ors/ors-e5x/ors-e5x.component';
import { NlfOrsEditorTagE5XComponent } from 'app/ors/ors-editor/ors-editor-tag-e5x/ors-editor-tag-e5x.component';
import { NlfOrsEditorTagE5xRenderComponent } from 'app/ors/ors-editor/ors-editor-tag-e5x-render/ors-editor-tag-e5x-render.component';
import { NlfOrsEditorTagE5xRenderVersionComponent } from 'app/ors/ors-editor/ors-editor-tag-e5x-render-version/ors-editor-tag-e5x-render-version.component';
// ORS tag string
import { NlfOrsEditorTagStringComponent } from 'app/ors/ors-editor/ors-editor-tag-string/ors-editor-tag-string.component';
import { NlfOrsEditorTagComponent } from 'app/ors/ors-editor/ors-editor-tag/ors-editor-tag.component';
import { NlfOrsEditorTagPersonComponent } from 'app/ors/ors-editor/ors-editor-tag-person/ors-editor-tag-person.component';
import { NlfOrsEditorTagPersonsComponent } from 'app/ors/ors-editor/ors-editor-tag-persons/ors-editor-tag-persons.component';

// Date normalized
import { NlfOrsEditorDateComponent } from 'app/ors/ors-editor/ors-editor-date/ors-editor-date.component';
// Go to specified ors by id!
import { NlfOrsGoComponent } from 'app/ors/ors-go/ors-go.component';

//// OTHER SHARED MODULES!!!
import { NlfAircraftsAddComponent } from 'app/aircrafts/aircrafts-add/aircrafts-add.component';
import { NlfAircraftsEditComponent } from 'app/aircrafts/aircrafts-edit/aircrafts-edit.component';
import { NlfAircraftSummaryComponent } from 'app/aircrafts/aircraft-summary/aircraft-summary.component';

// SELECTERS @TODO move to seperate universal
import { NlfOrsEditorTagAirportComponent } from 'app/ors/ors-editor/ors-editor-tag-airport/ors-editor-tag-airport.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // HttpModule, // NB ONLY FOR ng2-idle until ng5 support for HttpClient
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule, // ngx-icons
    LeafletModule, // Maps
    LeafletMarkerClusterModule, // cluster maps
    LeafletDrawModule, // draw on map
    NgProgressModule,
    NgProgressHttpModule,
    // NgProgressRouterModule,
    NgPipesModule,
    NgSelectModule,
    MomentModule,
    NgbModule, // ng-bootstrap see https://ng-bootstrap.github.io/#/getting-started for alternative import strategies
    // Other shared
    //NgxCsvParserModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })

  ],
  declarations: [
    NlfHelpComponent,
    NlfOrsStatePipe,
    NlfOrsPeoplePipe,
    SafePipe,
    HighliteTextPipe,
    NlfOrsTypePipe,
    NlfOrsTagsPipe,
    NlfAlertComponent,
    NlfToastComponent,
    NlfUiPageSpinnerComponent,
    NlfUiComponentSpinnerComponent,
    NlfUiDatepickerComponent,
    NlfOrgSelectorComponent,
    NlfResolveComponent,
    NlfResolveUserComponent,
    NlfResolveMembershipComponent,
    NlfResolveGroupComponent,
    NlfResolveRoleComponent,
    NlfResolveClubComponent,
    NlfResolveLicenseComponent,
    NlfResolveFileComponent,
    NlfResolveReverseFileComponent,
    NlfResolveAvatarsComponent,
    NlfResolveAvatarComponent,
    NlfResolveAvatarLetterComponent,
    NlfResolveConfigComponent,
    NlfResolveObservationTypesComponent,
    NlfOrsRatingPipe,
    NlfOrsComponentAttributesPipe,
    NlfResolveObservationFlagsComponent,
    NlfResolveObservationComponent,
    NlfResolveObservationStateComponent,
    NlfResolveObservationComponentAttributesComponent,
    NlfResolveObservationTagsComponent,
    NlfResolveObservationRatingComponent,
    NlfOrsRatingCalcPipe,
    NlfDynamicColorPipe,
    NlfDynamicColorErcPipe,
    NlfActivityPipe,
    // Lungo
    NlfResolveLungoPersonComponent,
    NlfResolveLungoOrganizationComponent,
    NlfResolveLungoLicenseComponent,
    NlfResolveLungoFunctionComponent,
    NlfResolveLungoMembershipComponent,
    NlfResolveLungoActivityComponent,
    ResolveLungoOrganizationTypeComponent,
    ResolveLungoFunctionTypeComponent,
    ResolveLungoCompetenceComponent,
    ResolveLungoCountryComponent,
    ResolveLungoCountyComponent,
    NlfNifCompareComponent,
    // Breadcrumb
    NlfBreadcrumbComponent,
    NlfUserFirstLoginComponent,
    // OBSREG
    NlfOrsE5xComponent,
    NlfOrsEditorTagE5XComponent,
    NlfOrsEditorTagE5xRenderComponent,
    NlfOrsEditorTagStaticComponent,
    NlfOrsEditorDateComponent,
    NlfOrsGoComponent,
    NlfOrsEditorTagStringComponent,
    NlfOrsEditorTagComponent,
    NlfOrsEditorTagPersonComponent,
    NlfOrsEditorTagPersonsComponent,
    NlfOrsEditorTagE5xRenderVersionComponent,
    // Aircrafts
    NlfAircraftsAddComponent,
    NlfAircraftsEditComponent,
    NlfAircraftSummaryComponent,
    // SELECTORS
    NlfOrsEditorTagAirportComponent,

  ],
  exports: [
    // Angular
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    // Custom
    LeafletModule,
    LeafletMarkerClusterModule,
    LeafletDrawModule,
    NgxEchartsModule,
    NgSelectModule,
    NlfHelpComponent,
    FontAwesomeModule, // ngx-icons
    NgProgressModule,
    NgProgressHttpModule,
    NlfUiPageSpinnerComponent,
    NlfUiComponentSpinnerComponent,
    NlfUiDatepickerComponent,
    NlfOrgSelectorComponent,
    NgPipesModule,
    NlfOrsStatePipe,
    NlfOrsPeoplePipe,
    SafePipe,
    HighliteTextPipe,
    NlfOrsTypePipe,
    NlfOrsTagsPipe,
    NlfResolveComponent,
    NlfResolveUserComponent,
    NlfResolveMembershipComponent,
    NlfResolveGroupComponent,
    NlfResolveRoleComponent,
    NlfResolveClubComponent,
    NlfResolveLicenseComponent,
    NlfResolveFileComponent,
    NlfResolveReverseFileComponent,
    NlfResolveAvatarsComponent,
    NlfResolveAvatarComponent,
    NlfResolveAvatarLetterComponent,
    NlfResolveConfigComponent,
    NlfResolveObservationTypesComponent,
    NlfOrsRatingPipe,
    NlfOrsComponentAttributesPipe,
    NlfResolveObservationFlagsComponent,
    NlfResolveObservationComponent,
    NlfResolveObservationStateComponent,
    NlfResolveObservationComponentAttributesComponent,
    NlfResolveObservationTagsComponent,
    NlfResolveObservationRatingComponent,
    NlfOrsRatingCalcPipe,
    NlfDynamicColorPipe,
    NlfDynamicColorErcPipe,
    NlfActivityPipe,
    // Lungo
    NlfResolveLungoPersonComponent,
    NlfResolveLungoOrganizationComponent,
    NlfResolveLungoLicenseComponent,
    NlfResolveLungoFunctionComponent,
    NlfResolveLungoMembershipComponent,
    NlfResolveLungoActivityComponent,
    ResolveLungoOrganizationTypeComponent,
    ResolveLungoFunctionTypeComponent,
    ResolveLungoCompetenceComponent,
    ResolveLungoCountryComponent,
    ResolveLungoCountyComponent,
    NlfNifCompareComponent,
    // Common
    NlfAlertComponent,
    NlfToastComponent,
    NgbModule,
    NlfBreadcrumbComponent,
    NlfUserFirstLoginComponent,
    // OBSREG
    NlfOrsE5xComponent,
    NlfOrsEditorTagE5XComponent,
    NlfOrsEditorTagE5xRenderComponent,
    NlfOrsEditorTagStaticComponent,
    NlfOrsEditorDateComponent,
    NlfOrsGoComponent,
    NlfOrsEditorTagStringComponent,
    NlfOrsEditorTagComponent,
    NlfOrsEditorTagPersonComponent,
    NlfOrsEditorTagPersonsComponent,
    NlfOrsEditorTagE5xRenderVersionComponent,
    // Other
    NlfAircraftsAddComponent,
    NlfAircraftsEditComponent,
    NlfAircraftSummaryComponent,
    //SELECTORS
    NlfOrsEditorTagAirportComponent,

  ],

  // Dynamic components
  // remove @9 entryComponents: [NlfUserFirstLoginComponent],
})
export class NlfSharedModule {

  constructor(faConfig: FaConfig) {
    faConfig.fixedWidth = true;
  }

}
