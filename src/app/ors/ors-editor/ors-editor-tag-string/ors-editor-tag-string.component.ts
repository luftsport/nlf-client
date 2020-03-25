import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiTagsService } from 'app/api/api-tags.service';
import { ApiOptionsInterface, ApiTagList, ApiTagItem } from 'app/api/api.interface';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, map } from 'rxjs/operators';
import { Subject, Observable, of, concat } from 'rxjs';

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
  selector: 'nlf-ors-editor-tag-string',
  templateUrl: './ors-editor-tag-string.component.html',
  styleUrls: ['./ors-editor-tag-string.component.css']
})
export class NlfOrsEditorTagStringComponent implements OnInit {


  // Async Items
  tags$: Observable<ApiTagItem[]> | ApiTagItem[];
  tagsLoading = false;
  tagsInput$ = new Subject<string>();
  selectedTags: ApiTagItem; // = any;
  limit = 1;
  currentId: string;

  @Input() tagString: string;
  @Input() activity: string;
  @Input() group: string;
  @Input() elementId: string;
  @Input() details = false;
  @Input() disabled = false;
  @Input() allowAdd = true;
  @Input() fc = false;
  @Input() preload = false;
  @Output() tagStringChange: EventEmitter<string> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();


  constructor(
    private tags: ApiTagsService
  ) {
    this.tags$ = [];
  }

  ngOnInit() {
    if (!this.tagString) {
      this.tagString = '';
    }
    this.selectedTags = { tag: this.tagString };

    if (this.preload) {
      this.preloadTags();
    } else {
      this.searchTags();
    }
  }

  private remove(_id) {
    if (typeof _id !== 'undefined') {
      this.tags.freq(_id, -1).subscribe(() => { });
    }
  }

  public onChange(event) {
    let tag = '';
    if (typeof event === 'undefined') {
      this.remove(this.currentId);
      this.selectedTags = null;
    } else {
      if (event.hasOwnProperty('tag')) {
        tag = event.tag;
      } else {
        tag = event;
      }
      this.selectedTags = event;

      if (event.hasOwnProperty('_id')) {
        this.tags.freq(event._id, 1).subscribe(() => { });
        if (this.currentId !== event._id) {
          this.remove(this.currentId);
          this.currentId = event._id;

        }
      } else {
        this.tags.create({ tag: tag, group: this.group, activity: this.activity })
          .subscribe(
            result => {
              if (!!this.currentId) {
                this.remove(this.currentId);
              }
              this.selectedTags = { ...{ tag: tag, group: this.group, activity: this.activity, freq: 1}, ...result };
              this.currentId = result._id;
            },
            err => console.log('Error updating tag', err)
          );
      }
    }
    this.tagStringChange.emit(tag);
    this.change.emit(event);
  }

  private preloadTags() {
    let a: ApiTagItem[];
    this.tags$ = this.tags.getTags({
      query: {
        where: {
          activity: this.activity,
          group: this.group,
          freq: { $gte: 0 }
        },
        sort: [{ freq: -1 }]
      }
    }).pipe(
      map((r) => a = r._items),
      catchError(() => of([])), // empty list on error
      tap(() => this.tagsLoading = false)
    );
  }

  private searchTags() {
    let a: ApiTagItem[];
    this.tags$ = concat(
      of([]), // default items
      this.tagsInput$.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => this.tagsLoading = true),
        switchMap(term => this.tags.getTags({
          query: {
            where: {
              activity: this.activity,
              group: this.group,
              freq: { $gte: -1 },
              $text: { $search: term },
            },
            sort: [{ freq: -1 }]
          }
        }).pipe(
          map((r) => a = r._items),
          catchError(() => of([])), // empty list on error
          tap(() => this.tagsLoading = false)
        ))
      )
    );
  }

}
