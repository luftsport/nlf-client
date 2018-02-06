import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiObservationAskInterface, ApiObservationsItem } from '../../../api/api.interface';

// import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';
// import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { ApiOptionsInterface, ApiObservationOrganizationInterface } from '../../../api/api.interface';
import { NlfOrsEditorInvolvedService } from './../ors-editor-involved.service';
import { NlfOrsEditorService } from '../ors-editor.service';


@Component({
  selector: 'nlf-ors-editor-ask',
  templateUrl: './ors-editor-ask.component.html',
  styleUrls: ['./ors-editor-ask.component.css']
})
export class NlfOrsEditorAskComponent implements OnInit {

  verbose = true;
  mconf = { triggerChar: '@', maxItems: 10, labelKey: 'fullname', mentionSelect: this.format };

  list; // mentions list
  observation: ApiObservationsItem;

  constructor(private http: HttpClient,
              private data: NlfOrsEditorInvolvedService,
              private subject: NlfOrsEditorService) {

                this.data.currentArr.subscribe(list => this.list = list); // Involved list
                this.subject.observableObservation.subscribe(observation => this.observation = observation); // Observation
              }

  ngOnInit() {
    /**
    this.httpItems = this.searchTermStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((term: string) => this.getItems(term));
      **/
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

  search(event) {
    console.log('search');
    console.log(event);
  }

  format(event) {
    console.log(event);
    return '<macro contenteditable="false" class="badge badge-info" id="' + event.id + '">' + event.fullname + '</macro>';
  }

  textChange() {
    this.subject.update(this.observation);
    console.log('Changed text ask');
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

  /**
* @TODO: move out in membershipservice

  public requestAutocompleteItems = (text: string): Observable<any> => {
    const url = `/api/v1/melwin/users/search?q=${text}`;
    return this.http
      .get(url)
      .pipe(map(data => data['_items']));
  }
*/
  searchAsync(term: string) {
    // this.searchTermStream.next(term);
  }

  /**
  getItems(term): Promise<any[]> {
    console.log('getItems:', term);
    // return this.http.get('api/names') // get all names
    return this.http.get(`/api/v1/melwin/users/search?q=${term}`) // get filtered names
    //.pipe(map(data => data['_items']));
    .toPromise()
    .then(data => {console.log(data); return data['_items'];})
    .catch(this.handleError);
  }
  handleError(e) {
    console.log(e);
  }
 */
}
