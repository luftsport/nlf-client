import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ApiLocationsService }  from 'app/api/api-locations.service';
import { ApiOptionsInterface, ApiLocationList, ApiLocationItem } from 'app/api/api.interface';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, map } from 'rxjs/operators';
import { Subject, Observable, of, concat } from 'rxjs';


@Component({
  selector: 'location-select',
  templateUrl: './location-select.component.html',
  styleUrls: ['./location-select.component.css']
})
export class NlfLocationSelectComponent implements OnInit {


  // Async Items
  locations$: Observable<ApiLocationItem[]> | ApiLocationItem[];
  locationsLoading = false;
  locationsInput$ = new Subject<string>();
  selectedLocations: ApiLocationItem; // = any;
  limit = 1;
  currentId: string;

  @Input() locationItem: ApiLocationItem;
  @Input() elementId: string = 'location-select-id';
  @Input() details = false;
  @Input() disabled = false;
  @Input() allowAdd = false;
  @Input() clearable = true;
  @Input() fc = false;
  @Input() preload = false;
  @Output() locationItemChange: EventEmitter<ApiLocationItem> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();


  constructor(
    private locations: ApiLocationsService
  ) {


  }

  ngOnInit() {
    if (!this.locationItem) {
      this.locationItem = undefined;
    }
    this.selectedLocations = this.locationItem;

    this.locations$ = [];
    this.searchLocations();

  }

  public onChange(event) {

    console.log('Location Event', event);
    /**
    let location = '';
    if (typeof event === 'undefined') {
      this.remove(this.currentId);
      this.selectedLocations = null;
    } else {
      if (event.hasOwnProperty('location')) {
        location = event.location;
      } else {
        location = event;
      }
      this.selectedLocations = event;

      if (event.hasOwnProperty('_id')) {
        this.locations.freq(event._id, 1).subscribe(() => { });
        if (this.currentId !== event._id) {
          this.remove(this.currentId);
          this.currentId = event._id;

        }
      }
    } **/
    this.locationItemChange.emit(event);
    this.change.emit(event);
  }

  private searchLocations() {
    let a: ApiLocationItem[];
    this.locations$ = concat(
      of([]), // default items
      this.locationsInput$.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => this.locationsLoading = true),
        switchMap(term => this.locations.search(term)
          .pipe(
            map((r) => a = r._items),
            catchError(() => of([])), // empty list on error
            tap(() => this.locationsLoading = false)
          ))
      )
    );
  }

}
