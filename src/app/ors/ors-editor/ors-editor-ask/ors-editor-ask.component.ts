import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { ApiObservationsItem } from '../../../api/api.interface';

// import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';
// import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


import { NlfOrsEditorService } from '../ors-editor.service';
import { NLF_CONFIG, NlfConfig } from './../../../nlf-config.module';


@Component({
  selector: 'nlf-ors-editor-ask',
  templateUrl: './ors-editor-ask.component.html',
  styleUrls: ['./ors-editor-ask.component.css']
})
export class NlfOrsEditorAskComponent implements OnInit {

  verbose = true;
  observation: ApiObservationsItem;

  constructor(private subject: NlfOrsEditorService,
              @Inject(NLF_CONFIG) public config: NlfConfig) {
                this.subject.observableObservation.subscribe(observation => this.observation = observation); // Observation
              }

  ngOnInit() {

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
