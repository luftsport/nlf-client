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
  observation_id: number;
  activity: string;
  is_reminding: boolean = false;
  is_sending_msg = false;
  current_acl_users = [];

  some_test_users: number[] = [301041, 8077334, 7897042];
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
      this.app.setTitle(' ORS Activities #' + this.observation_id);
      if(this.observation_id >0 && !!this.activity) {
        this.orsService.setActivity(this.activity);
        this.getData();
      } else {
        this.alertService.error('Could not determine activity or observation id');
      }
    });

    setInterval(() => {
      this.now = new Date();
    }, 1000*60); // every minute
  }


 public getData() {
   this.orsService.get(this.observation_id).subscribe(
     data => {
       this.observation = data;
       this.getActivities();
       this.getAclUsers();
     },
     err => {
       this.alertService.error(err.message);
     },
     () => { }
   );
 }

 public getAclUsers() {
   this.aclService.getAclUsers(this.observation._model.type + '_observations', this.observation._id).subscribe(
     data => {
       this.current_acl_users = data['_items'];
     }
   )

 }

  getActivities(hide=true) {

    if(hide) this.dataReady = false;
    const options: ApiOptionsInterface = {
      query: {
        aggregate: {
          $event_from: this.observation._model.type + '_observations',
          $event_from_id: this.observation._id
        },
        sort: [{ event_created: -1 }],
        max_results: 5000
      }
    }
    this.ntfService.getEvents(options).subscribe(
      data => {
        this.events = data['_items'];
        if(hide) this.dataReady = true;
      }
    )
  }

  trackByRowId(index: number, item: ApiNotificationsItem): string {
    return item._id;
  }

  public notify() {
    const confirmMsg = { title: 'Vennligst bekreft',
                         message: 'Er du sikker på at ønsker sende en purring?',
                         yes: 'Ja',
                         no: 'Nei'};
    this.confirmService.confirm(confirmMsg).then(
        () => { // Yes
        this.is_reminding = true;
            this.ntfService.reminder({event_from: this.observation._model.type + '_observations', event_from_id: this.observation._id}).subscribe(
            data => {
                console.log(data);
                this.alertService.success('Purringen ble sendt', false, true, 10);
                this.getActivities(false);
            },
            err => {
            console.log('ERR', err);
            this.alertService.error(err.error._error, false, true, 10);
            this.is_reminding = false;
            },
            () => {
            this.is_reminding = false;

            }
            );
        },
        () => { // No
          console.log('NO');
            // Do nothing?
        }
    );
  }

    public sendMessage() {
            this.is_sending_msg = true;
            this.ntfService.message({event_from: this.observation._model.type + '_observations', event_from_id: this.observation._id, message: this.message_text}).subscribe(
            data => {
                console.log(data);
                this.alertService.success('Meldingen ble sendt', false, true, 10);
                this.message_text = '';
                this.getActivities(false);
            },
            err => {
            console.log('ERR', err);
            this.alertService.error(err.error._error, false, true, 10);
            this.is_sending_msg = false;
            },
            () => {
            this.is_sending_msg = false;

            }
            );

  }


  ngOnInit() {

  }

}
