import { Component, OnInit } from '@angular/core';
import { OrsModel } from './ors-model';
import { DataService } from "./data.service";
import { Routes } from '@angular/router';
import { AppChildComponent } from "./app-child/app-child.component";

/**
Testing ng2-idle
Needs upgrading to ng5 to abolish the deprecated HttpModule...
**/

import { AlertService } from '../services/alert/alert.service';
import { AuthService } from '../auth/auth.service';
// Imports the application wide object
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-app-ors',
  templateUrl: './app-ors.component.html',
  styleUrls: ['./app-ors.component.css'],

})
export class AppOrsComponent implements OnInit {

//public static routes:Routes = [{ path: 'ors/child', component: AppChildComponent }];

  model = new OrsModel(18, 'Brekt bein');
  message: string;
  submitted = false;




  constructor(
    private data: DataService,
    private app:AppComponent,

    private alertService: AlertService,
    private auth: AuthService) {

    app.setTitle("ORS");


  }



  ngOnInit() {
      this.data.currentMessage.subscribe(message => this.model.other = message)
      console.log("APP ORS");
      console.log(this.message);
  }
  onSubmit() {
    this.submitted = true;
  }

  change() {
    this.data.changeMessage('Something else');
  }

  get diagnostic() { return JSON.stringify(this.model); }


}
