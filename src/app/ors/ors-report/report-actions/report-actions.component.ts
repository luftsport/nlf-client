import { Component, Input, OnInit } from '@angular/core';
import { ApiObservationActionsInterface } from 'app/api/api.interface';

@Component({
  selector: 'nlf-ors-fallskjerm-report-actions',
  templateUrl: './report-actions.component.html',
  styleUrls: ['./report-actions.component.css']
})
export class NlfOrsFallskjermReportActionsComponent implements OnInit {

  @Input() actions: ApiObservationActionsInterface;
  constructor() { }

  ngOnInit() {
  }

}
