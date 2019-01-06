import { ApiObservationOrganizationInterface } from 'app/api/api.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nlf-ors-fallskjerm-report-organization',
  templateUrl: './report-organization.component.html',
  styleUrls: ['./report-organization.component.css']
})
export class NlfOrsFallskjermReportOrganizationComponent implements OnInit {

  @Input() organization: ApiObservationOrganizationInterface;
  constructor() { }

  ngOnInit() {
  }

}
