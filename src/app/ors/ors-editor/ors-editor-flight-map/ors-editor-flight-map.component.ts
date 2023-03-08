import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GeoLocationService } from 'app/services/geo/geo-location.service';
import { ApiLocationsService } from 'app/api/api-locations.service';
import { ApiLocationItem, NlfConfigItem } from 'app/api/api.interface';
import { NlfConfigService } from 'app/nlf-config.service';
import { forkJoin } from 'rxjs';

import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import { Map, Marker, MapOptions, LayerOptions, latLng, LatLng, marker, tileLayer, Polyline, polyline, PolylineOptions, FeatureGroup, featureGroup, Control, DrawToolbar } from 'leaflet';

@Component({
  selector: 'nlf-ors-editor-flight-map',
  templateUrl: './ors-editor-flight-map.component.html',
  styleUrls: ['./ors-editor-flight-map.component.css']
})
export class NlfOrsEditorFlightMapComponent implements OnInit {

  @Input() flight: [];
  /*{
    route: Polyline,
    event?: LatLng,
    takeoff?: LatLng,
    landing?: LatLng
  };*/
  @Output() flightChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() editable: boolean = true;

  userGeo = { geo: { type: 'Point', coordinates: [59.9, 10.9] } };
  public config: NlfConfigItem;

  currentLocation: ApiLocationItem;

  map: L.Map;
  mapOptions: L.MapOptions = {
    drawControl: false,
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 12,
    center: latLng(59.9, 10.9),
  };

  route = [];
  markers: FeatureGroup; //Marker[] = [];
  polylineRoute: FeatureGroup;
  drawOptions;
  drawControl;
  mapCenter = latLng(59.9, 10.9);
  currentMarkerLayer: Marker;
  currentMarkerOptions: Object;
  incidentMarker: Marker;

  constructor(
    private configService: NlfConfigService,
    private geoLocationService: GeoLocationService

  ) {
    forkJoin([

      this.configService.observableConfig.subscribe(
        data => {
          this.config = data;
        }
      ),
      this.geoLocationService.getLocation({ enableHighAccuracy: true }).subscribe(
        position => {

          this.userGeo['geo']['coordinates'] = [position.coords.latitude || 59.9, position.coords.longitude || 10.9];
          this.currentLocation = this.userGeo;
          console.log(position);

        },
        err => {
          console.log('ERR Position', err);
        },
        () => {
        }
      )
    ]);
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes) {
    console.log('ON CHANGE', changes);
    //this.updatePolyline();
    if (!!this.map) {
      //this.flight = changes['currentValue'];
      this.updatePolyline();
    }
  }

  public updatePolyline() {
    console.log("FLIGHT IN MAP COMPONENT", this.flight);
    this.route = [];
    try {
      this.markers.remove();
      this.polylineRoute.remove();

    } catch (e) { }

    for (let i = 0; i < this.flight.length; i++) {
      try {
        this.route.push([this.flight[i]['path'][0][1], this.flight[i]['path'][0][0]]);
        this.route.push([this.flight[i]['path'][1][1], this.flight[i]['path'][1][0]]);
      } catch (e) { }
    }

    if (this.flight.length > 0) {
      this.markers = featureGroup([
        new Marker(latLng(this.flight.find(x => x !== undefined)['path'][0][1], this.flight.find(x => x !== undefined)['path'][0][0])).bindPopup('Take-off'),
        new Marker(latLng(this.flight[(this.flight.length - 1)]['path'][1][1], this.flight[(this.flight.length - 1)]['path'][1][0])).bindPopup('Landing')
      ]).addTo(this.map);

    }
    //this.markers.forEach(marker => marker.addTo(this.map));

    console.log('ROUTE', this.route);

    let section = L.polyline(this.route, {
      color: 'red',
      weight: 2,
      opacity: 1,
      smoothFactor: 1,
    });

    this.polylineRoute = L.featureGroup([section], { pmIgnore: false, snapIgnore: false }).addTo(this.map);


    this.map.fitBounds(this.polylineRoute.getBounds());

  }

  addMarker(event) {

    //Clear existing marker,
    console.log(event);
    if (this.incidentMarker != undefined) {
      this.map.removeLayer(this.incidentMarker);
    };

    //Add a marker to show where you clicked.
    this.incidentMarker = L.marker([event.latlng.lat, event.latlng.lng], { snapIgnore: false }).addTo(this.map);
  }


  public onMapReady(map: L.Map) {
    this.map = map;
    this.updatePolyline();

    // @TODO
    //preventMarkerRemoval: true - on layer!

    this.polylineRoute.on('pm:update', (event) => {

      console.log('UPDATE', event, (event.layer as Polyline).getLatLngs());

    });

    this.map.on('pm:create', (e) => {
      L.PM.reInitLayer(e.layer);
    });

    // Editable stuff
    if (this.editable) {

      /**
      this.map.on('click', (event) => {
        this.addMarker(event);
      });
       */

      const opts = {
        //position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
        drawMarker: false, // adds button to draw markers
        drawPolygon: false, // adds button to draw a polygon
        drawPolyline: false, // adds button to draw a polyline
        drawCircle: false, // adds button to draw a cricle
        drawCircleMarker: false, // adds button to draw a cricleMarker
        drawRectangle: false, // adds button to draw a rectangle
        cutPolygon: false, // adds a button to cut layers
        dragMode: false, // adds button to toggle global move mode
        deleteLayer: false, // adds a button to delete layers
        editMode: true, // adds button to toggle global edit mode
        rotateMode: false,
        drawText: false,

      };
      this.map.pm.addControls(opts);
    }
    //this.map.on('draw:editvertex', (event) => { console.log('DRAW EDIT VERTEX', event); });

    // Adding marker via tools programmatically
    // this.map.pm.Toolbar.copyDrawControl('drawMarker',{name: "infoMarker"});
  }

  onDrawEdited(event) {
    console.log('EDITED', event, this.polylineRoute.getLayers());
  }

  onDrawEditVertex(event) {
    console.log('VERTEX', event, this.polylineRoute);
  }

}
