import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { ApiObservationsItem, NlfConfigItem } from 'app/api/api.interface';

// import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';
// import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


import { NlfOrsEditorService } from '../ors-editor.service';
import {  NlfConfigService } from 'app/nlf-config.service';


@Component({
  selector: 'nlf-ors-editor-ask',
  templateUrl: './ors-editor-ask.component.html',
  styleUrls: ['./ors-editor-ask.component.css']
})
export class NlfOrsEditorAskComponent implements OnInit {

  verbose = true;
  observation: ApiObservationsItem;
  public config: NlfConfigItem;

  constructor(
    private subject: NlfOrsEditorService,
    private configService: NlfConfigService) {

    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
      }
    );

    this.subject.observableObservation.subscribe(
      observation => {
        this.observation = observation; // Observation
      });
  }

  ngOnInit() {

  }

  private get(p, o) {
    return p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : {}, o);
  }


  isPositive(what) {
    if (!this.observation.ask) { return false; }
    return (this.observation.ask[what] > 0);
  }
  isNegative(what) {
    if (!this.observation.ask) { return false; }
    return (this.observation.ask[what] < 0);
  }
  isNeutral(what) {
    if (!this.observation.ask) { return true; }
    return (this.observation.ask[what] === 0);
  }



  flip(what) {

    if (typeof this.observation.ask[what] === 'undefined' || this.observation.ask[what] === 0) {
      this.observation.ask[what] = -1;

    } else if (this.observation.ask[what] > 0) {
      this.observation.ask[what] = 0;

    } else if (this.observation.ask[what] < 0) {
      this.observation.ask[what] = 1;

    }

    this.subject.update(this.observation);
  }

}
