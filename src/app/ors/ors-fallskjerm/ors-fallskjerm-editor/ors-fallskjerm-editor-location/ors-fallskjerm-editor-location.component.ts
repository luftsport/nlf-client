import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiObservationsItem, ApiOptionsInterface } from 'app/api/api.interface';
import { ApiClubsService } from 'app/api/api-clubs.service';
import { FormControl } from '@angular/forms';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-ors-fallskjerm-editor-location',
  templateUrl: './ors-fallskjerm-editor-location.component.html',
  styleUrls: ['./ors-fallskjerm-editor-location.component.css']
})
export class NlfOrsFallskjermEditorLocationComponent implements OnInit, AfterViewInit {

  observation: ApiObservationsItem;
  locations = [];
  locationChooser: FormControl;
  selected: string;
  dataReady = false; // render when true

  lines = [];

  faEdit = faEdit;

  constructor(private subject: NlfOrsEditorService,
    private clubService: ApiClubsService) {

    this.subject.observableObservation.subscribe(
      observation => {
        // always assign
        this.observation = observation;

        try {
          this.selected = this.observation.location.nickname;
        } catch (e) {
          this.selected = undefined;
        }

      }
    );


    // this.subject.update(this.observation);
  }

  ngOnInit() {
    this.locationChooser = new FormControl();
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

    this.clubService.getClub(this.observation.discipline, options).subscribe(
      data => {
        console.log('Club locations:');
        console.log(data);
        this.locations = data.locations;

        // assign default if not in
        if (!this.observation.location || !this.observation.location.nickname) {
          if (this.locations.length > 0) {
            this.observation.location = this.locations[0];
            this.subject.update(this.observation);
            this.selected = this.observation.location.nickname;
          }

        }
      },
      err => {
        console.log(err);
      },
      () => {
        this.dataReady = true;
      }

    );
  }

  private setDefault() {

  }
  public toFloat(val) {
    if (typeof val === 'number') { return val; }

    return parseFloat(val);
  }
}
