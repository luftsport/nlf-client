import { ApiObservationModellflyInvolvedInterface, ApiObservationsModel } from 'app/api/api.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nlf-ors-modellfly-report-involved',
  templateUrl: './report-involved.component.html',
  styleUrls: ['./report-involved.component.css']
})
export class NlfOrsModellflyReportInvolvedComponent implements OnInit {

  @Input() involved: ApiObservationModellflyInvolvedInterface;
  @Input() model: ApiObservationsModel;
  @Input() verbose = true;

  constructor() { }

  ngOnInit() {
  }

}
