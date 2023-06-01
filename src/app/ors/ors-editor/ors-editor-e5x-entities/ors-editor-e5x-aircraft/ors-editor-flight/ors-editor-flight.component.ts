import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiAirportsService } from 'app/api/api-airports.service';
import { ApiE5XChoicesService } from 'app/api/api-e5x-choices.service';
import { ApiOptionsInterface, ApiObservationsItem, ApiAirport, ApiAirports, ApiObservationAircraftsItem } from 'app/api/api.interface';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, map } from 'rxjs/operators';
import { Subject, Observable, of, concat } from 'rxjs';
import { GeoLocationService } from 'app/services/geo/geo-location.service';
import { ApiCacheService } from 'app/api/api-cache.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from 'app/services/confirm/confirm.service';
import { get } from 'app/interfaces/functions';
import { ApiNlfMetService } from 'app/api/api-nlf-met.service';
import { debounce } from 'ts-debounce';
import { has, clone } from 'lodash';
import {
  E5XClass,
  E5XAircraftClass,
  E5XAirspaceClass,
  E5XNarrativeClass,
  E5XPrecipitationAndOtherWeatherPhenomenaClass,
  E5XAerodromeWeatherReportsClass,
  E5XEventsClass,
  E5XAirNavigationServiceClass,
  E5XRunwayIncursionClass,
  E5XAerodromeGeneralClass,
  E5XDangerousGoodsClass,
  E5XReportingHistoryClass,
  E5XRiskAssessmentClass
} from 'app/interfaces/e5x.interface';
import { faTimes, faLongArrowRight, faPlane, faPlus, faMinus, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Map, Marker, MapOptions, LayerOptions, latLng, LatLng, marker, tileLayer, Polyline, polyline } from 'leaflet';

@Component({
  selector: 'nlf-ors-editor-flight',
  templateUrl: './ors-editor-flight.component.html',
  styleUrls: ['./ors-editor-flight.component.css']
})
export class NlfOrsEditorFlightComponent implements OnInit {


  @Input() aircraft: any;
  @Input() showSimpleView: boolean = false;
  @Output() aircraftChange: EventEmitter<ApiObservationAircraftsItem> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  _get = get;
  observation: ApiObservationsItem;
  airports$: Observable<ApiAirport[]> | ApiAirport[];
  airportsInput$ = new Subject<string>();
  airportsLoading = false;
  selectedAirports = [];
  dataReady = true;
  location: number[];
  zoom = 5;
  showRouteMap = true;
  routeReady = false;

  incident: boolean[] = [];

  from_airport: ApiAirport;
  from_airport_disable = false;
  to_airport: ApiAirport;
  to_airport_disable = false;
  route = [];
  currentWhen: Date;

  // Route modal
  modalRef;
  modalRoute;
  modalIndex;
  private _init: boolean = false;

