import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ApiObservationsItem, ApiOptionsInterface, ApiNotificationsItem, ApiNotificationsList } from 'app/api/api.interface';
import { ApiNotificationsService } from 'app/api/api-notifications.service';
import { ConfirmService } from 'app/services/confirm/confirm.service';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { ApiAclService } from 'app/api/api-acl.service';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { NlfComponent } from 'app/nlf.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faBell, faComment, faExchange, faFloppyDisk, faPaperPlane, faPlus, faRepeat, faBan, faLongArrowRight, faUserPlus, faUserTimes, faRefresh, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faBell as faBellRegular, faCommenting, faComments, faPaperPlane as faPaperPlaneRegular, faClock  } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'nlf-ors-activities-timeline',
  templateUrl: './ors-activities-timeline.component.html',
  styleUrls: ['./ors-activities-timeline.component.css']
})
export class NlfOrsActivitiesTimelineComponent implements OnInit {

  @Input() observation: ApiObservationsItem;

  faBell = faBell;
  faBellRegular = faBellRegular;
  faComments = faComments;
  faComment = faComment;
  faCommenting = faCommenting;
  faExchange = faExchange;
  faPaperPlane = faPaperPlane;
  faPlus = faPlus;
  faRepeat = faRepeat;
  faRefresh = faRefresh;
  faBan = faBan;
  faLongArrowRight = faLongArrowRight;
  faUserPlus = faUserPlus;
  faUserTimes = faUserTimes;
  faFloppyDisk = faFloppyDisk;
  faPaperPlaneRegular = faPaperPlaneRegular;
  faClock = faClock;
  faCheck = faCheck;

  message_text: string = '';
  notifications: ApiNotificationsItem[];
  events: ApiNotificationsItem[];
  show = { save: false, reminders: true, messages: true, workflow: true, persons: true, dummy: false, e5x: true };
  public now: Date = new Date();
  dataReady = false;
  error = false;
  error_message: string;
  observation_id: number;
  is_reminding: boolean = false;
  is_sending_msg = false;
  current_acl_users = [];

  modalRef;
  modalRecepients = [];

  constructor(
    private ntfService: ApiNotificationsService,
    private alertService: NlfAlertService,
    private confirmService: ConfirmService,
    private aclService: ApiAclService,
    private modalService: NgbModal,
    private router: Router
  ) {
    router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        if (!!this.modalService.hasOpenModals()) {
          this.modalService.dismissAll();
        }
      });
  }

  ngOnInit() {
    this.getActivities();
    this.getAclUsers();
  }

  public getAclUsers() {
    this.aclService.getAclUsers(this.observation._model.type + '_observations', this.observation._id).subscribe(
      data => {
        this.current_acl_users = data['_items'];
      }
    )

  }

  openReceipentsModal(template, recepients) {
    this.modalRecepients = recepients;
    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }

  getActivities(hide = true) {

    this.ntfService.getNotifications().subscribe(
      data => {
        console.log('NOTIFICATIONS ONLY ME?', data);
      }
    )

    if (hide) this.dataReady = false;
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
        if (hide) this.dataReady = true;
      },
      err => {
        this.alertService.error(err.message);
        this.error = true;
        this.error_message = err;
        this.dataReady = false;
      },
      () => { }
    );
  }

  trackByRowId(index: number, item: ApiNotificationsItem): string {
    return item._id;
  }

  public notify() {
    const confirmMsg = {
      title: 'Vennligst bekreft',
      message: 'Er du sikker på at ønsker sende en purring?',
      yes: 'Ja',
      no: 'Nei'
    };
    this.confirmService.confirm(confirmMsg).then(
      () => { // Yes
        this.is_reminding = true;
        this.ntfService.reminder({ event_from: this.observation._model.type + '_observations', event_from_id: this.observation._id }).subscribe(
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
    this.ntfService.message({ event_from: this.observation._model.type + '_observations', event_from_id: this.observation._id, message: this.message_text }).subscribe(
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
}
