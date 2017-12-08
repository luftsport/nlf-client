import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, NgModel } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Third party
import { AlertModule } from 'ngx-bootstrap';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpClientModule } from '@ngx-progressbar/http-client';
import {TableModule} from 'ngx-easy-table';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from "ngx-bootstrap/pagination"; //Dependency for ng2-table
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule } from 'ngx-icons';

// API
import { UserService } from './api/user.service';


// Our custom components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppUserComponent } from './app-user/app-user.component';
import { AppUserTableComponent } from './app-user/app-user-table/app-user-table.component';
import { UserTableComponent } from './app-user/user-table/user-table.component';
import { AppOrsComponent } from './app-ors/app-ors.component';
import { AppChildComponent } from './app-ors/app-child/app-child.component';
import { AppRoutingModule } from './app-routing.module';
import { DummyComponent } from './dummy/dummy.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AppUserComponent,
    AppUserTableComponent,
    UserTableComponent,
    AppOrsComponent,
    AppChildComponent,
    DummyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AlertModule.forRoot(),
    NgProgressModule.forRoot(),
    NgProgressHttpClientModule,
    BsDropdownModule.forRoot(),
    CollapseModule,
    FontAwesomeModule,
    PaginationModule.forRoot(),
    TableModule,
    AppRoutingModule
    //NgbModule.forRoot()
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
