import { ApiAirspacesService } from 'app/api/api-airspaces.service';
import { ApiAirportsService } from 'app/api/api-airports.service';

import { ApiOptionsInterface } from 'app/api/api.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { GeoLocationService } from 'app/services/geo/geo-location.service';
import { Router, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounce } from 'ts-debounce';
import { switchMap } from 'rxjs/operators';

// SEE https://angular-maps.com/api-docs/agm-core/directives/agmpolygon
interface LatLngLiteral {
  lat: number;
  lng: number;
}
@Component({
  selector: 'nlf-aip-airspace',
  templateUrl: './aip-airspace.component.html',
  styleUrls: ['./aip-airspace.component.css']
})
export class NlfAipAirspaceComponent implements OnInit, OnDestroy {

  debouncedBoundsChange = debounce(this.boundsChange, 600);
  polyInfo = {};
  dataReady = false;
  zoom = 8;
  geo: Coordinates;
  modalGeo;

  airports;
  // small \uf140 medium \uf192
  airport_glyphs = {
    large_airport: this.getIcon('\uf072', null, null, 1.1),
    heliport: this.getIcon('\uf05b', null, null, 0.8), //f124'), // fa 5+ '\uf533'),
    small_airport: this.getIcon('\uf072', null, null, 0.75),
    closed: this.getIcon('\uf00d', null, null, 0.8), //\uf057'),
    medium_airport: this.getIcon('\uf072', null, null, 0.9),
    balloonport: this.getIcon('\uf450', null, null, 0.9),
    seaplane_base: this.getIcon('\uf773', null, null, 0.8),
  };

  aircraft_sprite = [
    '<?xml version="1.0"?>',
    '<svg width="26px" height="26px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">',
    '<circle stroke="#222" fill="#800" cx="50" cy="50" r="35"/>',
    '</svg>'
  ].join('\n');
  aircraft_marker = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(this.aircraft_sprite);
  hangglider_marker = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg viewBox="0 0 900 900" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"> \
  <title>Hang glider</title> \
  <description>This Work from openAIP/Butterfly GmbH is licensed under a CC BY-NC-SA license.</description> \
  <g id="Page 1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> \
      <path d="M455,880 C689.72103,880 880,689.72103 880,455 C880,220.27897 689.72103,30 455,30 C220.27897,30 30,220.27897 30,455 C30,689.72103 220.27897,880 455,880 Z M455,880" id="bg_colored" stroke="#4A4A4A" fill-opacity="0.6" fill="#446444"></path> \
      <path d="M446.0077,446 C441.593304,446 438.2128,449.572778 438.457438,453.985511 L442.113717,519.936829 C442.358218,524.347105 446.134396,527.92234 450.554548,527.92234 L458.98472,527.92234 C463.40196,527.92234 467.202291,524.349563 467.473333,519.936829 L471.524237,453.985511 C471.795128,449.575235 468.440395,446 464.021757,446 L446.0077,446 Z M446.0077,446" id="Rectangle 2" stroke="#979797" fill="#000000"></path> \
      <path d="M100.52853,535.038925 C100.52853,535.038925 301.19251,490.800576 455,474.154266 C614.600159,491.275389 820.714261,535.038923 820.714261,535.038923 C820.714261,535.038923 866,531.067183 866,514.323145 C865.999995,480.715092 478.239136,300.999998 455,301 C431.760864,301.000002 44.0000061,492.022705 44,514.323145 C43.9999989,533.084165 100.52853,535.038925 100.52853,535.038925 Z M100.52853,535.038925" id="wing_outer" stroke="#4A4A4A" fill="#3E7300"></path> \
      <path d="M455,450.154266 C582.175309,463.79701 724.781816,509.801453 724.781816,467.892197 C724.781811,425.982941 473.517803,319.999998 455,320 C436.482197,320.000002 184.412066,428.578278 184.412066,467.892197 C184.412059,507.206116 332.440504,463.418662 455,450.154266 Z M455,450.154266" id="wing_inner" stroke="#B6E685" stroke-width="10" fill="#FFFFFF"></path> \
      <path d="M450.208867,475.107758 L450.208867,580.736923 L459.791133,580.736923 L459.791133,475.107758 L450.208867,475.107758 Z M450.208867,475.107758" id="Rectangle 1" stroke="#4A4A4A" fill="#D8D8D8"></path> \
  </g> \
</svg>');

