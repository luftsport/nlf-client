import { Component, OnInit } from '@angular/core';
import { OrsModel } from './ors-model';
import { DataService } from "./data.service";
import { Routes } from '@angular/router';
import { AppChildComponent } from "./app-child/app-child.component";

/**
Testing ng2-idle
Needs upgrading to ng5 to abolish the deprecated HttpModule...
**/
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import { AlertService } from '../services/alert/alert.service';

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

  //ng-idle
  idleState: string;
  timedOut: boolean = false;
  lastPing?: Date = null;


  constructor(
    private data: DataService,
    private app:AppComponent,
    private idle: Idle,
    private keepalive: Keepalive,
    private alertService: AlertService) {

    app.setTitle("ORS");


    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(10);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      alertService.success(this.idleState);
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      alertService.error(this.idleState);
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!';
      alertService.info(this.idleState);
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
      alertService.info(this.idleState);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }

  public reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  ngOnInit() {
      this.data.currentMessage.subscribe(message => this.model.other = message)
  }
  onSubmit() {
    this.submitted = true;
  }

  get diagnostic() { return JSON.stringify(this.model); }


}
