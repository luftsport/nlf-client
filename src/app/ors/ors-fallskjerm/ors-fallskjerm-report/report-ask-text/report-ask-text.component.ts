import { ApiObservationAskTextInterface } from './../../../../api/api.interface';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'nlf-ors-fallskjerm-report-ask-text',
  templateUrl: './report-ask-text.component.html',
  styleUrls: ['./report-ask-text.component.css']
})
export class NlfOrsFallskjermReportAskTextComponent implements OnInit {

  @Input() comments: ApiObservationAskTextInterface;
  constructor(public domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
