import { Component, OnInit } from '@angular/core';
import { OrsModel } from './ors-model';
import { DataService } from './data.service';
import { Routes } from '@angular/router';
import { NlfOrsChildComponent } from './ors-child/ors-child.component';

/**
Testing ng2-idle
Needs upgrading to ng5 to abolish the deprecated HttpModule...
**/

import { NlfAlertService } from '../services/alert/alert.service';
import { NlfAuthService } from '../services/auth/auth.service';
// Imports the application wide object
import { NlfComponent } from '../nlf.component';

@Component({
  selector: 'nlf-ors',
  templateUrl: './ors.component.html',
  styleUrls: ['./ors.component.css'],

})
export class NlfOrsComponent implements OnInit {

  // public static routes:Routes = [{ path: 'ors/child', component: NlfChildComponent }];

  model = new OrsModel(18, 'Brekt bein');
  message: string;
  submitted = false;

  constructor(
    private data: DataService,
    private app: NlfComponent,
    private alertService: NlfAlertService,
    private auth: NlfAuthService) {

    app.setTitle('ORS');


  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.model.other = message);
    this.app.setTitle('ORS');
  }
  onSubmit() {
    this.submitted = true;
  }

  change() {
    this.data.changeMessage('Something else');
  }

  get diagnostic() { return JSON.stringify(this.model); }


}
