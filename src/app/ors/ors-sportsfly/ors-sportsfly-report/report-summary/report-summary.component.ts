import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiObservationsSportsflyItem } from 'app/api/api.interface';

@Component({
  selector: 'nlf-ors-sportsfly-report-summary',
  templateUrl: './report-summary.component.html',
  styleUrls: ['./report-summary.component.css']
})
export class NlfOrsSportsflyReportSummaryComponent implements OnInit {

  @Input() observation: ApiObservationsSportsflyItem;

  turnaround: string;
  numberOfInvolved = 0;

  constructor() { }

  ngOnInit() {

    if (!!this.observation.involved && this.observation.involved instanceof Array) {
      this.numberOfInvolved = this.observation.involved.length;
    }

    if (!!this.observation.workflow.last_transition) {
      if (this.observation.workflow.state === 'closed') {
        this.turnaround = moment.duration(+moment(this.observation.workflow.last_transition) - +moment(this.observation._created)).humanize();
      }
      else {
        this.turnaround = moment.duration(+moment() - +moment(this.observation._created)).humanize();
      }
    }
  }

}
