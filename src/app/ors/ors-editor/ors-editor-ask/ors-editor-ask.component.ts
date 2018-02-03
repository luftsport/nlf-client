import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ApiObservationAskInterface } from '../../../api/api.interface';

// import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';
// import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { ApiOptionsInterface, ApiObservationOrganizationInterface } from '../../../api/api.interface';
import { NlfOrsEditorService } from './../ors-editor.service';

@Component({
  selector: 'nlf-ors-editor-ask',
  templateUrl: './ors-editor-ask.component.html',
  styleUrls: ['./ors-editor-ask.component.css']
})
export class NlfOrsEditorAskComponent implements OnInit {

  @Input() ask;
  @Input() state;
  @Input() involved?;
  @Output() askChange: EventEmitter<ApiObservationAskInterface> = new EventEmitter<ApiObservationAskInterface>();

  verbose = true;



  // @TODO move to NlfConfig
  askValues = [
    { key: 'knowledge', label: 'Kunnskaper', nick: 'K' },
    { key: 'skills', label: 'Ferdigheter', nick: 'F' },
    { key: 'attitude', label: 'Holdninger', nick: 'H' }
  ];

  items_multi: string[] | any = {
    '@': [{ name: 'Einar Huseby', id: 45199 },
    { name: 'Knut Asgeir Lien', id: 6777 },
    { name: 'Håkon Søgnen', id: 6777 },
    { name: 'Jan Wang', id: 5766 }],
    '#': [{ id: 566, name: 'Reservetrekk' }, { id: 77, name: 'Falt ned skrent' }]
  };

  items = [{ fullname: 'Einar Huseby', id: 45199 },
  { fullname: 'Håkon Søgnen', id: 6777 },
  { fullname: 'Knut Asgeir Lien', id: 6777 },
  { fullname: 'Jan Wang', id: 5766 }];
  mconf = { triggerChar: '@', maxItems: 10, labelKey: 'fullname', mentionSelect: this.format };

  // httpItems: Observable<any[]>;
  // private searchTermStream = new Subject();

  list; // : Object;
  obs;

  constructor(private http: HttpClient,
              private data: NlfOrsEditorService) { 
                this.data.currentArr.subscribe(list => this.list = list);
                this.data.currentList.subscribe(obs => this.obs = obs);
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
    if (!this.ask) { return false; }
    return (this.ask[what] > 0);
  }
  isNegative(what) {
    if (!this.ask) { return false; }
    return (this.ask[what] < 0);
  }
  isNeutral(what) {
    if (!this.ask) { return true; }
    return (this.ask[what] === 0);
  }

  search(event) {
    console.log('search');
    console.log(event);
  }

  format(event) {
    console.log(event);
    return '<macro contenteditable="false" class="badge badge-info" id="' + event.id + '">' + event.fullname + '</macro>';
  }

  flip(what) {

    if (typeof this.ask[what] === 'undefined' || this.ask[what] === 0) {
      this.ask[what] = -1;

    } else if (this.ask[what] > 0) {
      this.ask[what] = 0;

    } else if (this.ask[what] < 0) {
      this.ask[what] = 1;

    }

    this.askChange.emit(this.ask);
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