  faTimes = faTimes;
  faLongArrowRight = faLongArrowRight;
  faPlane = faPlane;
  faPlus = faPlus;
  faMinus = faMinus;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  // Map
  polyline: Polyline;
  map: Map;
  mapCenter: LatLng;
  mapOptions: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 12
  };
  marker: Marker;
  markerOptions: Object;
  mapReady: boolean = false;

  public debouncedUpdate = debounce(this.update, 600);

  constructor(
    private airportService: ApiAirportsService,
    private subject: NlfOrsEditorService,
    private geoLocationService: GeoLocationService,
    private apiCache: ApiCacheService,
    private modalService: NgbModal,
    private confirmService: ConfirmService,
    private metService: ApiNlfMetService,
    private e5xChoicesService: ApiE5XChoicesService,
  ) {

    this.subject.observableObservation.subscribe(
      observation => {
        this.observation = observation;

        // Disabled
        if (!this.observation.acl_user.w) {
          this.from_airport_disable = true;
          this.to_airport_disable = true;
        }

        if (!!this.currentWhen && this.observation.when != this.currentWhen) {
          this.currentWhen = this.observation.when;
          this.updateWx(true);
        } else if (!this.currentWhen && !!this.observation.when) {
          this.currentWhen = this.observation.when;
          this.updateWx(true);
        }
        this._init = true;
      }

    );

    this.geoLocationService.getLocation({ enableHighAccuracy: true }).subscribe(
      position => {
        console.log(position);
        this.location = position.coords;
      }
    );
  }

  ngOnInit() {

    if (!this.aircraft.flight) {
      this.route = [];
    } else {
      this.route = this.aircraft.flight;
      setTimeout(() => {
        this.routeReady = true;
      }, 700);
    }

    if (this.route.length > 0) {
      this.to_airport = void 0;
      this.from_airport_disable = true;
      this.from_airport = { ...this.route[this.route.length - 1].to };
      this.setFocus('to_airport');
    }


    console.log('Route nginit', this.route);
    //this.acService.getAircrafts().subscribe(data => this.apidata = data._items);
    this.searchAirports();


    //console.log('Dict', this._deep(this.route[0] || {}, 'from.location'));
  }
  // Updating
  private update() {
    console.log('updating', this.route);
    this.aircraft.flight = this.route;
    this.aircraftChange.emit(this.aircraft);
    this.change.emit(true);

    //Update map:

  }

  private mapRoute() {

  }

  private updateWx(force = false) {
    if (!!this.aircraft) {
      if (!this.aircraft.hasOwnProperty('wx') || !this.aircraft.wx) {
        this.aircraft['wx'] = {};
      }

      let icaos = [];
      for (let r of this.route) {
        icaos.push(r.from.icao);
        icaos.push(r.to.icao);
      }
      console.log('ICAOS', icaos, 'ID', this.observation.id);
      icaos.forEach(
        (icao: string, idx) => {
          if (!(icao in this.aircraft.wx) || force) {
            try {
              this.metService.getTafMetar(icao, this.currentWhen.toISOString().substr(0, 10)).subscribe(
                data => {
                  this.aircraft.wx[icao] = data;
                }
              )
            } catch (e) { }
          }
        }
      );
    }
  }

  public toFloat(arg) {
    return parseFloat(arg);
  }

  public exists(obj, path, key) {
    return has(obj, path + '.' + key);
  }

  public addSegment() {
    if (!!this.from_airport && !!this.to_airport) {

      const path = [this.from_airport.location.coordinates, this.to_airport.location.coordinates];
      console.log(path);

      // Get those two e5x codes!
      if (!!this.to_airport.icao && !!this.from_airport.icao) {
        const options: ApiOptionsInterface = {
          query: {
            where: {
              key: "AerodromeGeneral.Airport",
              icao: {
                $in: [this.from_airport.icao, this.to_airport.icao]
              }
            },
            projection: { id: 1, icao: 1 }
          }
        }
        this.e5xChoicesService.getChoices(options).subscribe(
          data => {
            if (data._items.length == 2) {
              for (let e5x of data._items) {
                if (e5x.icao == this.from_airport.icao) {
                  this.from_airport.e5x = e5x.id;
                } else if (e5x.icao == this.to_airport.icao) {
                  this.to_airport.e5x = e5x.id;
                }
              }
            }
          },
          err => { },
          () => {
            this.route.push({ from: this.from_airport, to: this.to_airport, path: path, occurrence: false, weather: { from: {}, to: {} } });
            this.route = [...this.route];


            setTimeout(() => {                           // <<<---using ()=> syntax
              this.routeReady = true;
            }, 700);

            // Housekeeping
            this.from_airport = { ...this.to_airport };
            this.to_airport = void 0;
            this.from_airport_disable = true;

            this.setFocus('to_airport');
            this.update();
            this.updateWx();
          }
        );
      }



      // Update observation e5x stuff - create
    }
  }

  public removeSegment() {


    const confirmMsg = {
      title: 'Please confirm',
      message: 'Are you sure you want to delete route?',
      yes: 'Delete',
      no: 'Cancel'
    };
    this.confirmService.confirm(confirmMsg).then(
      () => { // Yes
        // alltid siste index length-1
        if (this.route.length > 0) {

          if (this.hasSegmentIncident(this.route.length - 1)) {
            this.removeIncident(this.route.length - 1);
          }

          this.route.pop(); //slice(this.route.length-1,1);

          if (this.route.length === 0) {
            this.from_airport_disable = false;
            this.to_airport = void 0;
            this.from_airport = void 0;
            this.setFocus('from_airport');

          } else if (this.route.length > 0) {
            this.to_airport = void 0;
            this.from_airport = { ...this.route[this.route.length - 1].to };
            this.setFocus('to_airport');

          }
          this.route = [...this.route];
          this.update();

        }
      },
      () => { // No
        // Do nothing?
      }
    );
  }

  public hasIncident() {

    for (let segment of this.route) {

      if (!!segment['occurrence']) {
        return true;
      }
    }
    return false;
  }

  public hasSegmentIncident(index) {
    return !!this.route[index]['occurrence'];
  }
  public addSegmentIncident(index) {

    this.route[index]['occurrence'] = true; //new E5XClass().occurrence; //{classification: {OccurrenceClass: 4}};
    //this.route[index].occurrence.entities.aircraft.push(new E5XAircraftClass().aircraft);
    try {
      this.aircraft.occurrence.lastDeparturePoint.value = this.route[index].from.e5x;
      this.aircraft.occurrence.plannedDestination.value = this.route[index].to.e5x;
    } catch (e) {
      console.log('ERR assigning from-to e5x', e);
    }
    this.update();
  }

  private removeIncident(index) {
    this.route[index]['occurrence'] = false;
    try {
      this.aircraft.occurrence = clone(new E5XAircraftClass().aircraft.attributes);
      this.aircraft.occurrence.lastDeparturePoint.value = undefined;
      this.aircraft.occurrence.plannedDestination.value = undefined;
    } catch (e) {
      console.log('ERR unassigning from-to e5x', e);
    }
    this.update();
  }

  public removeSegmentIncident(index) {

    const confirmMsg = {
      title: 'Please confirm',
      message: 'Are you sure you want to delete the incident?<br>This can not be undone.',
      yes: 'Delete',
      no: 'Cancel'
    };
    this.confirmService.confirm(confirmMsg).then(
      () => { // Yes
        try {
          // delete this.route[index]['incident'];
          this.removeIncident(index);
        } catch { console.log('Could not delete incident for index ' + index) }
      },
      () => { // No
        // Do nothing?
      }
    );

  }

  public setFocus(element) {
    try {
      setTimeout(() => {
        try {
          const focusEl: any = document.querySelector('#' + element).querySelector('input');
          focusEl.focus();
        } catch { }
      }, 100);
    } catch { }
  }

  onChange(event, focus_id) {

    if (event === true) {
      try {
        setTimeout(() => {
          let focusEl: any;
          if (focus_id == 'add_airport') {
            focusEl = document.querySelector('#' + focus_id);
          } else {
            focusEl = document.querySelector('#' + focus_id).querySelector('input');
          }
          focusEl.focus();
        }, 100);
      } catch { }
    }
  }


  /**
   * Map
   * @param event
   */
  public onMapReady(event) {
    console.log('Flight map: ', event);
  }
  public zoomChanged(event) {
    console.log('Zoom changed: ', event);
  }
  public debouncedBoundsChange(event) {
    console.log('Bounds changed: ', event);
  }

  public markerMoved(event) {
    console.log('Marker moved', event);
  }

  public lineDragEnd(event) {
    console.log('Line dragged end', event);
  }

  public compareWith(a, b) {
    return false;
  }

  public onAdd(event) {
    console.log('Airport add: ', event);

  }
  public onRemove(event) {
    console.log('Airport remove: ', event);
  }

  public onPathChanged(event, index) {
    console.log('Path changed', event);
    let path = [];
    for (let p of event.newArr) {
      path.push([p.lng(), p.lat(), 0]);
    }
    this.route[index].path = path;
    //this.route.path = event.newArr;
    this.update();
  }

  public openRouteModal(template, index) {
    this.modalIndex = index;
    this.modalRoute = this.route[index];
    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  modalRouteUpdate(index) {
    //this.route[index] = { ...this.modalRoute };
    //this.subject.update(this.observation);
    this.modalRef.close();
  }

  private searchAirports() {
    let a: ApiAirport[];
    this.airports$ = concat(
      of([]), // default items
      this.airportsInput$.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => this.airportsLoading = true),
        switchMap(term => this.apiCache.get(
          ['ors-airports-search', term], this.airportService.getAirports({
            query: {
              where: {
                $text: { $search: term },
              },
              projection: { _score: { $meta: "textScore" } },
              sort: '[("_score", { "$meta": "textScore" })]',
              max_results: 100
            }
          })).pipe(
            map((r) => a = r._items),
            catchError(() => of([])), // empty list on error
            tap(() => this.airportsLoading = false)
          ))
      )
    );
  }

}
