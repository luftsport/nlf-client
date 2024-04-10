import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiAirportsService } from 'app/api/api-airports.service';
import { ApiOptionsInterface, ApiObservationsItem, ApiAirport, ApiAirports, ApiObservationAircraftsItem, NlfConfigItem } from 'app/api/api.interface';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, map } from 'rxjs/operators';
import { Subject, Observable, of, concat } from 'rxjs';
import { GeoLocationService } from 'app/services/geo/geo-location.service';
import { ApiCacheService } from 'app/api/api-cache.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from 'app/services/confirm/confirm.service';
import { ApiE5xService } from 'app/api/api-e5x.service';
import { ApiFilesService } from 'app/api/api-files.service';
import { NlfAuthSubjectService } from 'app/services/auth/auth-subject.service';
import { get, cleanE5XObject, deepCopy, pad } from 'app/interfaces/functions';
import { environment } from 'environments/environment';
import { faHistory, faDownload, faCheck, faCogs, faBan } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'nlf-ors-modellfly-eccairs2',
  templateUrl: './ors-modellfly-eccairs2.component.html',
  styleUrls: ['./ors-modellfly-eccairs2.component.css']
})
export class NlfOrsModellflyEccairs2Component implements OnInit {

  modalRef;
  observation: ApiObservationsItem;
  e5xobservation;
  generating = false;
  token: string;
  e5xFile = false;
  e5xResult;
  person_id: number;

  e5x_enabled = true;

  ENV = environment;
  public config: NlfConfigItem;


  allowedReportStatus = { 2: 'open', 3: 'closed' }; // 2=open, 3=closed
  allowedStatusKeys = [];


  faHistory = faHistory;
  faDownload = faDownload;
  faCheck = faCheck;
  faFileAlt = faFileAlt;
  faPaperPlane = faPaperPlane;
  faCogs = faCogs;
  faBan = faBan;

  constructor(
    private modalService: NgbModal,
    private subject: NlfOrsEditorService,
    private confirmService: ConfirmService,
    private e5xService: ApiE5xService,
    public authSubject: NlfAuthSubjectService,
    private apiFile: ApiFilesService,
    private configService: NlfConfigService
  ) {


  }
  ngOnInit(): void {
    this.allowedStatusKeys = Object.keys(this.allowedReportStatus).map(Number);

    forkJoin([
      this.authSubject.observableAuthData.subscribe(
        data => {
          this.person_id = data?.person_id || undefined;
          try {
            this.token = data.token;
          } catch {
            this.token = undefined;
          }
        }
      ),

      this.subject.observableObservation.subscribe(
        observation => {
          this.observation = observation;

        }
      ),
      this.configService.observableConfig.subscribe(
        data => {
          this.config = data;
          try {
            this.e5x_enabled = this.config[this.observation._model.type]['observation']['e5x']['enabled'];
            if (!!this.config[this.observation._model.type]['observation']['e5x']['enabled'] && !this.observation.hasOwnProperty('e5x')) {
              this.observation['e5x'] = {};
              this.observation.e5x._status = this.allowedReportStatus[Object.keys(this.allowedReportStatus)[0]];
              if (!this.observation.e5x.hasOwnProperty('audit')) {
                this.observation.e5x['audit'] = [];
              }
            }
          } catch (e) { }
        }
      )
    ]);
  }

  private _send() {
    this.generating = true;
    this.e5xResult = undefined;

    /**
    Norwegian CAA needs "TEST" for test reports
    Testklubb IR should always be marked "TEST"
    */
    if (this.ENV._name != 'prod' || this.observation.club === 781765) {
      this.observation.eccairs2.attributes.headline = this.observation.eccairs2.attributes.headline + ' TEST [' + this.ENV._name + ']';
    }

    // Backporting utctime and date case bug:
    if (this.observation.eccairs2.attributes.hasOwnProperty('uTCDate')) {
      try {
        delete this.observation.eccairs2.attributes['uTCDate'];
        this.observation.eccairs2.attributes['utcDate'] = { value: undefined };
      } catch { }
    }
    if (this.observation.eccairs2.attributes.hasOwnProperty('uTCTime')) {
      try {
        delete this.observation.eccairs2.attributes['uTCTime'];
        this.observation.eccairs2.attributes['utcTime'] = { value: undefined };
      } catch { }
    }
    // End backporting


    // Times this.currentWhen.toISOString().substr(0,10)
    let t = new Date(this.observation.when);
    this.observation.eccairs2.attributes.utcDate.value = [t.getUTCFullYear(), pad(t.getUTCMonth() + 1), pad(t.getUTCDate())].join('-');
    this.observation.eccairs2.attributes.utcTime.value = [pad(t.getUTCHours()), pad(t.getUTCMinutes()), pad(t.getUTCSeconds())].join(':');
    this.observation.eccairs2.attributes.localDate.value = [t.getFullYear(), pad(t.getMonth() + 1), pad(t.getDate())].join('-');
    this.observation.eccairs2.attributes.localTime.value = [pad(t.getHours()), pad(t.getMinutes()), pad(t.getSeconds())].join(':');



    this.e5xService.generate(
      this.observation._id,
      this.observation._etag,
      this.observation._model.type,
      this.observation.eccairs2,
      this.config[this.observation._model.type]['observation']['e5x']['rit_version']
    ).subscribe(
      data => {
        console.log('DATA E5X', data);
        this.observation.e5x.audit = data['e5x']['audit'];
        this.subject.update(this.observation);
      },
      err => console.log('E5X ERR', err),
      () => { this.generating = false; }
    );
  }

  public send() {
    if (this.observation.acl_user.x && this.observation.workflow.state === 'pending_review_obsreg') {
      const confirmMsg = {
        title: 'Please confirm',
        message: 'Er du sikker på du vil sende rapporten til LT?',
        yes: 'Ja, send inn',
        no: 'Nei'
      };
      this.confirmService.confirm(confirmMsg).then(
        () => this._send(),
        () => { }
      );
    }

  }

  public openModal(template) {
    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  public closeModal(index) {
    this.subject.update(this.observation);
    this.modalRef.close();
  }




}
