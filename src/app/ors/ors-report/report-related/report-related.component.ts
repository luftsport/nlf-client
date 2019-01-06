import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nlf-ors-fallskjerm-report-related',
  templateUrl: './report-related.component.html',
  styleUrls: ['./report-related.component.css']
})
export class NlfOrsFallskjermReportRelatedComponent implements OnInit {

  @Input() related: number[];

  constructor() { }

  ngOnInit() {
  }

}
