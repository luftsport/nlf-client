import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiAircraftsService } from 'app/api/api-aircrafts.service';
import { ApiOptionsInterface, ApiAircraftsItem } from 'app/api/api.interface';
import { Router } from '@angular/router';
import { faPlus, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-aircrafts-add',
  templateUrl: './aircrafts-add.component.html',
  styleUrls: ['./aircrafts-add.component.css']
})
export class NlfAircraftsAddComponent implements OnInit {

  faPlus = faPlus;
  faEdit = faEdit;
  faTimes = faTimes;

  modalRef;
  dataReady = false;
  callsign: string;
  defaults = {}
  aircraft: ApiAircraftsItem;
  aircraft_listing: ApiAircraftsItem[] = [];
  error: string;
  aircraft_types: string[];

  new_aircraft: ApiAircraftsItem = { callsign: undefined };

  constructor(
    private modalService: NgbModal,
    private aircraftsService: ApiAircraftsService,
    private router: Router) { }

  ngOnInit() {

    this.aircraft = { callsign: undefined };
    this.dataReady = false;
    this.aircraftsService.getAircraftTypes().subscribe(
      data => {
        this.aircraft_types = data._items;
      },
      err => console.log('Error getting aircraft types')
    )
  }
  addAircraft() {
    this.new_aircraft.callsign = this.callsign;
    this.aircraftsService.create(this.new_aircraft).subscribe(
      data => {
        this.router.navigate(['/aircrafts', 'edit', data._id]);
      },
      err => this.error= err
    )
  }
  checkAircraft() {
    this.dataReady = false;
    this.callsign = this.callsign.toUpperCase();
    const options: ApiOptionsInterface = {
      query: {
        where: {
          callsign: this.callsign
        },
        projection: { callsign: 1, status: 1, model: 1, manufacturer: 1 }
      }
    }
    this.aircraftsService.getAircrafts(options).subscribe(
      data => {
        if (data._meta.total > 0) {
          this.aircraft_listing = data['_items'];
          //We already have something
        } else if (data._meta.total === 0) {
          this.aircraft_listing = [];
          // Can make!
        }

      },
      err => { this.error = err },
      () => this.dataReady = true
    )
  }

  public openModal(template) {

    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

}
