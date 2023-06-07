import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeoLocationService } from 'app/services/geo/geo-location.service';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { debounce } from 'ts-debounce';
import { ApiObservationsItem } from 'app/api/api.interface';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-ors-editor-e5x-occurrence',
  templateUrl: './ors-editor-e5x-occurrence.component.html',
  styleUrls: ['./ors-editor-e5x-occurrence.component.css']
})
export class NlfOrsEditorE5XOccurrenceComponent implements OnInit {
  faTimes = faTimes;
  faCheck = faCheck;

  //@Input() attr: any;
  @Input() modal: boolean = false;
  @Input() disabled: boolean = false;
  @Input() showSimpleView: boolean = false;
  //@Output() attrChange: EventEmitter<any> = new EventEmitter();
  //@Output() change: EventEmitter<boolean> = new EventEmitter();
  //@Input() paths: any;

  public debouncedUpdate = debounce(this.update, 1000);

  observation: ApiObservationsItem;

  flightPaths = [];
  // [(attr)]="observation.occurrence.attributes"
  modalRef;
  geoReady = false;
  constructor(
    private modalService: NgbModal,
    //private geoLocationService: GeoLocationService,
    private subject: NlfOrsEditorService
  ) {

    this.subject.observableObservation.subscribe(
      observation => {
        try {
          this.observation = observation;
          this.updateFlightPaths();
        } catch { }
      }
    );

    /**
    this.geoLocationService.getLocation({ enableHighAccuracy: true }).subscribe(
      position => {
        console.log(position);
        this.observation.occurrence.attributes.latitudeOfOcc.value = position.coords.latitude;
        this.observation.occurrence.attributes.longitudeOfOcc.value = position.coords.longitude; // {{ geo.coords.latitude }} {{ geo.coords.longitude }}
      },
      err => {
        this.observation.occurrence.attributes.latitudeOfOcc.value = 51;
        this.observation.occurrence.attributes.longitudeOfOcc.value = 10;
      },
      () => this.geoReady = true
    );
    */

  }

  ngOnInit() {

  }

  public updateFlightPaths() {
    this.flightPaths = [];

    for (let aircraft of this.observation.aircrafts) {
      for (let flight of aircraft.flight) {
        this.flightPaths.push(flight.path);
      }
    }
    console.log('Paths', this.flightPaths);


  }

  public isDraggable() {

    return !this.disabled;
  }


  public toFloat(arg) {
    return parseFloat(arg);
  }

  public openModal(template) {

    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }


  update() {
    //this.attrChange.emit(this.attr);
    //this.change.emit(true);
    this.subject.update(this.observation);
  }

  modalUpdate() {

    this.update();
    this.modalRef.close();
  }

}
