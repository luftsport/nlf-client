import { Component, OnInit, Input } from '@angular/core';
import { ApiObservationAircraftsItem } from 'app/api/api.interface';
import { Map, Marker, MapOptions, LayerOptions,icon, latLng, LatLng, marker, tileLayer, Polyline, polyline, PolylineOptions, FeatureGroup, featureGroup, Control, DrawToolbar } from 'leaflet';

@Component({
  selector: 'nlf-ors-report-flight-map',
  templateUrl: './report-flight-map.component.html',
  styleUrls: ['./report-flight-map.component.css']
})
export class NlfOrsReportFlightMapComponent implements OnInit {

  /**
   * Input is aircraft top level list of aircraft from observation
   * aircraft.flight holds a list of from-to's including path
   *
   */
  @Input() aircraft: ApiObservationAircraftsItem[];
  @Input() where: [number, number];

  map: Map;
  mapOptions: MapOptions = {
    drawControl: false,
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 12,
    center: latLng(59.9, 10.9),
  };

  markers: FeatureGroup[]; //Marker[] = [];
  polylineRoutes: FeatureGroup[];
  drawOptions;
  drawControl;
  mapCenter = latLng(59.9, 10.9);
  layer: FeatureGroup;

  //colors = ['orange', 'pink', 'purple', 'red', 'darkblue', 'darkgreen', 'black', 'blue', 'cadetblue', , 'gray', 'darkpurple', 'darkred', 'green', 'lightblue', 'lightgray', 'lightgreen', 'lightred', 'beige'];
  colors = ['blue', 'orange', 'green', 'yellow', 'grey', 'black', 'red'];


  constructor() { }

  ngOnInit(): void {
  }

  private _mkIcon(index) {
    return icon({
      iconUrl: 'assets/leaflet/' + this._getColorFromAcIndex(index) + '.png',
      shadowUrl: 'leaf-shadow.png',
      iconSize: [25, 39],
      shadowSize: [25, 39],
      iconAnchor: [12.5, 39],
      shadowAnchor: [4, 39],
      popupAnchor: [0, -40]
    });

  }

  _getColorFromAcIndex(index) {
    return this.colors[index] || this.colors[0];
  }

  _path2LatLng(path) {
    let coordinates = [];
    path.forEach(element => {
      coordinates.push(latLng(element[1], element[0]));
    });
    return coordinates;
  }

  onMapReady(map) {
    // Iterate every aircraft - add to map!
    this.map = map;
    this.layer = featureGroup();

    this.aircraft.forEach((ac, index) => {

      let acColor = this._getColorFromAcIndex(Math.floor(Math.random() * 1000));
      // iterate every flight path add polyline
      ac.flight.forEach((el) => {
        console.log('Adding layers');
        this.layer.addLayer(
          polyline(this._path2LatLng(el.path), {
            color: this._getColorFromAcIndex(index),
            weight: 2,
            opacity: 1,
            smoothFactor: 1,
          })
        );
      });

      // Add markers take-off and landing for each aircraft:
      const flight = ac.flight.find(x => x !== undefined);
      if (flight && flight.path) {
        this.layer.addLayer(new Marker(latLng(flight['path'][0][1], flight['path'][0][0]), {icon: this._mkIcon(index)}).bindPopup('Take-off ' + ac.aircraft.callsign));
        this.layer.addLayer(new Marker(latLng(ac.flight[(ac.flight.length - 1)]['path'][1][1], ac.flight[(ac.flight.length - 1)]['path'][1][0]), {icon: this._mkIcon(index)}).bindPopup('Landing ' + ac.aircraft.callsign));
      }
    });

    this.layer.addLayer(new Marker(latLng(this.where[0], this.where[1]), {icon: this._mkIcon(6)}).bindPopup('Incident'));

    this.layer.addTo(this.map);
    this.map.fitBounds(this.layer.getBounds().pad(0.5));
    this.map.invalidateSize();


  }

}
