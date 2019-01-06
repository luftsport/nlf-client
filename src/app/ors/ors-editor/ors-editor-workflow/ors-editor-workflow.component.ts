import { Component, OnInit } from '@angular/core';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiObservationsItem } from 'app/api/api.interface';
import { ApiObservationsWorkflowService } from 'app/api/api-observations-workflow.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'nlf-ors-editor-workflow',
  templateUrl: './ors-editor-workflow.component.html',
  styleUrls: ['./ors-editor-workflow.component.css']
})
export class NlfOrsEditorWorkflowComponent implements OnInit {

  observation: ApiObservationsItem;
  comment = '';

  workflow;
  dataReady = false;

  constructor(private subject: NlfOrsEditorService,
    private apiWorkflow: ApiObservationsWorkflowService,
    private router: Router,
    private route: ActivatedRoute) {

    this.subject.observableObservation.subscribe(observation => this.observation = observation);
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const id = params['id'] ? params['id'] : 0;
      // If direct link and not observation or different id!
      if (+this.observation.id === 0 || +this.observation.id !== +id) {
        console.log(this.observation);
        console.log(id);
        this.router.navigate(['/ors/fallskjerm/edit/', id]);

      } else {

        this.apiWorkflow.getWorkflowState(this.observation._id).subscribe(
          data => {
            this.workflow = data;
          },
          err => console.log(err),
          () => this.dataReady = true
        );
      }

    });
  }

  workflowChange(action: string) {
    this.dataReady = false;
    this.apiWorkflow.changeWorkflowState(this.observation._id, action, this.comment).subscribe(
      resp => {
        console.log(resp);
        // this.subject.update(this.observation);
      },
      err => {
        console.log(err);
        this.dataReady = true;
      },
      () => this.router.navigate(['/ors/fallskjerm/edit/' + this.observation.id])
    );

  }

  cancel() {
    this.router.navigate(['/ors/fallskjerm/edit/' + this.observation.id]);
  }

  onChange(event): void {

    this.subject.update(this.observation);
  }
}
