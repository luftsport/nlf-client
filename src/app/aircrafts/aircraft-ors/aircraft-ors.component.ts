import { Component, OnInit, Input } from '@angular/core';
import { ApiAircraftsItem } from 'app/api/api.interface';
import { ApiObservationsItem, ApiObservationsList, ApiOptionsInterface } from 'app/api/api.interface';
import { ApiEveQueryInterface } from 'app/api/api-eve.interface';
import { ApiObservationsService } from 'app/api/api-observations.service';

@Component({
  selector: 'nlf-aircraft-ors',
  templateUrl: './aircraft-ors.component.html',
  styleUrls: ['./aircraft-ors.component.css']
})
export class NlfAircraftOrsComponent implements OnInit {

  public observations: ApiObservationsItem[];

  @Input() callsign: string;
  public dataReady: boolean = false;

  constructor(
    private orsService: ApiObservationsService
  ) {
    this.orsService.setActivity('motorfly');
  }

  ngOnInit() {

    let options: ApiOptionsInterface = {
      query: {
        where: {"aircrafts.aircraft.callsign": this.callsign},
      }
    }
    this.orsService.getObservations(options).subscribe(
      data => {
        this.observations = data._items;
      },
      err => { },
      () => {
        this.dataReady = true;
      }
    );

  }

}
