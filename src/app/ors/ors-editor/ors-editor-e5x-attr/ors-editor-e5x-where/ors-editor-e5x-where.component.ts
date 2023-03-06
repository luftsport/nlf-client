import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeoLocationService } from 'app/services/geo/geo-location.service';
import { ApiGeoAdminService } from 'app/api/api-geo-admin.service';
import { ApiOptionsInterface, ApiObservationsItem } from 'app/api/api.interface';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { faCheck, faClose, faEdit, faMapMarker, faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'nlf-ors-editor-e5x-where',
  templateUrl: './ors-editor-e5x-where.component.html',
  styleUrls: ['./ors-editor-e5x-where.component.css']
})
export class NlfOrsEditorE5XWhereComponent implements OnInit {

  /** 
  @Input() attr: any;
  @Input() modal: boolean = false;
 
  @Output() attrChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() paths = [];
*/
  @Input() showOnlyBtn: boolean = true;
  @Input() disabled: boolean = false;
  @Input() modal: boolean = false;

  modalRef;
  geoReady = false;

  faMapMarker = faMapMarker;
  faEdit = faEdit;
  faClose = faClose;
  faTimes = faTimes;
  faCheck = faCheck;

  observation: ApiObservationsItem;


  constructor(
    private modalService: NgbModal,
    private geoLocationService: GeoLocationService,
    private geoAdminService: ApiGeoAdminService,
    private subject: NlfOrsEditorService
  ) {

    this.subject.observableObservation.subscribe(
      observation => {
        this.observation = observation;
      }
    );

    this.geoLocationService.getLocation({ enableHighAccuracy: true }).subscribe(
      position => {
        console.log(position);

        // Ingen lokalisasjon satt:
        if (!this.observation.occurrence.attributes.latitudeOfOcc.value && !this.observation.occurrence.attributes.longitudeOfOcc.value) {
          this.observation.occurrence.attributes.latitudeOfOcc.value = position.coords.latitude;
          this.observation.occurrence.attributes.longitudeOfOcc.value = position.coords.longitude;
        }
        this.geoReady = true;
      },
      err => {
        // Ingen lokalisasjon satt:
        if (!this.observation.occurrence.attributes.latitudeOfOcc.value && !this.observation.occurrence.attributes.longitudeOfOcc.value) {
          this.observation.occurrence.attributes.latitudeOfOcc.value = 59.91655557650091;
          this.observation.occurrence.attributes.longitudeOfOcc.value = 10.748440347823207;
        }
        this.geoReady = true;
      },
      () => {
        // Alltid oppdatere area
        if (!this.observation.occurrence.attributes.stateAreaOfOcc.value) {
          this.updateArea();
        }
      }
    );

  }

  ngOnInit() {

  }

  public isDraggable() {

    return !this.observation.acl_user.w;
  }

  private updateLocation(event) {
    if (!this.disabled) {
      this.observation.occurrence.attributes.latitudeOfOcc.value = event.coords.lat;
      this.observation.occurrence.attributes.longitudeOfOcc.value = event.coords.lng;
      this.updateArea();
    }

  }

  private updateArea() {
    const options: ApiOptionsInterface = {
      query: {
        where: {
          type: 'county',
          geometry: {
            $geoIntersects: {
              $geometry: {
                type: "Point",
                coordinates: [
                  this.observation.occurrence.attributes.longitudeOfOcc.value,
                  this.observation.occurrence.attributes.latitudeOfOcc.value
                ]
              }
            }
          }
        },
        projection: { e5x: 1 }
      }
    }
    this.geoAdminService.get(options).subscribe(
      data => {
        if (data._items.length == 1) {
          console.log('UPDATE AREA', data._items[0].e5x);
          this.observation.occurrence.attributes.stateAreaOfOcc.value = data._items[0].e5x;
          this.observation.occurrence.attributes.stateAreaOfOcc = {...this.observation.occurrence.attributes.stateAreaOfOcc};
        }
      },
      err => { },
      () => this.subject.update(this.observation)
    );
  }

  public toFloat(arg) {
    return parseFloat(arg);
  }

  public openModal(template) {

    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  update() {
    //this.observation.occurrence.attributesChange.emit(this.observation.occurrence.attributes);
    //this.change.emit(true);
    this.updateArea();

  }
  modalUpdate() {

    this.update();
    this.modalRef.close();
  }

}
