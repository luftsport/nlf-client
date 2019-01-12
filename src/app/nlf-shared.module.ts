import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';


import { NlfHelpComponent } from 'app/services/help/help.component';
import { FontAwesomeModule, WeatherIconsModule } from 'ngx-icons';

// progressbar
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
// PIPES
import { NlfOrsStatePipe } from 'app/pipes/ors-state.pipe';
import { NlfOrsTypePipe } from 'app/pipes/ors-type.pipe';
import { NlfOrsPeoplePipe } from 'app/pipes/ors-people.pipe';
import { SafePipe } from 'app/pipes/safe.pipe';
import { NgPipesModule } from 'angular-pipes'; // Angular pipes, love them!

// NB services in nlf.module
import { NlfAlertComponent } from 'app/services/alert/alert.component';

// Resolvers
import { NlfResolveComponent } from 'app/services/resolve/resolve.component';
import { NlfResolveUserComponent } from 'app/services/resolve/resolve-user/resolve-user.component';
import { NlfResolveClubComponent } from 'app/services/resolve/resolve-club/resolve-club.component';
import { NlfResolveLicenseComponent } from 'app/services/resolve/resolve-license/resolve-license.component';
import { NlfResolveMembershipComponent } from 'app/services/resolve/resolve-membership/resolve-membership.component';
import { NlfResolveGroupComponent } from 'app/services/resolve/resolve-group/resolve-group.component';
import { NlfResolveRoleComponent } from 'app/services/resolve/resolve-role/resolve-role.component';
// Resolvers - Lungo
import { NlfResolveLungoPersonComponent } from 'app/services/resolve/resolve-lungo-person/resolve-lungo-person.component';
import { NlfResolveLungoOrganizationComponent } from 'app/services/resolve/resolve-lungo-organization/resolve-lungo-organization.component';
import { NlfResolveLungoLicenseComponent } from 'app/services/resolve/resolve-lungo-license/resolve-lungo-license.component';
import { NlfResolveLungoFunctionComponent } from 'app/services/resolve/resolve-lungo-function/resolve-lungo-function.component';
import { NlfResolveLungoActivityComponent } from 'app/services/resolve/resolve-lungo-activity/resolve-lungo-activity.component';
import { ResolveLungoOrganizationTypeComponent} from 'app/services/resolve/resolve-lungo-organization-type/resolve-lungo-organization-type.component';
import { ResolveLungoFunctionTypeComponent} from 'app/services/resolve/resolve-lungo-function-type/resolve-lungo-function-type.component';

// ng-bootstrap

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NlfBreadcrumbComponent } from 'app/ui/breadcrumb/breadcrumb.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        // HttpModule, // NB ONLY FOR ng2-idle until ng5 support for HttpClient
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule, // ngx-icons
        WeatherIconsModule, // ngx-icons],
        NgProgressModule.forRoot(),
        NgProgressHttpModule.forRoot(),
        // NgProgressRouterModule,
        NgPipesModule,
        NgbModule.forRoot(), // ng-bootstrap

    ],
    declarations: [
        NlfHelpComponent,
        NlfOrsStatePipe,
        NlfOrsPeoplePipe,
        SafePipe,
        NlfOrsTypePipe,
        NlfAlertComponent,
        NlfResolveComponent,
        NlfResolveUserComponent,
        NlfResolveMembershipComponent,
        NlfResolveGroupComponent,
        NlfResolveRoleComponent,
        NlfResolveClubComponent,
        NlfResolveLicenseComponent,
        // Lungo
        NlfResolveLungoPersonComponent,
        NlfResolveLungoOrganizationComponent,
        NlfResolveLungoLicenseComponent,
        NlfResolveLungoFunctionComponent,
        NlfResolveLungoActivityComponent,
        ResolveLungoOrganizationTypeComponent,
        ResolveLungoFunctionTypeComponent,
        // Breadcrumb
        NlfBreadcrumbComponent,


    ],
    exports: [
        // Angular
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        // Custom
        NlfHelpComponent,
        FontAwesomeModule, // ngx-icons
        WeatherIconsModule,
        NgProgressModule,
        NgProgressHttpModule,
        NgPipesModule,
        NlfOrsStatePipe,
        NlfOrsPeoplePipe,
        SafePipe,
        NlfOrsTypePipe,
        NlfResolveComponent,
        NlfResolveUserComponent,
        NlfResolveMembershipComponent,
        NlfResolveGroupComponent,
        NlfResolveRoleComponent,
        NlfResolveClubComponent,
        NlfResolveLicenseComponent,
        // Lungo
        NlfResolveLungoPersonComponent,
        NlfResolveLungoOrganizationComponent,
        NlfResolveLungoLicenseComponent,
        NlfResolveLungoFunctionComponent,
        NlfResolveLungoActivityComponent,
        ResolveLungoOrganizationTypeComponent,
        ResolveLungoFunctionTypeComponent,
        // Common
        NlfAlertComponent,
        NgbModule,
        NlfBreadcrumbComponent
    ]
})
export class NlfSharedModule { }
