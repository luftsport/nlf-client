import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeoLocationService } from 'app/services/geo/geo-location.service';
import { ApiGeoAdminService } from 'app/api/api-geo-admin.service';
import { ApiOptionsInterface, ApiObservationsItem } from 'app/api/api.interface';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { faCheck, faClose, faEdit, faMapMarker, faTimes, faLocation } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'ts-debounce';


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

  debouncedUpdate = debounce(this.update, 500);

  modalRef;
  geoReady = false;
  userGeo;

  faMapMarker = faMapMarker;
  faEdit = faEdit;
  faClose = faClose;
  faTimes = faTimes;
  faCheck = faCheck;
  faLocation = faLocation;

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
        this.observation = { ...this.observation };
      }
    );

    // keep to enable "use my location"
    this.geoLocationService.getLocation({ enableHighAccuracy: true }).subscribe(
      position => {
        console.log(position);
        this.userGeo = position;

        // Ingen lokalisasjon satt:
        if (!this.observation.occurrence.attributes.latitudeOfOcc.value && !this.observation.occurrence.attributes.longitudeOfOcc.value) {
          //this.observation.occurrence.attributes.latitudeOfOcc.value = position.coords.latitude;
          //this.observation.occurrence.attributes.longitudeOfOcc.value = position.coords.longitude;
        }
        this.geoReady = true;
      },
      err => {

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

  public useMyLocation() {
    this.observation.occurrence.attributes.latitudeOfOcc.value = this.userGeo.coords.latitude;
    this.observation.occurrence.attributes.longitudeOfOcc.value = this.userGeo.coords.longitude;
    this.observation.occurrence.attributes = { ...this.observation.occurrence.attributes };
    this.updateArea();
  }

  public isDraggable() {

    return !this.observation.acl_user.w;
  }

  private updateLocation(event) {
    if (!this.disabled) {
      this.observation.occurrence.attributes.latitudeOfOcc.value = parseFloat(event.coords.lat);
      this.observation.occurrence.attributes.longitudeOfOcc.value = parseFloat(event.coords.lng);

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
          this.observation.occurrence.attributes.stateAreaOfOcc = { ...this.observation.occurrence.attributes.stateAreaOfOcc };
        } else {
          this.observation.occurrence.attributes.stateAreaOfOcc.value = undefined;
        }
      },
      err => {
        this.observation.occurrence.attributes.stateAreaOfOcc.value = undefined;
      },
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
    this.subject.update(this.observation);

  }
  modalUpdate() {

    this.update();
    this.modalRef.close();
  }

}
