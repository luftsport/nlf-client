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
  selector: 'nlf-ors-editor-tag',
  templateUrl: './ors-editor-tag.component.html',
  styleUrls: ['./ors-editor-tag.component.css']
})
export class NlfOrsEditorTagComponent implements OnInit {


  // Async Items
  tags$: Observable<ApiTagItem[]> | ApiTagItem[];
  tagsLoading = false;
  tagsInput$ = new Subject<string>();
  selectedTags: ApiTagItem[] = <any>[];
  currentTags: ApiTagItem[] = <any>[];
  currentTerm: string;

  @Input() initialTags: string[];
  @Input() activity: string;
  @Input() group: string;
  @Input() limit: number = 10;
  @Input() allowAdd = true;
  @Input() disabled = false;
  @Input() elementId: string = 'tag-id';
  @Input() details = false;
  @Input() fc = false;
  @Input() preload = false;
  @Output() initialTagsChange: EventEmitter<ApiTagItem[]> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();


  constructor(
    private tags: ApiTagsService
  ) { }

  ngOnInit() {
    if (typeof this.initialTags === 'undefined') {
      this.initialTags = [];
    }
    this.initialTags.forEach(tag => {
      this.selectedTags.push({ tag: tag });
    });
    this.currentTags = this.selectedTags;

    if (this.preload) {
      this.preloadTags();
    } else {
      this.searchTags();
    }
  }

  private onChange() {
    console.log('Change');
    let tags = [];
    this.selectedTags.forEach(tag => {
      tags.push(tag.tag);
    });
    this.currentTags = this.selectedTags;
    this.initialTagsChange.emit(tags);
    this.change.emit(true);
    this.currentTerm = undefined;
  }

  public onAdd(event) {
    console.log('On add', event);
    if (event.hasOwnProperty('_id')) {
      this.tags.freq(event._id, 1).subscribe(() => { this.onChange(); });
    } else {
      let tag = '';
      if (!!event && typeof event === 'object' && event.hasOwnProperty('tag')) {
        tag = event.tag;
      } else {
        tag = event;
      }
      this.tags.create({ tag: tag, group: this.group, activity: this.activity })
        .subscribe(
          result => {
            this.selectedTags.forEach((t, idx) => {
              if (t.tag === tag) {
                this.selectedTags.splice(idx, 1);
              }
            });
            this.selectedTags = [...this.selectedTags, { _id: result._id, tag: tag, freq: 1, activity: this.activity, group: this.group }];
            this.onChange();
          },
          err => console.log('Error updating tag')
        );
    }
  }

  private remove(_id) {
    if (typeof _id !== 'undefined') {
      this.tags.freq(_id, -1).subscribe(() => { });
    }
  }
  public onRemove(event) {
    console.log('On remove', event);
    if (!!event.value && event.value.hasOwnProperty('_id')) {
      this.remove(event.value._id);
    }
    this.onChange();
  }

  public onClear(event) {
    console.log('On clear', event);
    this.currentTags.forEach(tag => {
      if (tag.hasOwnProperty('_id')) {
        this.remove(tag._id);
      }
    });
    this.onChange();
    //this.initialTagsChange.emit([]);
    //this.change.emit([]);
  }

  public onFocusOut(event) {
    if (!!this.currentTerm) { // this.currentTags.length===0 && 
      this.onAdd(this.currentTerm);
      this.currentTerm = undefined;
    }
  }

  /**
   * Just keep updated param if only text and focus out!
   * No debounce to avoid race with focus out
   * @param event 
   */
  public onSearch(event) {
    this.currentTerm = event.term;
  }

  private preloadTags() {
    let a: ApiTagItem[];
    this.tags$ = this.tags.getTags({
      query: {
        where: {
          activity: this.activity,
          group: this.group,
          freq: { $gte: -1 }
        },
        sort: [{ freq: -1 }],
        max_results: 1000
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
        tap((term) => {
          this.currentTerm = term;
          this.tagsLoading = true;
        }
        ),
        switchMap(term =>
          this.tags.getTags({
            query: {
              where: {
                activity: this.activity,
                group: this.group,
                freq: { $gte: 0 },
                $text: { $search: term },
              },
              sort: [{ freq: -1 }]
            }
          }
          ).pipe(
            map((r) => a = r._items),
            catchError(() => of([])), // empty list on error
            tap(() => this.tagsLoading = false)
          ))
      )
    );
  }

}
