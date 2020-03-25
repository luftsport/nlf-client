import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ApiTagsService } from 'app/api/api-tags.service';
import { LungoPersonsService } from 'app/api/lungo-persons.service';
import { ApiOptionsInterface, ApiTagList, ApiTagItem } from 'app/api/api.interface';
import { LungoPersonsSearchItem, LungoPersonsSearchList } from 'app/api/lungo.interface';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, map } from 'rxjs/operators';
import { Subject, Observable, of, concat } from 'rxjs';
import { titleCase } from 'app/interfaces/functions';

interface Person {
  id: number;
  tmp_name?: string;
  full_name?: string;
  data?: {
    date?: Date,
    licenses?: Object[],
    memberships?: Object[],
    clubs?: any[],
    functions?: any[],
    competences?: Object[],
    private?: Object,
    gear?: Object
  };
}

interface PersonData {
  id: number;
  tmp_name?: string;
  full_name?: string;
}

interface PrivateData {
  id: number;
  tmp_name?: string;
  data?: any;
}
interface OrganizationPeople {
  hi?: Person[];
  hm?: Person[];
  hl?: Person[];
  hfl?: Person[];
  pilot?: Person[];
}


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
  selector: 'nlf-ors-editor-tag-persons',
  templateUrl: './ors-editor-tag-persons.component.html',
  styleUrls: ['./ors-editor-tag-persons.component.css']
})
export class NlfOrsEditorTagPersonsComponent implements OnInit, OnChanges {


  // Async Items
  tags$: Observable<LungoPersonsSearchItem[]> | LungoPersonsSearchItem[];
  tagsLoading = false;
  tagsInput$ = new Subject<string>();
  selectedTags: LungoPersonsSearchItem[] = []; // = any;
  limit = undefined;
  currentId: string;

  modalIndex: number;
  modalPerson: Person;

  @Input() persons: Person[];
  @Output() personsChange: EventEmitter<Person[]> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  @Input() tempName: string = null;
  @Input() activity: string;
  @Input() group: string;
  @Input() elementId: string = 'some_id';
  @Input() details = false;
  @Input() disabled = false;
  @Input() allowAdd = true;
  @Input() fc = false;
  @Input() external: boolean = false; // if changed externally
  @Output() externalChange: EventEmitter<boolean> = new EventEmitter();
  @Input() debug: boolean = false;
  @Input() confirmDelete: boolean = false;


  constructor(
    private personsService: LungoPersonsService,
  ) { }

  ngOnInit() {

    this.initPersons();
    this.searchTags();
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.hasOwnProperty('persons') && this.external) {

      const pids = this.persons.map(x => x.id);

      if (pids.length === 0) {
        this.selectedTags = [];
        this.selectedTags = [...this.selectedTags];

      } else {
        for (let i = 0; i < this.selectedTags.length; i++) {
          if (pids.indexOf(this.selectedTags[i].id) === -1) {

            this.selectedTags.splice(i, 1);
            this.selectedTags = [...this.selectedTags];
            break;
          }
        }
      }

      // Clean up external trigger
      if (this.external) {
        setTimeout(() => {
          this.external = false;
          this.externalChange.emit(this.external);
        }, 500);
      }

    }

  }

  private initPersons() {
    if (!this.persons) {
      this.persons = [];
    } else if (!!this.persons && this.persons.length > 0) {

      for (let i = 0; i < this.persons.length; i++) {
        if (this.persons[i]['id'] < 0) {
          this.selectedTags = [...this.selectedTags, { id: this.persons[i]['id'], full_name: this.persons[i]['tmp_name'] }];
        } else if (this.persons[i]['id'] > 0) {
          const opts: ApiOptionsInterface = { query: { projection: { id: 1, full_name: 1 } } };
          this.personsService.getUser(this.persons[i]['id'], opts).subscribe(
            data => {
              if (!!data.full_name) {
                this.persons[i]['full_name'] = data.full_name;
                this.selectedTags = [...this.selectedTags, this.persons[i]];
              }
            },
            err => console.log(err),
            () => {
              console.log('Selected', this.selectedTags, 'Persons', this.persons);
            }
          );
        }
      } //for
    } // else
  }

  public onAdd(event) {
    /**
    data?: {
      date?: Date,
      licenses?: Object[],
      clubs?: any[],
      functions?: any[],
      competences?: Object[],
      private?: Object,
      gear?: Object
    };
    **/

    if (!!event && event.hasOwnProperty('id') && event.id > 0) {

      this.personsService.getUser(event.id).subscribe(
        data => {
          this.persons = [...this.persons,
          {
            id: event.id,
            data: {
              date: new Date(),
              licenses: data.licenses,
              memberships: data.memberships,
              functions: data.functions,
              competences: data.competences
            }
          }];
          this.personsChange.emit(this.persons);
          this.change.emit(true);
        },
        err => console.log(err)
      );
    }
    else if (!!event.full_name && !event.hasOwnProperty('id')) {
      this.persons = [...this.persons, { id: -1 * Math.floor(Math.random() * 100000), tmp_name: titleCase(event.full_name) }];
      this.personsChange.emit(this.persons);
      this.change.emit(true);
    }

  }

  onRemove(event) {
    console.log('Remove', event);
    if (!!event.hasOwnProperty('value') && event.value.hasOwnProperty('id')) {

      this.persons = this.persons.filter(p => p.id !== event.value.id);
      this.personsChange.emit(this.persons);
      this.change.emit(true);

    }

  }

  onClear(event) {
    console.log('Clear', event);
    this.persons = [];
    this.selectedTags = [];
    this.personsChange.emit(this.persons);
    this.change.emit(true);
  }


  private searchTags() {
    let a: LungoPersonsSearchItem[];
    this.tags$ = concat(
      of([]), // default items
      this.tagsInput$.pipe(
        debounceTime(700),
        distinctUntilChanged(),
        tap(() => this.tagsLoading = true),
        switchMap(term => this.personsService.search(term, this.activity).pipe(
          map((r) => a = r._items),
          catchError(() => of([])), // empty list on error
          tap(() => this.tagsLoading = false)
        ))
      )
    );
  }

}
