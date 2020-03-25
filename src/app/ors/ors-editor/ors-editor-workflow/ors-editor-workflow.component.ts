import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiObservationsItem } from 'app/api/api.interface';
import { ApiObservationsWorkflowService } from 'app/api/api-observations-workflow.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nlf-ors-editor-workflow',
  templateUrl: './ors-editor-workflow.component.html',
  styleUrls: ['./ors-editor-workflow.component.css']
})
export class NlfOrsEditorWorkflowComponent implements OnInit {

  observation: ApiObservationsItem;
  comment = '';
  processing = false;

  workflow;
  dataReady = false;
  graph;

  constructor(
    private subject: NlfOrsEditorService,
    private apiWorkflow: ApiObservationsWorkflowService,
    private router: Router,
    private route: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {

    this.subject.observableObservation.subscribe(observation => {
      this.observation = observation;
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

  workflowChange(action: string) {
    this.processing = true;

    this.apiWorkflow.changeWorkflowState(this.observation._id, action, this.comment).subscribe(
      resp => {
        console.log(resp);
        // this.subject.update(this.observation);
        this.activeModal.close();
      },
      err => {
        console.log(err);
        this.processing = false;
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