  test = {
    path: 'M801.076 587.554c4.531 8.156 2.719 19.030-5.437 24.467-177.614 135.929-424.099 134.117-599.901-4.531-7.25-6.343-9.062-16.312-4.531-24.467-3.625-6.343-3.625-15.405 1.812-21.749 3.625-4.531 9.968-7.25 15.405-7.25 4.531 0 8.156 1.812 11.781 4.531 17.218 13.593 36.248 26.28 55.278 37.154l154.053-231.080c0-1.812 0.906-4.531 0.906-6.343 0.906-3.625 1.812-7.25 2.719-10.874s1.812-7.25 3.625-11.781c0.906-1.812 1.812-3.625 2.719-5.437s1.812-3.625 2.719-5.437 3.625-7.25 6.343-10.874c2.719-3.625 5.437-7.25 8.156-9.968 1.812-1.812 2.719-2.719 4.531-4.531s2.719-2.719 4.531-3.625 5.437-3.625 8.156-5.437v0l2.719-38.060v-21.749l-6.343-73.402c0-4.531 0.906-11.781 2.719-16.312l24.467-59.809c1.812-4.531 2.719-3.625 1.812 0.906l-7.25 62.527c-0.906 4.531 0 11.781 0.906 16.312l9.968 37.154c0.906 2.719 0.906 6.343 1.812 9.968v0c0-2.719 0.906-5.437 0.906-8.156l9.968-37.154c0.906-5.437 0.906-13.593 0.906-18.124l-7.25-62.527c-0.906-4.531 0-4.531 1.812-0.906l24.467 59.809c1.812 4.531 2.719 11.781 2.719 16.312l-5.437 57.996-0.906 44.404 2.719 29.904c2.719 1.812 5.437 3.625 8.156 5.437 2.719 2.719 5.437 5.437 8.156 9.062s4.531 6.343 7.25 9.968c0.906 0.906 0.906 1.812 1.812 2.719s0.906 1.812 1.812 2.719 1.812 3.625 2.719 5.437c0.906 1.812 1.812 3.625 1.812 5.437 0.906 1.812 0.906 3.625 1.812 5.437 0 0.906 0.906 1.812 0.906 2.719s0.906 1.812 0.906 2.719 0.906 3.625 1.812 5.437c0 1.812 0.906 3.625 0.906 5.437s0.906 3.625 0.906 5.437c0 0.906 0 1.812 0 1.812l154.053 231.986c16.312-9.062 31.717-19.936 46.216-30.811 8.156-6.343 20.842-4.531 27.186 3.625 3.625 8.156 3.625 17.218 0 23.561zM520.156 309.352c-2.719-0.906-5.437-0.906-7.25-0.906 0 0 0 0 0 0l-0.906 0.906c6.343 4.531 12.687 11.781 11.781 23.561 0 11.781-10.874 21.749-22.655 20.842-11.781 0-21.749-10.874-20.842-22.655 0-11.781 7.25-18.124 12.687-22.655l-0.906-0.906c-0.906 0-1.812 0-2.719 0-1.812 0-3.625 0-6.343 0.906 0 0-0.906 0-0.906 0l-10.874 16.312-115.087 307.2c93.338 30.811 194.832 30.811 288.17-0.906l-100.588-285.451-23.561-36.248zM342.542 626.52l92.432-244.673-146.804 221.112c18.124 9.062 36.248 17.218 54.372 23.561zM577.246 396.347l80.651 230.173c19.030-7.25 37.154-15.405 55.278-25.373l-135.929-204.8z',
    strokeColor: '5bbfcc',
    strokeOpacity: 1,
    strokeWeight: 1,
    fillColor: '#004465',
    fillOpacity: 1,
    rotation: 180,
    scale: 0.03
  };
  paths: any; //Array<Array<LatLngLiteral>>;
  modalRef;

  boundsBox;
  boundsPoly;
  currentZoom = this.zoom;

