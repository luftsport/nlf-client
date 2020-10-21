import { Component, OnInit } from '@angular/core';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiObservationsItem, ApiOptionsInterface, ApiNotificationsItem, ApiNotificationsList } from 'app/api/api.interface';
import { ApiNotificationsService } from 'app/api/api-notifications.service';
import { ApiAclService } from 'app/api/api-acl.service';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { NlfComponent } from 'app/nlf.component';
import { ConfirmService } from 'app/services/confirm/confirm.service';

@Component({
  selector: 'nlf-ors-activities',
  templateUrl: './ors-activities.component.html',
  styleUrls: ['./ors-activities.component.css']
})
export class NlfOrsActivitiesComponent implements OnInit {

  observation: ApiObservationsItem;
  message_text: string = '';
  notifications: ApiNotificationsItem[];
  events: ApiNotificationsItem[];
  show = { save: false, reminders: true, messages: true, workflow: true, persons: true, dummy: false, e5x: true };
  public now: Date = new Date();
  dataReady = false;
  error = false;
  error_message: string;
  observation_id: number;
  activity: string;
  is_reminding: boolean = false;
  is_sending_msg = false;
  current_acl_users = [];

  constructor(
    private ntfService: ApiNotificationsService,
    private subject: NlfOrsEditorService,
    private route: ActivatedRoute,
    private orsService: ApiObservationsService,
    private alertService: NlfAlertService,
    private app: NlfComponent,
    private confirmService: ConfirmService,
    private aclService: ApiAclService,
  ) {

    // Save on exit
    /*
    this.route_sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.saveIfChanges();
        this.route_sub.unsubscribe();
      }
    });
    */

    this.route.params.subscribe(params => {
      console.log('PARAMS', params);
      this.activity = params['activity'] ? params['activity'] : 0;
      this.observation_id = params['id'] ? params['id'] : 0;
      this.app.setTitle('ORS Activities #' + this.observation_id);
      if (this.observation_id > 0 && !!this.activity) {
        this.orsService.setActivity(this.activity);
        this.getData();
      } else {
        this.alertService.error('Could not determine activity or observation id');
      }
    });

    setInterval(() => {
      this.now = new Date();
    }, 1000 * 60); // every minute
  }


  public getData() {
    this.dataReady = false;
    this.orsService.get(this.observation_id).subscribe(
      data => {
        this.observation = data;
        this.dataReady = true;
      },
      err => {
        this.alertService.error(err.message);
      },
      () => { }
    );
  }



  ngOnInit() {

  }

}
