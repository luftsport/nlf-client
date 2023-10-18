import { ApiObservationModellflyOrganizationInterface } from 'app/api/api.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nlf-ors-modellfly-report-organization',
  templateUrl: './report-organization.component.html',
  styleUrls: ['./report-organization.component.css']
})
export class NlfOrsModellflyReportOrganizationComponent implements OnInit {

  @Input() organization: ApiObservationModellflyOrganizationInterface;
  constructor() { }

  ngOnInit() {
  }

}
