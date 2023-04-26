import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ApiObservationAircraftsItem } from 'app/api/api.interface';
import { Map, Marker, divIcon, icon, MapOptions, LayerOptions, latLng, LatLng, marker, tileLayer, Polyline, polyline, PolylineOptions, FeatureGroup, featureGroup, Control, DrawToolbar } from 'leaflet';
@Component({
  selector: 'nlf-ors-editor-e5x-where-map',
  templateUrl: './ors-editor-e5x-where-map.component.html',
  styleUrls: ['./ors-editor-e5x-where-map.component.css']
})
export class NlfOrsEditorE5XWhereMapComponent implements OnInit, OnChanges {

  /**
   * Input is aircraft top level list of aircraft from observation
   * aircraft.flight holds a list of from-to's including path 
   * 
   */
  @Input() aircraft: ApiObservationAircraftsItem[];
  @Input() lat: number;
  @Input() lng: number;
  @Input() disabled = true;
  @Output() latChange: EventEmitter<any> = new EventEmitter();
  @Output() lngChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();


  map: Map;
  mapOptions: MapOptions = {
    drawControl: false,
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 12,
    center: latLng(59.9, 10.9),
  };

  marker: Marker;
  polylineRoutes: FeatureGroup[];
  drawOptions;
  drawControl;
  mapCenter = latLng(59.9, 10.9);
  layer: FeatureGroup;
  markerLayer: any;

  //colors = ['orange', 'pink', 'purple', 'red', 'darkblue', 'darkgreen', 'black', 'blue', 'cadetblue', , 'gray', 'darkpurple', 'darkred', 'green', 'lightblue', 'lightgray', 'lightgreen', 'lightred', 'beige'];
  colors = ['blue', 'orange', 'green', 'yellow', 'grey', 'black', 'red'];


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!this.map) {
      if (changes.hasOwnProperty('lng')) {
        this.lng = changes['lng']['currentValue'];
      }

      if (changes.hasOwnProperty('lat')) {
        this.lat = changes['lat']['currentValue'];
      }

      this.marker.setLatLng(latLng(this.lat, this.lng));
      this.map.setView(this.marker.getLatLng());
    }
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

  onMapReady(map) {
    // Iterate every aircraft - add to map!
    this.map = map;
    this.layer = featureGroup();

    this.aircraft.forEach((ac, index) => {

      let acColor = this._getColorFromAcIndex(Math.floor(Math.random() * 1000));
      // iterate every flight path add polyline
      ac.flight.forEach((el) => {
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
      this.layer.addLayer(new Marker(latLng(ac.flight.find(x => x !== undefined)['path'][0][1], ac.flight.find(x => x !== undefined)['path'][0][0]), { icon: this._mkIcon(index) }).bindPopup('Take-off ' + ac.aircraft.callsign));
      this.layer.addLayer(new Marker(latLng(ac.flight[(ac.flight.length - 1)]['path'][1][1], ac.flight[(ac.flight.length - 1)]['path'][1][0]), { icon: this._mkIcon(index) }).bindPopup('Landing ' + ac.aircraft.callsign));

    });

    if (!!this.lat && !!this.lng) {

      this.marker = marker(latLng(this.lat, this.lng), { snapIgnore: false, draggable: !this.disabled, autoPan: true, icon: this._mkIcon(6) }).bindPopup('Incident');
      //this.layer.addLayer(this.marker);

      this.marker.addTo(this.map);
      this.marker.pm.enable({ pinning: true, snappable: true });
      this.marker.on('pm:dragend', (event) => {
        this.markerDragEnd(event['target'].getLatLng())
      });

      if (this.aircraft.length === 0) {
        this.map.setView(this.marker.getLatLng(), 12);
      }


    } else {
      this.map.on('click', (event) => {
        if (!this.disabled) {
          this.addMarker(event);
        }
      });
    }

    this.layer.addTo(this.map);

    try {
      this.map.fitBounds(this.layer.getBounds().pad(0.5));
    } catch (e) {
      //this.map.setView(this.marker.getLatLng(),5);
    }
    this.map.invalidateSize();




  }

  markerDragEnd(coordinates) {
    console.log('Marker ended', coordinates);
    this.lat = coordinates.lat;
    this.latChange.emit(this.lat);

    this.lng = coordinates.lng;
    this.lngChange.emit(this.lng);

    this.change.emit(true);


  }
  addMarker(event) {

    //Clear existing marker,
    console.log(event);
    if (this.marker != undefined) {
      this.map.removeLayer(this.marker);
    };

    //Add a marker to show where you clicked.
    //this.marker = marker([event.latlng.lat, event.latlng.lng], { snapIgnore: false, draggable: true, autoPan: true, icon: this._mkIcon(6)}).addTo(this.map);
    this.marker = marker([event.latlng.lat, event.latlng.lng], { snapIgnore: false, draggable: !this.disabled, autoPan: true, icon: this._mkIcon(6) }).bindPopup('Incident');
    this.markerDragEnd({ lat: event.latlng.lat, lng: event.latlng.lng });
    if (this.aircraft.length === 0) {
      this.map.setView(this.marker.getLatLng(), 12);
    }

    this.marker.addTo(this.map);
    this.marker.pm.enable({ pinning: true, snappable: true });

    this.marker.on('remove', (event) => {
      if (!this.disabled) {
        this.map.on('click', (event) => {
          this.addMarker(event);
        });
      }
    });


    this.marker.on('pm:dragend', (event) => {
      this.markerDragEnd(event['target'].getLatLng())
    });



  }

}
