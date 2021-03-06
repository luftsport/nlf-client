import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiObservationsItem, ApiWorkflowPayloadInterface } from 'app/api/api.interface';
import { ApiObservationsWorkflowService } from 'app/api/api-observations-workflow.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NlfAlertService } from 'app/services/alert/alert.service';

@Component({
  selector: 'nlf-ors-editor-workflow',
  templateUrl: './ors-editor-workflow.component.html',
  styleUrls: ['./ors-editor-workflow.component.css']
})
export class NlfOrsEditorWorkflowComponent implements OnInit {

  observation: ApiObservationsItem;
  processing = false;
  public payload: ApiWorkflowPayloadInterface = {comment: ''};
  workflow;
  dataReady = false;
  graph;

  constructor(
    private subject: NlfOrsEditorService,
    private apiWorkflow: ApiObservationsWorkflowService,
    private router: Router,
    private route: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    public activeModal: NgbActiveModal,
    private alertService: NlfAlertService) { }

  ngOnInit() {

    this.subject.observableObservation.subscribe(observation => {
      this.observation = observation;

      if(this.observation._model.type==='motorfly' && this.observation._model.version>=3) {
        if(this.observation.workflow.state === 'draft') {
          this.payload['do_not_process_in_club'] = this.observation.workflow.settings.do_not_process_in_club;
        }

        if(this.observation.workflow.state === 'pending_review_ors') {
          this.payload['do_not_publish'] = this.observation.workflow.settings.do_not_publish;
        }
      }

      this.apiWorkflow.setActivity(observation._model.type);

      this.apiWorkflow.getWorkflowState(this.observation._id).subscribe(
        data => {
          this.workflow = data;
          this.dataReady = true;
        },
        err => console.log(err),
        () => {}
      );
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
        this.alertService.success(text + ' for ORS #' + this.observation.id + ' gjennomført', true, true, 10);
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

  onChange(event): void {
    this.subject.update(this.observation);
  }

  getGraph() {
    this.apiWorkflow.getGraph(this.observation._id, this.observation.workflow.state).subscribe(
      data => this.graph = 'data:image/png;base64,' + data.graph
    );
  }
}
