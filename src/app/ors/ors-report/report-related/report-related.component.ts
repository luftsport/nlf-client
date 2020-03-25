import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nlf-ors-report-related',
  templateUrl: './report-related.component.html',
  styleUrls: ['./report-related.component.css']
})
export class NlfOrsReportRelatedComponent implements OnInit {

  @Input() related: number[];

  constructor() { }

  ngOnInit() {
  }

}
