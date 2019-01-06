import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { ApiObservationAskInterface } from 'app/api/api.interface';


@Component({
  selector: 'nlf-ors-fallskjerm-report-ask',
  templateUrl: './report-ask.component.html',
  styleUrls: ['./report-ask.component.css']
})
export class NlfOrsFallskjermReportAskComponent implements OnInit {

  @Input() ask: ApiObservationAskInterface;
  @Input() verbose: boolean;

  askValues = [
    { key: 'knowledge', label: 'Kunnskaper', nick: 'K' },
    { key: 'skills', label: 'Ferdigheter', nick: 'F' },
    { key: 'attitude', label: 'Holdninger', nick: 'H' }
  ];

  constructor() { }

  ngOnInit() {
    if (typeof this.ask === 'undefined') {
      this.ask = {'attitude': 0, 'skills': 0, 'knowledge': 0, 'text': {}};
    }
  }



  isPositive(what) {
    if (!this.ask) { return false; }
    return (+this.ask[what] > 0);
  }

  isNegative(what) {
    if (!this.ask) { return false; }
    return (+this.ask[what] < 0);
  }

  isNeutral(what) {
    if (!this.ask) { return true; }
    return (+this.ask[what] === 0);
  }

}
