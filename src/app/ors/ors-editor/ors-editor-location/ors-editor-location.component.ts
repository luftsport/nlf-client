import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NlfOrsEditorService } from '../ors-editor.service';
import { ApiObservationsItem, ApiOptionsInterface } from '../../../api/api.interface';
import { ApiClubsService } from '../../../api/api-clubs.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'nlf-ors-editor-location',
  templateUrl: './ors-editor-location.component.html',
  styleUrls: ['./ors-editor-location.component.css']
})
export class NlfOrsEditorLocationComponent implements OnInit, AfterViewInit {

  observation: ApiObservationsItem;
  locations;

  locationChooser: FormControl;
  selected: string;
  dataReady = false; // render when true

  constructor(private subject: NlfOrsEditorService,
    private clubService: ApiClubsService) {

    this.subject.observableObservation.subscribe(observation => this.observation = observation);

    // this.subject.update(this.observation);
  }

  ngOnInit() {
    this.locationChooser = new FormControl();
    try {
      this.selected = this.observation.location.nickname;
    } catch (e) {
    }

    this.getClubLocations();
  }

  ngAfterViewInit() {
    // Subscribe to changes!
    this.locationChooser.valueChanges
      .subscribe(location => {
        this.selected = location;
        console.log('Location selected');
        console.log(location);

        this.locations.forEach((element, index) => {
          if (element.nickname === location) {
            this.observation.location = this.locations[index];
            this.subject.update(this.observation);
          }
        });
        // this.observation.location = location;
      });
  }

  markerMoved(event) {
    this.observation.location.geo.coordinates[0] = event.coords.lat;
    this.observation.location.geo.coordinates[1] = event.coords.lng;
    console.log('marker moved');
    console.log(event);
    this.subject.update(this.observation);
  }

  getClubLocations() {
    const options: ApiOptionsInterface = {
      query: { projection: { locations: 1 } }
    };
    
    this.clubService.getClub(this.observation.club, options).subscribe(
      data => {
        console.log('Club locations:');
        console.log(data);
        this.locations = data.locations;

        // assign default if not in
        if (!!this.observation.location || !!this.observation.location.nickname ) {
          this.observation.location = this.locations[0];
        }
      },
      err => console.log(err),
    );
  }

  public toFloat(val) {
    if (typeof val === 'number') { return val; }

    return parseFloat(val);
  }
}
