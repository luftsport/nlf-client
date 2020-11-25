import { ApiObservationsItem } from 'app/api/api.interface';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { NlfComponent } from 'app/nlf.component';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from 'app/services/confirm/confirm.service';
import { NlfOrsEditorHelpComponent } from 'app/ors/ors-editor/ors-editor-help/ors-editor-help.component';
import { NlfOrsEditorAboutComponent } from 'app/ors/ors-editor/ors-editor-about/ors-editor-about.component';
import { NlfOrsEditorDebugComponent } from 'app/ors/ors-editor/ors-editor-debug/ors-editor-debug.component';
import { NlfOrsEditorWorkflowComponent } from 'app/ors/ors-editor/ors-editor-workflow/ors-editor-workflow.component';
import { DomSanitizer } from '@angular/platform-browser';
import { cleanE5XObject, deepCopy, pad } from 'app/interfaces/functions';
import { isEqual, cloneDeep } from 'lodash'
import { environment } from 'environments/environment';

@Component({
  selector: 'nlf-ors-motor-editor',
  templateUrl: './ors-motor-editor.component.html',
  styleUrls: ['./ors-motor-editor.component.css']
})
export class NlfOrsMotorEditorComponent implements OnInit, OnDestroy {

  public ENV = environment;

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

  shadow;
  // Generated
  e5xobservation;

  route_sub;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orsService: ApiObservationsService,
    private alertService: NlfAlertService,
    private subject: NlfOrsEditorService,
    private app: NlfComponent,
    private hotkeysService: HotkeysService,
    private modalService: NgbModal,
    private confirmService: ConfirmService,
    private sanitizer: DomSanitizer
    // private differs: KeyValueDiffers
  ) {

    // Instantiate diff checking:
    // this.differ = this.differs.find({}).create();

    // Instantiate our behavioursubject
    this.subject.observableObservation.subscribe(
      observation => {
        this.observation = observation;

        // Check if reset
        if (this.observation.id === 0) {
          this.dataReady = false;
          this.shadow = undefined;
        } else {
          this.changed();
        }
      },
      err => console.log(err),
      () => { }

    );

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
  }


  ngOnInit() {

    this.orsService.setActivity('motorfly');

    // Save on exit
    this.route_sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.saveIfChanges();
        this.route_sub.unsubscribe();
      }
    });

    this.route.params.subscribe(params => {
      this.id = params['id'] ? params['id'] : 0;
      this.app.setTitle('OBSREG Editor #' + this.id);
      this.getData();
    });
  }


  hasFlag() {

    for(let key of Object.keys(this.observation.flags)) {
      if (this.observation.flags[key]) {
        return true;
      }
    }
    return false;
  }
  /**
   * Make sure we remove hotkeys and
   * save any changes before unloading the component
   * @TODO: confirm dialogue
   */
  ngOnDestroy() {

    this.route_sub.unsubscribe();

    this.hotkeysService.remove(this.hotkeys);

    this.saveIfChanges();

    //this.subject.update(undefined);
  }

  public update() {
    console.log('EDITOR Update', this.changes);
    this.subject.update(this.observation);
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
  public getData() {
    console.log('Getting data');
    this.dataReady = false;

    this.orsService.get(this.id).subscribe(
      data => {

        this.observation = data;
        this.subject.update(this.observation);
        // Make some defaults:
        if (typeof this.observation.rating === 'undefined') {
          this.observation.rating = { actual: 1, potential: 1 };
        }

        // Deep clone
        this.shadow = cloneDeep(this.observation);
        this.changes = false;

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

  openHelp() {
    this.modalRef = this.modalService.open(NlfOrsEditorHelpComponent, { size: 'lg' });
  }
  openAbout() {
    this.modalRef = this.modalService.open(NlfOrsEditorAboutComponent, { size: 'lg' });
  }
  openDebug() {
    this.modalRef = this.modalService.open(NlfOrsEditorDebugComponent, { size: 'lg' });
  }

  openVersions(template: TemplateRef<any>) {
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {

    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }

  openPreview(template: TemplateRef<any>, what: string, title: string) {
    this.preview = { what: what, title: title };
    this.modalRef = this.modalService.open(template, { size: 'lg' });
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

  /**
  * @TODO move to e5x
  **/
  getJsonFile() {

    return this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.e5xobservation, null, 2)));
  }

}
