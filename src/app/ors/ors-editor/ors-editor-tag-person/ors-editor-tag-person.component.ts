import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiTagsService } from 'app/api/api-tags.service';
import { LungoPersonsService } from 'app/api/lungo-persons.service';
import { ApiOptionsInterface, ApiTagList, ApiTagItem } from 'app/api/api.interface';
import { LungoPersonsSearchItem, LungoPersonsSearchList } from 'app/api/lungo.interface';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, map } from 'rxjs/operators';
import { Subject, Observable, of, concat } from 'rxjs';
import { titleCase } from 'app/interfaces/functions';

/**
Groups of tags activity: fallskjerm:

"observation",
"jumptype",
"aadType",
"where-at",
"component",
"maincanopies",
"reserveCanopies",
"harnessTypes",
"otherEquipment",
"what",
"component.what.incident",
"component.what.cause",
"component.what.consequence",
"aircraftTypes"

 */
@Component({
  selector: 'nlf-ors-editor-tag-person',
  templateUrl: './ors-editor-tag-person.component.html',
  styleUrls: ['./ors-editor-tag-person.component.css']
})
export class NlfOrsEditorTagPersonComponent implements OnInit {


  // Async Items
  tags$: Observable<LungoPersonsSearchItem[]> | LungoPersonsSearchItem[];
  tagsLoading = false;
  tagsInput$ = new Subject<string>();
  selectedTags: LungoPersonsSearchItem; // = any;
  limit = 1;
  currentId: string;

  _person: {id: number; tmp_name?: string; full_name?: string; };

  @Input() set person(value: {id: number; tmp_name?: string; full_name?: string; }) {
    console.log('GOT new value', value);
    this._person = value;
    this.initTags();
  }
  get person(): {id: number; tmp_name?: string; full_name?: string; } {
    return this._person;
  }
  @Input() tempName: string = null;
  @Input() activity: string;
  @Input() group: string;
  @Input() elementId: string = 'some_id';
  @Input() details = false;
  @Input() disabled = false;
  @Input() allowAdd = true;
  @Input() fc = false;
  @Output() personChange: EventEmitter<{ id: number; tmp_name?: string; full_name?: string; }> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();


  constructor(
    private personService: LungoPersonsService
  ) {
    // this.tags$ = [];
  }

  ngOnInit() {
    //this.initTags();
    this.searchTags();
  }

  private initTags() {
    if (!this._person) {
      this._person = undefined;
      this.selectedTags = undefined;
    } else if (!!this._person && !!this._person.hasOwnProperty('id') && this._person.id > 0) {

      this.personService.getUser(this._person.id).subscribe(
        data => {
          this.selectedTags = { id: this._person.id, full_name: data.full_name };
          this.selectedTags = {...this.selectedTags};
        }
      )

    } else if (!!this._person && !!this._person.hasOwnProperty('id') && this._person.id < 0) {

      if (!!this._person.tmp_name) {
        this.selectedTags = { id: this._person.id, full_name: this._person.tmp_name };
        this.selectedTags = {...this.selectedTags};
      }
    }

  }

  public onChange(event) {
    //this._person = undefined;
    if (typeof event === undefined) {
      this.selectedTags = undefined;
      this._person = undefined;
    } else if (!!event) {
      if (event.hasOwnProperty('tag')) {
        this._person = { id: event.tag };
      } else if (event.hasOwnProperty('id')) {
        this._person = { id: event.id };
      } else if (typeof event === 'string') {
        this._person = { id: -1 * Math.floor(Math.random() * 100000), tmp_name:  titleCase(event) };
      } else if (event.hasOwnProperty('full_name')) {
        this._person = { id: -1 * Math.floor(Math.random() * 100000), tmp_name: event.full_name };
      }
    } else {
      this._person = undefined;
    }

    this.selectedTags = event;

    this.personChange.emit(this._person);
    this.change.emit(event);
  }

  private searchTags() {
    let a: LungoPersonsSearchItem[];
    this.tags$ = concat(
      of([]), // default items
      this.tagsInput$.pipe(
        debounceTime(700),
        distinctUntilChanged(),
        tap(() => this.tagsLoading = true),
        switchMap(term => this.personService.search(term, this.activity).pipe(
          map((r) => a = r._items),
          catchError(() => of([])), // empty list on error
          tap(() => this.tagsLoading = false)
        ))
      )
    );
  }

}
