import { Component, OnInit, Input } from '@angular/core';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiAircraftsService } from 'app/api/api-aircrafts.service';
import { ApiOptionsInterface, ApiObservationsItem, ApiAircraftsItem, ApiObservationAircraftsItem } from 'app/api/api.interface';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, map } from 'rxjs/operators';
import { Subject, Observable, of, concat } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from 'app/services/confirm/confirm.service';
import {
  E5XAircraftClass,
  E5XAirspaceClass,
  E5XAerodromeGeneralClass
} from 'app/interfaces/e5x.interface';
import { faWarning, faCheck, faPlane, faHelicopter, faEdit, faTimes, faExclamation } from '@fortawesome/free-solid-svg-icons';

export interface AutoCompleteModel {
  value: any;
  display: string;
}
@Component({
  selector: 'nlf-ors-editor-e5x-aircraft',
  templateUrl: './ors-editor-e5x-aircraft.component.html',
  styleUrls: ['./ors-editor-e5x-aircraft.component.css']
})
export class NlfOrsEditorE5XAircraftComponent implements OnInit {

  apidata;

  pc: number;

  // Aircraft modal
  modalRef;
  modalAircraft: ApiAircraftsItem; //ObservationPeople;
  modalPerson: any;

  modalIndex: number;
  // show/hide
  showEngine = false;
  showPropeller = false;
  showPartsDamaged = false;
  showWildlife = false;
  showInjuries = false;
  showMass = false;

  aircrafts$: Observable<ApiAircraftsItem[]> | ApiAircraftsItem[];
  aircraftInput$ = new Subject<string>();
  tagsLoading = false;
  selectedAircrafts = [];
  observation: ApiObservationsItem;

  faWarning = faWarning;
  faExclamation = faExclamation;
  faCheck = faCheck;
  faPlane = faPlane;
  faHelicopter = faHelicopter;
  faEdit = faEdit;
  faTimes = faTimes;

  constructor(
    private acService: ApiAircraftsService,
    private subject: NlfOrsEditorService,
    private modalService: NgbModal,
    private confirmService: ConfirmService) {

    this.subject.observableObservation.subscribe(
      observation => {
        this.observation = observation;

        if (!this.observation.aircrafts) {
          this.observation.aircrafts = [];
        }
        // Populate!
        this.observation.aircrafts.forEach(ac => {
          this.selectedAircrafts.push(ac.aircraft);
        });
      }
    );

  }
  ngOnInit() {

    //this.acService.getAircrafts().subscribe(data => this.apidata = data._items);
    this.searchAircrafts();
  }

  updateObservation() {
    this.subject.update(this.observation);
  }

  public onAdd(event) {
    console.log('Aircraft add: ', event);
    this.observation.aircrafts.push(
      {
        aircraft: {
          _id: event._id,
          callsign: event.callsign,
          manufacturer: event.manufacturer,
          model: event.model,
          msn: event.msn,
          status: event.status,
          type: event.type,
        },
        crew: [],
        parts: [],
        flight: [],
        airspace: new E5XAirspaceClass().airSpace,
        aerodrome: new E5XAerodromeGeneralClass().aerodromeGeneral,
        occurrence: new E5XAircraftClass().aircraft.attributes,

      });
    this.updateObservation();
  }
  public onRemove(event) {
    console.log('Aircraft remove: ', event);

    const confirmMsg = { title: 'Please confirm',
                         message: 'Are you sure you want to delete ' + event.value.callsign + '? All data will be lost.',
                         yes: 'Delete',
                         no: 'Cancel'};
    this.confirmService.confirm(confirmMsg).then(
        () => { // Yes
          this.observation.aircrafts.forEach((item, index) => {
            if (item.aircraft.callsign === event.value.callsign) {
              this.observation.aircrafts.splice(index, 1);
            }
          });
          this.updateObservation();
        },
        () => { // No
            // Do nothing?
        }
    );


  }

  private searchAircrafts() {
    let a: ApiAircraftsItem[];
    this.aircrafts$ = concat(
      of([]), // default items
      this.aircraftInput$.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => this.tagsLoading = true),
        switchMap(term => this.acService.getAircrafts({
          query: {
            where: {
              $text: { $search: term },
              status: { $ne: 'DELETED' }
            },
            projection: { _score: { $meta: "textScore" } },
            sort: '[("_score", { "$meta": "textScore" })]',
            max_results: 100
          }
        }).pipe(
          map((r) => a = r._items),
          catchError(() => of([])), // empty list on error
          tap(() => this.tagsLoading = false)
        ))
      )
    );
  }

  public openAircraftModal(template, index) {
    this.modalIndex = index;

    // Sanity
    if (!this.observation.aircrafts[index].hasOwnProperty('aircraft')) {
      this.observation.aircrafts[index]['aircraft'] = undefined;
    }
    if (!this.observation.aircrafts[index].hasOwnProperty('crew')) {
      this.observation.aircrafts[index]['crew'] = [];
    }
    if (!this.observation.aircrafts[index].hasOwnProperty('parts')) {
      this.observation.aircrafts[index]['parts'] = [];
    }
    if (!this.observation.aircrafts[index].hasOwnProperty('flight')) {
      this.observation.aircrafts[index]['flight'] = [];
    }
    this.modalAircraft = this.observation.aircrafts[index].aircraft;
    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  public modalEngines(num) {
    if (typeof num !== 'undefined' && +num > 0) {
      return Array.apply(null, Array(num)).map(function (_, i) { return i; });
    }
    return [];
  }

  modalAircraftUpdate(index) {

    this.observation.aircrafts[index].aircraft = { ...this.modalAircraft };

    if (this.observation.aircrafts[index].aircraft.hasOwnProperty('image')) {
      delete this.observation.aircrafts[index].aircraft.image;
    }

    this.updateObservation();
    this.modalRef.close();
  }

  public openPersonModal(template, index) {


  }
}
