import { ApiWorkflowInterface } from 'app/api/api.interface';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiObservationsWorkflowService } from 'app/api/api-observations-workflow.service';

@Component({
  selector: 'nlf-ors-report-workflow-timeline',
  templateUrl: './report-workflow-timeline.component.html',
  styleUrls: ['./report-workflow-timeline.component.css']
})
export class NlfOrsReportWorkflowTimelineComponent implements OnInit {
  
  @Input() workflow: ApiWorkflowInterface;
  @Input() activity: string;
  @Input() _id?: string;
  @Input() vlink?: boolean;


  public workflowActions;
  
  /**= {
    init: 'Opprettet',
    send_to_hi: 'Sendt til HI',
    approve_hi: 'Godkjent av HI',
    reject_hi: 'Avslått av HI',
    approve_fs: 'Godkjent av fagsjef',
    reject_fs: 'Avslått av Fagsjef',
    approve_su: 'Godkjent av SU',
    reject_su: 'Avslått av SU',
    withdraw: 'Trekt tilbake',
    reopen: 'Gjenåpnet',
    reopen_su: 'Gjenåpnet av SU'
  };
   */


  public workflowColors = {
    init: 'b-primary',
    send_to_hi: 'b-success',
    approve_hi: 'b-success',
    reject_hi: 'b-danger',
    approve_fs: 'b-success',
    reject_fs: 'b-danger',
    approve_su: 'b-success',
    reject_su: 'b-danger',
    withdraw: 'b-dark',
    reopen: 'b-warning',
    reopen_su: 'b-warning'
  };


  constructor(private apiWorkflow: ApiObservationsWorkflowService) { }

  ngOnInit() {

    this.apiWorkflow.setActivity(this.activity);
    this.apiWorkflow.getMapping(this._id).subscribe(
      data => {
        this.workflowActions = data;
      },
      err => console.log(err),
      () => { }
    );

    if (!this.vlink) {
      this.vlink = true;
    }
  }

}
