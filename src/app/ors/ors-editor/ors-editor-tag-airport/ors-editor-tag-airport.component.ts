import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiAirportsService } from 'app/api/api-airports.service';
import { ApiOptionsInterface, ApiObservationsItem, ApiAirport, ApiAirports } from 'app/api/api.interface';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, map } from 'rxjs/operators';
import { Subject, Observable, of, concat } from 'rxjs';
import { GeoLocationService } from 'app/services/geo/geo-location.service';

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
  selector: 'nlf-ors-editor-tag-airport',
  templateUrl: './ors-editor-tag-airport.component.html',
  styleUrls: ['./ors-editor-tag-airport.component.css']
})
export class NlfOrsEditorTagAirportComponent implements OnInit {


  @Input() airport: ApiAirport;
  @Output() airportChange: EventEmitter<ApiAirport> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled = false;
  @Input() element_id = '';
  @Input() fc = false;
  //@Input() elementId: string = 'abcd_get_that_airport';

  airports$: Observable<ApiAirport[]> | ApiAirport[];
  airportsInput$ = new Subject<string>();
  airportsLoading = false;
  selectedAirports = {};
  dataReady = true;
  location: Coordinates;

  constructor(
    private airportService: ApiAirportsService,
    ) {

  }

  ngOnInit() {

    //this.acService.getAircrafts().subscribe(data => this.apidata = data._items);
    this.searchAirports();
  }


  public onChange(event) {
    this.airportChange.emit(event);

    if(!!event) {

      try {
        delete event._etag;
        delete event._updated;
        delete event._links;
        delete event._score;
      } catch {}

      this.change.emit(true);
    } else {
      this.change.emit(false);
    }
  }

  private searchAirports() {
    let a: ApiAirport[];
    this.airports$ = concat(
      of([]), // default items
      this.airportsInput$.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => this.airportsLoading = true),
        switchMap(term => this.airportService.getAirports({
          query: {
            where: {
              $text: { $search: term },
            },
            projection: { _score: { $meta: "textScore" } },
            sort: '[("_score", { "$meta": "textScore" })]',
            max_results: 100
          }
        }).pipe(
          map((r) => a = r._items),
          catchError(() => of([])), // empty list on error
          tap(() => this.airportsLoading = false)
        ))
      )
    );
  }

}