  constructor(private airspace: ApiAirspacesService,
    private airport: ApiAirportsService,
    private geoLocationService: GeoLocationService,
    private modalService: NgbModal,
    private router: Router) {

    this.paths = [];
    router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        if (!!this.modalService.hasOpenModals()) {
          this.modalService.dismissAll();
        }
      });
  }

  ngOnInit() {
    this.geoLocationService.getLocation({ enableHighAccuracy: true }).subscribe(
      position => {
        console.log('POSITION', position);
        this.geo = position;
        this.dataReady = true;
      },
      err => {
        console.log(err);
      }
    );
  }

  // Trackers
  public trackAirport(index, item) {
    return item.icao;
  }

  public trackAirspaces(index, item) {
    return item.id;
  }

  ngOnDestroy() {
    this.paths = [];
    this.airports = [];
    this.dataReady = false;
  }

  mapReady(event) {
    console.log('Map ready', event);


  }

  zoomChanged(event) {
    console.log('Zoom changed', event);
    this.currentZoom = +event;
  }

  boundsChange(event) {
    console.log('Bounds changed', event);
    let keys = Object.keys(event);
    const ma = event[keys[0]];
    const ga = event[keys[1]];

    let ga_keys = Object.keys(ga);
    let ma_keys = Object.keys(ma);
    this.boundsBox = [
      [ga[ga_keys[1]], ma[ma_keys[1]] ],
      [ ga[ga_keys[0]], ma[ma_keys[0]] ]
    ];
    this.boundsPoly = [
      [ga[ga_keys[1]], ma[ma_keys[1]]],
      [ga[ga_keys[1]], ma[ma_keys[0]]],
      [ga[ga_keys[0]], ma[ma_keys[0]]],
      [ga[ga_keys[0]], ma[ma_keys[1]]],
      [ga[ga_keys[1]], ma[ma_keys[1]]]
    ];
    //this.boundsBox = [[ga.j, ma.j], [ga.l, ma.l]];
    //this.boundsPoly = [[ga.j, ma.j], [ga.j, ma.l], [ga.l, ma.l], [ga.l, ma.j], [ga.j, ma.j]];
    console.log('New bounds box', this.boundsBox);
    this.getAirspaces();
    this.getAirports();

  }

  centerPoint(arr) {
    const x = arr.map(x => x['lat']);
    const y = arr.map(x => x['lng']);
    const cx = (Math.min(...x) + Math.max(...x)) / 2;
    const cy = (Math.min(...y) + Math.max(...y)) / 2;
    return [cx, cy];
  }

  public polyClicked(polygon, template) {

    this.modalGeo = this.centerPoint(polygon.paths[0]);
    this.polyInfo = polygon;
    this.modalRef = this.modalService.open(template, { size: 'lg' });

  }

  getIcon(glyph: string, color?: string, opacity?: number, scale?: number) {
    let canvas, ctx;
    canvas = document.createElement('canvas');
    canvas.width = canvas.height = 20;
    ctx = canvas.getContext('2d');
    if (color) {
      ctx.strokeStyle = color;
    }
    let s = 20;
    if (scale) {
      ctx.scale = scale;
      s = 20 * scale;
    }

    if (opacity) {
      ctx.fillOpacity = opacity;
    }
    // '20px FontAwesome'
    // '60 px nlf'
    ctx.font = s + 'px FontAwesome';
    ctx.fillText(glyph, 0, 16);
    ctx.rotation = 90;
    return canvas.toDataURL();
  }



  getAirports() {
    /**
        "location" : {
          "type" : "Point",
          "coordinates" : {
              "0" : 10.258600235,
              "1" : 59.1866989136,
              "2" : 286.0

 seaplane_base
      }**/
    let zoomList = ['large_airport'];
    if (this.currentZoom > 6) {
      zoomList = ['balloonport', 'seaplane_base', 'closed', 'small_airport', 'heliport', 'medium_airport', 'large_airport'];
    } else if (this.currentZoom <= 6 && this.currentZoom >= 4) {
      zoomList = ['large_airport', 'medium_airport'];
    } else if (this.currentZoom < 4) {
      zoomList = ['large_airport'];
    }
    const options: ApiOptionsInterface = {
      query: {
        where: {
          //iso_country: { '$in': ['NO', 'SE', 'DK', 'FI'] }, // { $in: ['NO', 'SE', 'FI', 'DK', 'IS'] },
          type: { $in: zoomList },
          location: { $geoWithin: { $box: this.boundsBox } }
        },
        max_results: 1000
      }
    };

    this.airport.getAirports(options).subscribe(
      airports => {
        this.airports = airports['_items'];
      },
      err => console.log(err));

  }

  getAirspaces() {


    const options: ApiOptionsInterface = {
      query: {
        where: {
          //country: { $in: ['NO', 'SE', 'FI', 'DK', 'IS'] },
          //geometry: {$geoWithin: { $geometry: { type: 'Polygon', coordinates: [this.boundsPoly] } }}
          geometry: { $geoIntersects: { $geometry: { type: 'Polygon', coordinates: [this.boundsPoly] } } },
          //category: 'RESTRICTED', // DANGER, RESTRICTED, D, C etc
          //ype: {$in: ['CTA', 'TMA', 'TIZ', 'TIA', 'CTR']}, // CTA TMA TIZ TIA CTR
          /**
          geometry: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [this.geo.coords.longitude, this.geo.coords.latitude]
              },
              $maxDistance: 100000
            }
          }
           */
        },
        sort: [{ 'altlimit_top.altitude': -1 }],
        max_results: 1000
      }
    };

    this.airspace.getAirspaces(options).subscribe(
      data => {
        this.paths = [];
        data['_items'].forEach(asp => {
          let tmp = [];
          let color = 'black';
          let opacity = 0.2;
          asp.geometry.coordinates[0].forEach(c => {

            tmp.push({ lat: c[1], lng: c[0] });
          });
          if (asp.type === 'TMA') { color = 'red'; }
          else if (asp.type === 'CTR') { color = 'lime'; }
          else if (asp.category === 'DANGER') { color = 'red'; opacity = 0.5; }
          else {
            color = 'black';
            opacity = 0.2;
          }
          this.paths.push({
            id: asp.id,
            name: asp.name,
            type: asp.type,
            category: asp.category,
            color: color,
            opacity: 0.2,
            altlimit_top: asp.altlimit_top,
            altlimit_bottom: asp.altlimit_bottom,

            paths: [tmp]
          });

        });

      },
      err => console.log(err),

    );

  }







}
