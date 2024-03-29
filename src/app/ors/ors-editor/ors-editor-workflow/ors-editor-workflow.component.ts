import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { ApiObservationsItem, ApiWorkflowPayloadInterface } from 'app/api/api.interface';
import { ApiObservationsWorkflowService } from 'app/api/api-observations-workflow.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { faInfo, faInfoCircle, faComment, faRandom, faReply, faPaperPlane, faRepeat } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane as faPaperPlaneRegular } from '@fortawesome/free-regular-svg-icons';
import { has as _has } from 'lodash';

@Component({
  selector: 'nlf-ors-editor-workflow',
  templateUrl: './ors-editor-workflow.component.html',
  styleUrls: ['./ors-editor-workflow.component.css']
})
export class NlfOrsEditorWorkflowComponent implements OnInit {

  observation: ApiObservationsItem;
  processing = false;
  public payload: ApiWorkflowPayloadInterface = { comment: '' };
  workflow;
  dataReady = false;
  graph;
  showCommentInput = false;

  faInfo = faInfo;
  faInfoCircle = faInfoCircle;
  faComment = faComment;
  faRandom = faRandom;
  faReply = faReply;
  faPaperPlane = faPaperPlane;
  faRepeat = faRepeat;
  faPaperPlaneRegular = faPaperPlaneRegular;

  constructor(
    private subject: NlfOrsEditorService,
    private apiWorkflow: ApiObservationsWorkflowService,
    private router: Router,
    private route: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    public activeModal: NgbActiveModal,
    private alertService: NlfAlertService,
    private orsService: ApiObservationsService,
    ) { }

  ngOnInit() {

    this.subject.observableObservation.subscribe(observation => {
      this.observation = observation;

      if (_has(this.observation, '_id') && !!this.observation._id) {
        if (_has(this.observation, 'workflow.state') && this.observation.workflow.state === 'pending_review_ors') {
          this.showCommentInput = true;
        }

        if (_has(this.observation, '_model.type') && this.observation._model.type === 'motorfly' && this.observation._model.version >= 3) {
          if (this.observation.workflow.state === 'draft') {
            this.payload['do_not_process_in_club'] = this.observation.workflow.settings.do_not_process_in_club;
          }

          if (_has(this.observation, 'workflow.state') && this.observation.workflow.state === 'pending_review_ors') {
            this.payload['do_not_publish'] = this.observation.workflow.settings.do_not_publish;
          }
        }

        try {
          this.apiWorkflow.setActivity(observation._model.type);
        } catch (error) {
          console.error(error);
        }

        this.apiWorkflow.getWorkflowState(this.observation._id).subscribe(
          data => {
            this.workflow = data;
            this.dataReady = true;
          },
          err => console.log(err),
          () => { }
        );
      } else {
        this.dataReady = false;
      }
    }
    );
  }

  _save() {
    console.log('JIkes');
    this.orsService.save(this.observation._id, {reporter_role: this.observation.reporter_role}, this.observation._etag).subscribe(
      data => {
        this.observation._etag = data._etag;
        this.observation._updated = data._updated;
        this.observation._version = data._version;
        this.observation._latest_version = data._latest_version;
      },
      err => {
        console.log(err);
        this.alertService.error('En feil oppstod under lagring: ' + JSON.stringify(err));
      }
    );

  }


  workflowChange(action: string, text: string = '') {
    this.processing = true;

    this.apiWorkflow.changeWorkflowState(this.observation._id, action, this.payload).subscribe(
      resp => {
        console.log(resp);
        // this.subject.update(this.observation);
        this.activeModal.close();
        this.alertService.success(text + ' for OBSREG #' + this.observation.id + ' gjennomført', true, true, 10);
        this.router.navigate(['/ors', this.observation._model.type, 'report', this.observation.id]);

      },
      err => {
        console.log(err);
        this.processing = false;
        this.alertService.error('Det oppstod en feil under ' + text + ': ' + JSON.stringify(err), false, true, 10);
      },
      () => { }
    );

  }

  onChange(event, save?): void {
    this.subject.update(this.observation);
    if(save) {
     this._save();
    }
  }

  getGraph() {
    this.apiWorkflow.getGraph(this.observation._id, this.observation.workflow.state).subscribe(
      data => this.graph = 'data:image/png;base64,' + data.graph
    );
  }

  narrativeHasContent() {
    switch (this.observation._model.type) {
      case "motorfly":
      case "sportsfly":
      case "seilfly":
        return (
          (this.observation?.occurrence?.entities?.narrative?.length > 0 && this.observation?.occurrence?.entities?.narrative[0]?.attributes?.narrativeText?.plainText?.length > 0) ||
          (this.observation?.occurrence?.entities?.reportingHistory?.length > 0 && this.observation?.occurrence?.entities?.reportingHistory[0].attributes?.reporterSDescription?.plainText?.length > 0)
        );
      default:
        return true;
    }
  }
}
