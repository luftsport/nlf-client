import { ApiObservationsItem, ApiOptionsInterface, ApiUserDataSubjectItem } from 'app/api/api.interface';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { NlfComponent } from 'app/nlf.component';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from 'app/services/confirm/confirm.service';
import { NlfOrsEditorHelpComponent } from 'app/ors/ors-editor/ors-editor-help/ors-editor-help.component';
import { NlfOrsEditorAboutComponent } from 'app/ors/ors-editor/ors-editor-about/ors-editor-about.component';
import { NlfOrsEditorDebugComponent } from 'app/ors/ors-editor/ors-editor-debug/ors-editor-debug.component';
import { NlfOrsEditorWorkflowComponent } from 'app/ors/ors-editor/ors-editor-workflow/ors-editor-workflow.component';
import { NlfUserSubjectService } from 'app/user/user-subject.service';
import { DomSanitizer } from '@angular/platform-browser';
import { reloadCurrentRoute } from 'app/interfaces/functions';
import { ComponentCanDeactivate } from 'app/pending-changes.guard';
import { HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs';
import { faSave, faQuestion, faInfoCircle, faHistory, faUserEdit, faFile, faEye, faExchange, faPaperPlane, faReply, faRepeat, faRandom, faTimes, faCheck, faLock } from '@fortawesome/free-solid-svg-icons';
import 'rxjs/add/operator/takeWhile';
import { NlfEventQueueService, AppEventType } from 'app/nlf-event-queue.service';
import { NlfSocketService } from 'app/services/socket/socket.service';
import { diff, addedDiff, deletedDiff, updatedDiff, detailedDiff } from 'deep-object-diff';
import * as _ from 'lodash';
import { isEqual, cloneDeep, mergeWith } from 'lodash'
import { debounce } from 'ts-debounce';
import { NlfOrsEditorInvolvedService, NlfOrsEditorInvolvedInterface } from 'app/ors/ors-editor/ors-editor-involved.service';
import { pad, cleanObject } from 'app/interfaces/functions';
import { ApiGeoAdminService } from 'app/api/api-geo-admin.service';
import {
  E5XClass,
  E5XAircraftClass,
  E5XReportingHistoryClass,
  E5XRiskAssessmentClass,

} from 'app/interfaces/e5x.interface';

@Component({
  selector: 'nlf-ors-modellfly-editor',
  templateUrl: './ors-modellfly-editor.component.html',
  styleUrls: ['./ors-modellfly-editor.component.css']
})
export class NlfOrsModellflyEditorComponent implements OnInit, OnDestroy, ComponentCanDeactivate {

  faSave = faSave;
  faQuestion = faQuestion;
  faInfoCircle = faInfoCircle;
  faHistory = faHistory;
  faFile = faFile;
  faEye = faEye;
  faExchange = faExchange;
  faPaperPlane = faPaperPlane;
  faReply = faReply;
  faRepeat = faRepeat;
  faRandom = faRandom;
  faTimes = faTimes;
  faCheck = faCheck;
  faLock = faLock;
  faUserEdit = faUserEdit;

  error;
  id: number | string;
  dataReady = false;
  observation: ApiObservationsItem;
  differ: any;
  changes = false;
  hotkeys = []; //: Hotkey[];
  devDebug = false;
  preview = {};
  modalRef;
  workflowRef;
  eccairsModalOpen = false;

  eccairs2: any;

  // Narrative/ReportersDescription et al
  allowedLanguages = [16, 43, 55, 13, 54, 23, 20, 31];

  involved;

  tabActive = 1;

  a = [];
  b = 'Stringish';

  debouncedUpdate = debounce(this.changed, 900);

  @ViewChild('modalEccairs', { static: false }) modalEccairsTemplate: any;


  shadow;
  // Generated
  public userData: ApiUserDataSubjectItem;

  private subject_is_alive: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orsService: ApiObservationsService,
    private alertService: NlfAlertService,
    private subject: NlfOrsEditorService,
    private app: NlfComponent,
    private hotkeysService: HotkeysService,
    private modalService: NgbModal,
    private confirmService: ConfirmService,
    private sanitizer: DomSanitizer,
    private userDataSubject: NlfUserSubjectService,
    private eventQueue: NlfEventQueueService,
    private socketService: NlfSocketService,
    private involvedService: NlfOrsEditorInvolvedService,
    private geoAdminService: ApiGeoAdminService,

    // private differs: KeyValueDiffers
  ) {


    // Instantiate diff checking:
    // this.differ = this.differs.find({}).create();

    // Instantiate our behavioursubject
    forkJoin([
      // Instantiate our behavioursubject
      this.subject.observableObservation.takeWhile(() => this.subject_is_alive).subscribe(
        observation => {

          if (!!observation && !!this.observation) {
            if (observation['_model']['type'] != this.observation['_model']['type']) {
              console.error('RELOADING ROUTE');
              reloadCurrentRoute(router);
            }
          }


          if (!!observation) {
            this.observation = observation;
            if (!this.involved) {
              this.involvedService.add(observation.reporter, 'Meg selv');
              this.involved = [observation.reporter];
            }

            // Check if reset
            if (this.observation.id === 0) {
              this.dataReady = false;
              this.shadow = undefined;
            } else {
              this.changed();
            }
          } else {
            this.dataReady = false;
          }
        },
        err => console.log(err),
        () => { }

      ),

      this.userDataSubject.observable.subscribe(
        data => {
          if (!!data) {
            this.userData = data;
          }
        },
        err => console.log('Error getting user data: ', err)
      )
    ]);

    this.socketService.socket.on('action', (message) => {

      switch (message.action) {

        case 'obsreg_reload': {
          if (message.hasOwnProperty('link')) {
            if (message.link[0] === 'modellfly' && message.link[1] === this.observation.id) {
              console.log('[socket.io] Server asked to reload obsreg');
            }
          }
        }
        case 'obsreg_e5x_finished_processing': {
          if (message.hasOwnProperty('link')) {
            if (message.link[0] === 'modellfly' && message.link[1] === this.observation.id) {
              this.getData('e5x');
            }
          }
        }
      }
    });

    // Instantiate all hotkeys
    this.hotkeys.push(
      this.hotkeysService.add(new Hotkey(['command+s', 'ctrl+s'], (event: KeyboardEvent, combo: string): boolean => {
        console.log('Save');
        this.saveIfChanges();
        return false; // Prevent bubbling
      }))
    );
    this.hotkeys.push(
      this.hotkeysService.add(new Hotkey(['command+h', 'ctrl+h'], (event: KeyboardEvent, combo: string): boolean => {
        this.openHelp();
        return false; // Prevent bubbling
      }))
    );
    this.hotkeys.push(
      this.hotkeysService.add(new Hotkey(['command+g', 'ctrl+g'], (event: KeyboardEvent, combo: string): boolean => {
        this.openDebug();
        return false; // Prevent bubbling
      }))
    );
    this.hotkeys.push(
      this.hotkeysService.add(new Hotkey(['command+e', 'ctrl+e'], (event: KeyboardEvent, combo: string): boolean => {
        this.openEccairs(this.modalEccairsTemplate);
        return false; // Prevent bubbling
      }))
    );
    this.hotkeys.push(
      this.hotkeysService.add(new Hotkey(['command+b', 'ctrl+b'], (event: KeyboardEvent, combo: string): boolean => {
        this.openWorkflow();
        return false; // Prevent bubbling
      }))
    );

  }

  ngOnInit() {
    this.orsService.setActivity('modellfly');

    // Receive everything on Obsreg
    this.eventQueue.on(AppEventType.ObsregEvent).subscribe(event => this._handleEvent(event.payload));

    this.route.params.subscribe(params => {
      this.id = params['id'] ? params['id'] : 0;
      this.app.setTitle('OBSREG Editor #' + this.id);
      this.getData();

    }
    );
  }

  private _handleEvent(payload) {

    if (payload.hasOwnProperty('action')) {
      if (payload['action'] === 'force_save') {
        this.saveIfChanges();
      }
    }
  }

  /**
   * Make sure we remove hotkeys and
   * save any changes before unloading the component
   * @TODO: confirm dialogue
   */
  ngOnDestroy() {

    // this.route_sub.unsubscribe();

    this.hotkeysService.remove(this.hotkeys);
    //this.subject.observableObservation.take;

    //this.subject.unsubscribe();
    // this.saveIfChanges();
    this.subject_is_alive = false;
    console.log('DESTROYING SUBSCRIPTION');
    //this.subject.update(undefined);
  }

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    if (!this.changes || !this.observation.acl_user.w) {

      return true;
    }
    return false;
  }


  paths(obj, parentKey) {
    let result;
    if (_.isArray(obj)) {
      var idx = 0;
      result = _.flatMap(obj, function (obj) {
        return this.paths(obj, (parentKey || '') + '[' + idx++ + ']');
      });
    }
    else if (_.isPlainObject(obj)) {
      result = _.flatMap(_.keys(obj), function (key) {
        return _.map(this.paths(obj[key], key), function (subkey) {
          return (parentKey ? parentKey + '.' : '') + subkey;
        });
      });
    }
    else {
      result = [];
    }
    return _.concat(result, parentKey || []);
  }

  public update(event) {
    console.log('EDITOR Update', this.changes, event);
    this.subject.update(this.observation);
  }

  public getDiff() {
    return detailedDiff(this.shadow, this.observation);
  }

  /**
  Checks if new object is different!
  **/
  private changed() {
    // console.log('Changed: ', data);
    if (!!this.shadow) {
      if (!isEqual(this.observation, this.shadow)) {
        this.changes = true;

        //this.shadow = clone(this.observation);
      } else {
        this.changes = false;
      }
    } else {
      this.changes = false;
    }
  }

  handleKey(event) {
    console.log(event);
  }

  saveIfChanges() {
    this.changed();
    if (this.changes && this.observation.acl_user.w) {
      this.save();
    }
  }

  private save() {

    let tmp = { ...this.observation };
    const tmp_id = this.observation._id;
    const tmp_etag = this.observation._etag;
    // if (!!tmp._id) { delete tmp._id; }
    if (!!tmp._links) { delete tmp._links; }
    if (!!tmp._created) { delete tmp._created; }
    if (!!tmp._etag) { delete tmp._etag; }
    if (!!tmp._latest_version) { delete tmp._latest_version; }
    if (!!tmp._updated) { delete tmp._updated; }
    if (!!tmp._version) { delete tmp._version; }
    if (!!tmp._model) { delete tmp._model; }
    if (!!tmp.id) { delete tmp.id; }
    // if (!!tmp.audit) { delete tmp.audit; }
    if (!!tmp.reporter) { delete tmp.reporter; }
    if (!!tmp.club) { delete tmp.club; }
    if (!!tmp.discipline) { delete tmp.discipline; }
    if (!!tmp.owner) { delete tmp.owner; }
    if (!!tmp.acl) { delete tmp.acl; }
    if (!!tmp.acl_user) { delete tmp.acl_user; }
    if (!!tmp.workflow) { try { delete tmp.workflow; } catch (e) { } }
    // if (!!tmp._meta) { delete tmp._meta; }

    this.orsService.save(tmp_id, tmp, tmp_etag).subscribe(
      data => {
        this.observation._etag = data._etag;
        this.observation._updated = data._updated;
        this.observation._version = data._version;
        this.observation._latest_version = data._latest_version;

        // Deep clone
        this.shadow = cloneDeep(this.observation);
        this.changes = false;

      },
      err => {
        console.log(err);
        this.alertService.error('En feil oppstod under lagring: ' + JSON.stringify(err));
      }
    );
  }

  /**
    ngDoCheck() {
      if (this.dataReady) {
        const change = this.differ.diff(this.observation);
        if (change) {
          console.log('Changes:');
          console.log(change);
          change.forEachChangedItem(r => console.log('changed ', r.currentValue));
          change.forEachAddedItem(r => console.log('added ' + r.currentValue));
          change.forEachRemovedItem(r => console.log('removed ' + r.currentValue));

          // Need to let first change pass as it's init
          if (this.initialized) {
            this.changes = true;
          } else {
            this.initialized = true;
          }
        }
      } else {
        // const change = this.differ.diff(this.observation);
        this.changes = false;
      }

    }
   */


  public getData(updateField: string = 'all') {
    console.log('Getting data');
    this.dataReady = false;

    this.orsService.get(this.id).subscribe(
      data => {

        if (updateField === 'all') {
          this.subject.reset();
          this.observation = data;
        } else {
          if (this.observation.hasOwnProperty(updateField)) {
            this.observation[updateField] = data[updateField];
          }
        }
        this.subject.update(this.observation);
        // Make some defaults:
        if (typeof this.observation.rating === 'undefined') {
          this.observation.rating = { actual: 1, potential: 1 };
        }

        // Deep clone
        this.shadow = cloneDeep(this.observation);
        this.changes = false;

        //if (this.observation._created === this.observation._updated) {
        //  this.alertService.success('Suksess! Du opprettet akkurat en ny observasjon og den fikk løpenummer #' + this.observation.id, false, true, 60);
        //}


      },
      err => {
        this.error = err;
        this.dataReady = true;
        this.alertService.error(err.message);
      },
      () => {
        this.dataReady = true;
      }
    );
  }

  openActivities(template) {
    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }

  closeActivities() {
    this.modalRef.close();
  }

  openDiff(template) {
    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }

  closeDiff() {
    this.modalRef.close();
  }

  openHelp() {
    this.modalRef = this.modalService.open(NlfOrsEditorHelpComponent, { size: 'lg' });
  }
  openAbout() {
    this.modalRef = this.modalService.open(NlfOrsEditorAboutComponent, { size: 'lg' });
  }

  openDebug() {
    this.modalRef = this.modalService.open(NlfOrsEditorDebugComponent, { size: 'lg' });
  }

  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }

  openPreview(template: TemplateRef<any>, what: string, title: string) {
    this.preview = { what: what, title: title };
    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }

  openEccairs(template) {
    this.eccairsModalOpen = true;

    if (!this.observation.hasOwnProperty('eccairs2') || _.isEmpty(this.observation?.eccairs2)) { // Create once!
      this.observation.eccairs2 = new E5XClass().occurrence;
      this.observation.eccairs2.attributes.responsibleEntity.value = 2133;

      this.observation.eccairs2.entities.reportingHistory = [new E5XReportingHistoryClass().reportingHistory];
      this.observation.eccairs2.entities.reportingHistory[0].attributes.reportingEntity = { value: 101311 };
      this.observation.eccairs2.entities.reportingHistory[0].attributes.reportIdentification.value = 'nlf_' + this.observation._model.type + '_' + + this.observation.id + '_v' + this.observation._version;
      this.observation.eccairs2.entities.reportingHistory[0].attributes.reportingFormType.value = 9823;
      this.observation.eccairs2.entities.reportingHistory[0].attributes.reportStatus.value = 2; // open

      this.observation.eccairs2.entities.aircraft = [new E5XAircraftClass().aircraft];
      this.observation.eccairs2.entities.aircraft[0].attributes.annex2ACType.value = [9]; // 
      this.observation.eccairs2.entities.aircraft[0].attributes.aircraftCategory.value = 6; // RPAS
      this.observation.eccairs2.entities.aircraft[0].attributes.massGroup.value = 1; // 0-2250kg
      this.observation.eccairs2.entities.aircraft[0].attributes.operator.value = 10003891; // 


    } else {
      this.observation.eccairs2 = { ...new E5XClass().occurrence, ...this.observation.eccairs2 };
      this.observation.eccairs2.attributes = { ...new E5XClass().occurrence.attributes, ...this.observation.eccairs2?.attributes };
      this.observation.eccairs2.attributes.responsibleEntity.value = 2133;
      this.observation.eccairs2.entities.reportingHistory = [{ ...new E5XReportingHistoryClass().reportingHistory, ...this.observation.eccairs2.entities.reportingHistory[0] }];
      this.observation.eccairs2.entities.reportingHistory[0].attributes.reportingEntity = { value: 101311 };

      this.observation.eccairs2.entities = { ...new E5XClass().occurrence.entities, ...this.observation.eccairs2?.entities };
      this.observation.eccairs2.entities.reportingHistory[0] = { ...new E5XReportingHistoryClass().reportingHistory, ...this.observation.eccairs2.entities.reportingHistory[0] };
      this.observation.eccairs2.entities.reportingHistory[0].attributes = { ...new E5XReportingHistoryClass().reportingHistory.attributes, ...this.observation.eccairs2.entities.reportingHistory[0].attributes };
      this.observation.eccairs2.entities.reportingHistory[0].entities = { ...new E5XReportingHistoryClass().reportingHistory, ...this.observation.eccairs2.entities.reportingHistory[0].entities };
      this.observation.eccairs2.entities.riskAssessment = { ...new E5XRiskAssessmentClass().riskAssessment, ...this.observation.eccairs2.entities.riskAssessment };

      this.observation.eccairs2.entities.aircraft[0] = { ...new E5XAircraftClass().aircraft, ...this.observation.eccairs2.entities.aircraft[0] };
      this.observation.eccairs2.entities.aircraft[0].attributes = { ...new E5XAircraftClass().aircraft.attributes, ...this.observation.eccairs2.entities.aircraft[0].attributes };
      this.observation.eccairs2.entities.aircraft[0].entities = { ...new E5XAircraftClass().aircraft.entities, ...this.observation.eccairs2.entities.aircraft[0].entities };
      this.observation.eccairs2.entities.reportingHistory[0].attributes.reportIdentification.value = 'nlf_' + this.observation._model.type + '_' + + this.observation.id + '_v' + this.observation._version;

    }
    console.log('After spread', this.observation.eccairs2);
    // Always update!

    this.observation.eccairs2.attributes.headline = this.observation?.tags.join(' ') || this.observation?.title || '';

    // Times this.currentWhen.toISOString().substr(0,10)
    let t = new Date(this.observation.when);
    this.observation.eccairs2.attributes.utcDate.value = [t.getUTCFullYear(), pad(t.getUTCMonth() + 1), pad(t.getUTCDate())].join('-');
    this.observation.eccairs2.attributes.utcTime.value = [pad(t.getUTCHours()), pad(t.getUTCMinutes()), pad(t.getUTCSeconds())].join(':');
    this.observation.eccairs2.attributes.localDate.value = [t.getFullYear(), pad(t.getMonth() + 1), pad(t.getDate())].join('-');
    this.observation.eccairs2.attributes.localTime.value = [pad(t.getHours()), pad(t.getMinutes()), pad(t.getSeconds())].join(':');

    this.observation.eccairs2.attributes.longitudeOfOcc.value = this.observation.location.geo.coordinates[1] || undefined;
    this.observation.eccairs2.attributes.latitudeOfOcc.value = this.observation.location.geo.coordinates[0] || undefined;

    this.observation.eccairs2.entities.reportingHistory[0].attributes.reporterSDescription = this.observation.description;



    //state of occ
    try {
      this.observation.eccairs2.attributes.locationName.value = this.observation.location.name || '';
      const options: ApiOptionsInterface = {
        query: {
          where: {
            type: 'county',
            geometry: {
              $geoIntersects: {
                $geometry: {
                  type: "Point",
                  coordinates: [
                    this.observation.eccairs2.attributes.longitudeOfOcc.value,
                    this.observation.eccairs2.attributes.latitudeOfOcc.value
                  ]
                }
              }
            }
          },
          projection: { e5x: 1 }
        }
      }
      this.geoAdminService.get(options).subscribe(
        data => {
          if (data._items.length == 1) {
            console.log('UPDATE AREA', data._items[0].e5x);
            this.observation.eccairs2.attributes.stateAreaOfOcc.value = data._items[0].e5x;
          } else {
            this.observation.eccairs2.attributes.stateAreaOfOcc.value = '';
          }
        },
        err => {
          this.observation.eccairs2.attributes.stateAreaOfOcc.value = '';
        },
        () => { }
      );
    }
    catch { }



    if (!!this.observation.actions) {
      let lokale = '';
      let sentrale = '';
      if (this.observation.actions.local.length > 0) {
        '\nLokale:\n' + this.observation.actions.local.join('\n');
      }
      if (this.observation.actions.central.length > 0) {
        '\nSentrale:\n' + this.observation.actions.central.join('\n');
      }
      //'Lokale:\n' + this.observation.actions.local.join('\n') + '\n\nSentrale\n' + this.observation.actions.central.join('\n');

      this.observation.eccairs2.entities.reportingHistory[0].attributes.correctiveActions.plainText = lokale || 'Ingen' + sentrale || 'Ingen';

      //{...object1, ...object2} -> 

    }

    this.modalRef = this.modalService.open(template, { size: 'xl', fullscreen: 'xl' });
  }

  closeEccairs2() {
    this.eccairsModalOpen = false;
    this.modalRef.close();
    this.observation.eccairs2 = this.cleanObject(this.observation.eccairs2);
    this.subject.update(this.observation);
    this.saveIfChanges();
  }

  openDebugModal(template: TemplateRef<any>) {
    this.openModal(template);

  }

  openWorkflow() {

    this.saveIfChanges();

    this.workflowRef = this.modalService.open(NlfOrsEditorWorkflowComponent, { size: 'lg' });
    // When .clos() is called, not on .dismiss()
    this.workflowRef.result.then(
      closed => {
        this.getData();
      },
      err => console.log(err)
    );
  }

  getJsonFile() {

    return this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.observation, null, 2)));
  }

  cleanObject(obj) {
    let that = this;
    Object.keys(obj).forEach(function (key) {
      // Get this value and its type
      let value = obj[key];
      const type = typeof value;
      if (type === "object") {

        if (value.hasOwnProperty('unit')) {
          if (value.hasOwnProperty('value')) {
            if (value['value'] === 'NaN' || value['value'] === '' || typeof value['value'] === 'undefined') {
              delete obj[key];
            }

          } else if (!value.hasOwnProperty('value')) {
            delete obj[key];
          }
        } else if (value.hasOwnProperty('value')) {
          if (value['value'] === 'NaN' || value['value'] === '' || typeof value['value'] === 'undefined') {
            delete obj[key];
          }
        } else if (value.hasOwnProperty('plainText')) {
          if (value['plainText'] === 'NaN' || value['plainText'] === '' || typeof value['plainText'] === 'undefined') {
            delete obj[key];
          }
        } else if (!value.hasOwnProperty('value') && !value.hasOwnProperty('plainText') && !value.hasOwnProperty('additionalText')) {
          if (value.hasOwnProperty('additionalTextEncoding') || value.hasOwnProperty('textEncoding')) {
            delete obj[key];
          } else {
            that.cleanObject(value);
          }
        } else {
          // Recurse...
          that.cleanObject(value);
        }

        // ...and remove if now "empty" (NOTE: insert your definition of "empty" here)
        if (!Object.keys(value).length) {
          delete obj[key]
        }
      }
      else if (type === "undefined") {
        // Undefined, remove it
        delete obj[key];
      }
      else if (["string", "number", "bigint", "boolean", "symbol", "function"].indexOf(type) < 0 && obj[key].length === 0) {
        console.log('array');
        delete obj[key];
      }
    });

    return obj;
  }





}
