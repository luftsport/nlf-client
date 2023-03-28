import { Component, OnInit, Input } from '@angular/core';
import { ApiAircraftsService } from 'app/api/api-aircrafts.service';
import { ApiOptionsInterface, ApiAircraftsItem } from 'app/api/api.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { faHelicopter, faPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-aircraft-summary',
  templateUrl: './aircraft-summary.component.html',
  styleUrls: ['./aircraft-summary.component.css']
})
export class NlfAircraftSummaryComponent implements OnInit {

  @Input() callsign: string;
  // Optional if anon
  @Input() model: string;
  @Input() manufacturer: string;

  faPlane = faPlane;
  faHelicopter = faHelicopter;

  dataReady = false;
  aircraft: ApiAircraftsItem;
  thumbnail: string;

  constructor(
    private aircraftsService: ApiAircraftsService,
    public domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getAircraft();
  }

  getAircraft() {

    this.aircraftsService.getAircraft(this.callsign).subscribe(
      data => {
        this.aircraft = data;
      },
      err => {
        console.log('ERR getting aircraft ', err.message);
        this.aircraft = { callsign: this.callsign, image: undefined };
        this.dataReady = true;
      },
      () => this.dataReady = true
    );

  }




}
