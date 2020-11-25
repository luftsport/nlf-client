import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeoLocationService } from 'app/services/geo/geo-location.service';
import {  ApiGeoAdminService } from 'app/api/api-geo-admin.service';
import { ApiOptionsInterface } from 'app/api/api.interface';


@Component({
  selector: 'nlf-ors-editor-e5x-where',
  templateUrl: './ors-editor-e5x-where.component.html',
  styleUrls: ['./ors-editor-e5x-where.component.css']
})
export class NlfOrsEditorE5XWhereComponent implements OnInit {
  @Input() attr: any;
  @Input() modal: boolean = false;
  @Input() showOnlyBtn: boolean = true;
  @Input() disabled: boolean = false;
  @Output() attrChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() paths = [];

  modalRef;
  geoReady = false;
  constructor(
    private modalService: NgbModal,
    private geoLocationService: GeoLocationService,
    private geoAdminService: ApiGeoAdminService
  ) {

    this.geoLocationService.getLocation({ enableHighAccuracy: true }).subscribe(
      position => {
        console.log(position);
        if (!this.attr.latitudeOfOcc.value && !this.attr.longitudeOfOcc.value) {
          this.attr.latitudeOfOcc.value = position.coords.latitude;
          this.attr.longitudeOfOcc.value = position.coords.longitude;
        }
        this.geoReady = true;
      },
      err => {
        if (!this.attr.latitudeOfOcc.value && !this.attr.longitudeOfOcc.value) {
          this.attr.latitudeOfOcc.value = 59.91655557650091;
          this.attr.longitudeOfOcc.value = 10.748440347823207;
        }
        this.geoReady = true;
      },
      () => {

        if(!this.attr.stateAreaOfOcc.value) {
          this.updateArea();
        }
      }
    );

  }

  ngOnInit() {

  }

  public isDraggable() {

    return !this.disabled;
  }

  private updateLocation(event) {
    if (!this.disabled) {

      this.attr.latitudeOfOcc.value = event.coords.lat;
      this.attr.longitudeOfOcc.value = event.coords.lng;
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
                  this.attr.longitudeOfOcc.value,
                  this.attr.latitudeOfOcc.value
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
          this.attr.stateAreaOfOcc.value = data._items[0].e5x;
          //this.attr.stateAreaOfOcc = {...this.attr.stateAreaOfOcc};
        }
      },
      err => { },
      () => this.update()
    );
  }

  public toFloat(arg) {
    return parseFloat(arg);
  }

  public openModal(template) {

    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  update() {
    this.attrChange.emit(this.attr);
    this.change.emit(true);
  }
  modalUpdate() {

    this.update();
    this.modalRef.close();
  }

}
