import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiObservationsItem } from '../../../../api/api.interface';

@Component({
  selector: 'nlf-ors-fallskjerm-report-summary',
  templateUrl: './report-summary.component.html',
  styleUrls: ['./report-summary.component.css']
})
export class NlfOrsFallskjermReportSummaryComponent implements OnInit {

  @Input() observation: ApiObservationsItem;

  turnaround: string;

  constructor() { }

  ngOnInit() {
  
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
