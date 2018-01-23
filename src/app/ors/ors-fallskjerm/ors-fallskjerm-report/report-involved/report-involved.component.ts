import { ApiObservationInvolvedInterface } from './../../../../api/api.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nlf-ors-fallskjerm-report-involved',
  templateUrl: './report-involved.component.html',
  styleUrls: ['./report-involved.component.css']
})
export class NlfOrsFallskjermReportInvolvedComponent implements OnInit {

  @Input() involved: ApiObservationInvolvedInterface;
  @Input() verbose = true;

  constructor() { }

  ngOnInit() {
  }

}
