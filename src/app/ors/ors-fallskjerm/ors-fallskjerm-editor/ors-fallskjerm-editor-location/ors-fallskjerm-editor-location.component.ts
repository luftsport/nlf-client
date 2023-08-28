import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiObservationsItem, ApiOptionsInterface } from 'app/api/api.interface';
import { ApiClubsService } from 'app/api/api-clubs.service';
import { FormControl } from '@angular/forms';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Map, Marker, MapOptions, LayerOptions, latLng, LatLng, marker, tileLayer } from 'leaflet';
import { GeoLocationService } from 'app/services/geo/geo-location.service';
import { forkJoin } from 'rxjs';
import { isEqual } from 'lodash';

@Component({
  selector: 'nlf-ors-fallskjerm-editor-location',
  templateUrl: './ors-fallskjerm-editor-location.component.html',
  styleUrls: ['./ors-fallskjerm-editor-location.component.css']
})
export class NlfOrsFallskjermEditorLocationComponent implements OnInit, AfterViewInit {

  observation: ApiObservationsItem;
  isLocationICAOString: boolean = false;
  locations = [];
  locationChooser: FormControl;
  selected: string = '';
  dataReady = false; // render when true

  lines = [];

  faEdit = faEdit;

  // User geo default møllergata
  userGeo = { geo: { type: 'Point', coordinates: [59.9, 10.9] } };


  // Map
  map: Map;
  mapCenter: LatLng;
  mapOptions: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 12
  };
  marker: Marker;
  markerOptions: Object;
  mapReady: boolean = false;

  constructor(
    private subject: NlfOrsEditorService,
    private clubService: ApiClubsService,
    private geoLocationService: GeoLocationService,) {




    // this.subject.update(this.observation);
  }

  ngOnInit() {
    this.locationChooser = new FormControl();
    const getClubOptions: ApiOptionsInterface = {
      query: { projection: { locations: 1 } }
    };

    forkJoin([
      this.subject.observableObservation.subscribe(
        observation => {



          if (!this.observation || !isEqual(this.observation?.location, observation?.location)) {

            // always assign
            if (!!observation) {
              this.observation = observation;
            }

            if (typeof (observation?.location?.icao) === 'string') {
              this.isLocationICAOString = true;
            }

            this.clubService.getClub(observation.discipline, getClubOptions).subscribe(
              data => {
                console.log('Club locations:');
                console.log(data);
                this.locations = data.locations;

                // assign default if not in
                if (!observation.location || !observation.location.nickname) {
                  if (this.locations.length > 0) {
                    this.observation.location = this.locations[0];
                    this.subject.update(this.observation);
                    this.selected = this.observation.location.nickname;

                  }

                }

              },
              err => {
                console.log('ERROR doing clubservice', err);

              },
              () => {
                this.mapOptions.center = latLng(this.observation.location.geo.coordinates[0], this.observation.location.geo.coordinates[1]);

              }
            )

            try {
              this.selected = this.observation.location.nickname;
            } catch (e) {
              this.selected = undefined;
            }
            try {
              this.mapOptions.center = latLng(this.observation.location.geo.coordinates[0], this.observation.location.geo.coordinates[1]);
            } catch (e) { }

          } else {
            // Always update anyway!
            this.observation = observation;
          }
        }
      ),

      this.dataReady = true

    ]);
    this.getClubLocations();
  }

  ngAfterViewInit() {
    // Subscribe to changes!
    this.locationChooser.valueChanges
      .subscribe((location) => {

        this.selected = location;

        for (let i = 0; i < this.locations.length; i++) {
          if (this.locations[i]?.nickname === location) {
            if (location != this.observation.location.nickname) {
              if (this.isLocationICAOString) {
                try {
                  if (typeof (this.locations[i]['icao']) != 'string') {
                    this.locations[i]['icao'] = this.locations[i]['icao']['icao'];
                  }
                }
                catch (e) { }
              }
              this.observation.location = Object.assign({}, this.locations[i]);
              //this.observation.location.geo.coordinates = [this.toFloat(this.observation.location.geo.coordinates[0]), this.toFloat(this.observation.location.geo.coordinates[1])];


              this.subject.update(this.observation);
              this.goTo(this.observation.location);
            }
          }
        }
        // this.observation.location = location;
      });
  }

  public hasMapCoordinates() {
    try {
      if (!!this.observation.location.geo.coordinates) {
        return true;
      }
    } catch (e) { }

    return false;
  }

  getClubLocations() {

  }

  public goTo(location) {
    console.log('LOCATION', location);
    const options = { title: location.name, riseOnHover: true };

    try {
      this.marker.setLatLng(latLng(location.geo.coordinates[0], location.geo.coordinates[1]));
      this.mapCenter = latLng(location.geo.coordinates[0], location.geo.coordinates[1]);
      this.marker.options = options;
    } catch (e) {
      this.marker.setLatLng(latLng(this.userGeo.geo.coordinates[0], this.userGeo.geo.coordinates[1]));
      this.marker.options.title = 'Din plassering fra GPS';
      this.mapCenter = latLng(this.userGeo.geo.coordinates[0], this.userGeo.geo.coordinates[1]);
    }

  }

  private setDefault() {

  }
  public toFloat(val) {
    if (typeof val === 'number') { return val; }

    return parseFloat(val);
  }

  onMapReady(map: Map) {
    console.log('MAP READY');
    this.map = map;

    const options = { title: this.observation.location.name, riseOnHover: true, draggable: true };
    try {
      this.marker = new Marker(latLng(this.observation.location.geo.coordinates[0], this.observation.location.geo.coordinates[1]), options);
    } catch (e) {
      console.log('No location set');
    }

    this.marker.on('dragend', (event) => {
      this.onDragEnd(event, options);
    });
    this.marker.addTo(this.map);
    //this.map.options.layers[1](marker(this.org.locations[0].geo.coordinates[0], this.org.locations[0].geo.coordinates[1]));
  }

  onDragEnd(event, options) {

    const { lat, lng } = event.target.getLatLng();
    console.log('DRAGEND', event);

    this.observation.location.geo = { type: 'Point', coordinates: [this.toFloat(lat), this.toFloat(lng)] };
    this.subject.update(this.observation);

    this.map.panTo(latLng(lat, lng));
    this.marker.remove();
    this.marker = new Marker(latLng(lat, lng), options);
    this.marker.on('dragend', (event) => {
      this.onDragEnd(event, options);
    });
    this.marker.addTo(this.map);
  }


}
