import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef, TemplateRef, AfterViewInit } from '@angular/core';
import { ApiNlfClubsService } from 'app/api/api-nlf-clubs.service';
import { ApiLocationsService } from 'app/api/api-locations.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeoLocationService } from 'app/services/geo/geo-location.service';
import { ApiLocationItem, NlfConfigItem } from 'app/api/api.interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { debounce } from 'ts-debounce';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { NlfConfigService } from 'app/nlf-config.service';
import { ConfirmService } from 'app/services/confirm/confirm.service';
import { forkJoin } from 'rxjs';
import { faArrowsAlt, faCrosshairs, faPlus, faRefresh, faMapMarker, faTimes, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Map, Marker, MapOptions, LayerOptions, latLng, LatLng, marker, tileLayer } from 'leaflet';


import { BarVerticalStackedComponent, HeatMapModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'nlf-organization-locations',
  templateUrl: './organization-locations.component.html',
  styleUrls: ['./organization-locations.component.css']
})
export class NlfOrganizationLocationsComponent implements OnInit, OnDestroy, AfterViewInit {

  //@ViewChild("modal", { static: true }) _template: TemplateRef<void>;
  @ViewChild(TemplateRef, { static: true }) _template: TemplateRef<Object>;
  faArrowsAlt = faArrowsAlt;
  faCrosshairs = faCrosshairs;
  faPlus = faPlus;
  faRefresh = faRefresh;
  faMapMarker = faMapMarker;
  faCheck = faCheck;
  faTimes = faTimes;
  faEdit = faEdit;

  org_id: number;
  org
  sub;
  modalRef;
  modalIndex: number = 0;
  modalValue: ApiLocationItem;

  currentLocation: ApiLocationItem;

  map: Map;
  mapOptions: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 12
  };

  mapCenter: LatLng;
  currentMarkerLayer: Marker;
  currentMarkerOptions: Object;

  // Modal map
  modalMap: Map;
  modalMapOptions: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 9
  };
  currentModalMarkerLayer: Marker;

  locationTypes: [];
  returl: string;

  fitBounds: boolean = true;

  zoom: number = 17;
  userGeo = { geo: { type: 'Point', coordinates: [59.9, 10.9] } };

  types = [
    { key: 'landing_area', val: 'Landingsområde' },
    { key: 'landing_area_out', val: 'Landingsområde Innhopp' },
    { key: 'club_house', val: 'Klubbhus' },
    { key: 'airstrip', val: 'Rullebane' },
    { key: 'taxi_way', val: 'Taxi bane' }
  ];

  public config: NlfConfigItem;

  public debouncedSaveLocations = debounce(this.saveLocations, 3000);

  constructor(
    private orgService: ApiNlfClubsService,
    private router: Router,
    private route: ActivatedRoute,
    private locationsService: ApiLocationsService,
    private modalService: NgbModal,
    private geoLocationService: GeoLocationService,
    private alertService: NlfAlertService,
    private confirmService: ConfirmService,
    private configService: NlfConfigService
  ) {

    forkJoin([
      this.sub = this.route.parent.params.subscribe(params => {
        this.org_id = +params['id'];
      }),
      this.configService.observableConfig.subscribe(
        data => {
          this.config = data;
          this.getOrg();
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


    this.route.queryParams.subscribe(
      params => { this.returl = params['returl'] }
    );



    /**
    this.route.params.subscribe(params => {
      this.org_id = params['id'] ? params['id'] : 0;
      this.getOrg();
      //this.app.setTitle('Organization locations edit');
    });**/
  }

  ngOnInit() {

    if (!this.currentLocation) {
      this.currentLocation = this.userGeo;

    }
  }

  ngAfterViewInit() {
    console.log('TEMPLATE', this._template);
  }

  onMapReady(map: Map) {
    this.map = map;
    console.log(map);
    const options = { title: this.org.name, riseOnHover: true };
    this.mapReset();
    // this.currentMarkerLayer = new Marker(latLng(this.org.locations[0].geo.coordinates[0], this.org.locations[0].geo.coordinates[1]), options);
    //this.currentMarkerLayer.addTo(this.map);

    //this.map.options.layers[1](marker(this.org.locations[0].geo.coordinates[0], this.org.locations[0].geo.coordinates[1]));
  }

  public goTo(location) {
    console.log('LOCATION', location);
    const options = { title: location.name, riseOnHover: true };
    
    try {
    this.currentLocation = location;
    this.mapCenter = latLng(location.geo.coordinates[0], location.geo.coordinates[1]);
    } catch (e) {
      this.currentLocation = this.userGeo;
      this.mapCenter = latLng(this.userGeo.geo.coordinates[0], this.userGeo.geo.coordinates[1]);
    }
    try {
      this.currentMarkerLayer.remove();
    } catch (e) { }

    this.currentMarkerLayer = new Marker(this.mapCenter, options);
    console.log(this.currentMarkerLayer);

    // Edit?
    this.currentMarkerLayer.addTo(this.map);
    /**
    .on('click',
    (event) => {
      for (let i = 0; i < this.org.locations.length; i++) {
        console.log(this.org.locations[i].name, location.name);
        if (this.org.locations[i].name == location.name) {
          console.log('VALUE', this._template);
          this.openModal(this._template, i);
          break;
        }
      }
    });**/
    //.on('click', function(e) {
    // 
    //});
  }

  public mapReset() {

    this.goTo(this.org.locations[0]);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getFederation(activity) {
    return this.config[this.config.inv_mapping[this.org]]['org_id'];
  }


  public drop(event) {
    console.log('DROP EVENT', event);
    moveItemInArray(this.org.locations, event.previousIndex, event.currentIndex);
    this.debouncedSaveLocations();
  }


  public toFloat(arg) {
    return parseFloat(arg);
  }

  private getOrg() {
    this.orgService.getClub(this.org_id).subscribe(
      data => {
        this.org = data;
        console.log(this.org);

        try {
          this.mapOptions.center = latLng(this.org.locations[0].geo.coordinates[0], this.org.locations[0].geo.coordinates[1]);

        } catch (e) {
          console.error("Error setting coordinates", e);
        }
      },
      err => console.log(err),
      () => { }
    );
  }

  public saveLocations() {
    this.orgService.save(this.org._id, { locations: this.org.locations }, this.org._etag).subscribe(
      data => {
        this.org._etag = data._etag;
        this.alertService.success('Locations saved', false, true, 5);
      },
      err => {
        console.log('ERR saving', err);
        this.alertService.error('Locations could not be saved', false, true, 5);
      },
      () => { }
    );

  }

  public deleteLocation(idx) {

    const confirmMsg = {
      title: 'Please confirm',
      message: 'Are you sure you want to delete the location?',
      yes: 'Delete',
      no: 'Cancel'
    };
    this.confirmService.confirm(confirmMsg).then(
      () => {
        if (idx < this.org.locations.length) {
          this.org.locations.splice(idx, 1);
          this.saveLocations();
        }
      },
      () => { }
    );


  }

  public onLocationSelected(event) {
    this.modalValue = event;
    if (!!this.modalValue) {

      if (!this.modalValue.nickname) {
        this.modalValue['nickname'] = this.modalValue.name;
      }
    }
    this.modalMap.panTo(latLng(this.modalValue.geo.coordinates[0], this.modalValue.geo.coordinates[1]));
    this.currentModalMarkerLayer.remove();
    const options = { title: this.org.name, riseOnHover: true, draggable: true };
    this.currentModalMarkerLayer = new Marker(latLng(this.modalValue.geo.coordinates[0], this.modalValue.geo.coordinates[1]), options);
    this.currentModalMarkerLayer.addTo(this.modalMap);
  }

  public openModal(template, idx) {
    console.log("MODAL", template, idx);
    console.log(this.org.locations[idx]);
    this.modalIndex = idx;
    if (idx == this.org.locations.length) {
      /*
      "icao": "ENTO",
    "municipality": "Tønsberg",
    "geo_type": "Flyplass",
    "name": "Jarlsberg flyplass",
    "county": "Vestfold",
    "geo": {
      "coordinates": [
        "59.300875",
        "10.366902777777778"
      ],
      "type": "Point"
    },
    "nickname": "Jarlsberg"
    */
      this.modalValue = { nickname: undefined, name: undefined, icao: undefined, geo_type: undefined, geo: undefined, municipality: undefined, county: undefined };
      this.modalValue['geo'] = this.currentLocation.geo;
    } else {
      this.modalValue = this.org.locations[idx];
    }

    // Modal map)" [longitude]="toFloat()
    try {
    this.modalMapOptions.center = latLng(this.modalValue.geo.coordinates[0], this.modalValue.geo.coordinates[1]);
    } catch (e) {
      this.modalMapOptions.center = latLng(this.userGeo.geo.coordinates[0], this.userGeo.geo.coordinates[1]);
    }


    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
    console.log(this.modalRef);
  }

  public updateLocation(event) {
    console.log("Update Location func", event);

    if (!!this.modalValue) {
      this.modalValue.geo = { type: 'Point', coordinates: [event.coords.lat, event.coords.lng] };
    }

    
  }


  public modalUpdate(idx) {
    if (idx == this.org.locations.length) {
      this.org.locations.push(this.modalValue);
    } else {
      this.org.locations[idx] = this.modalValue;
    }
    this.saveLocations();

    this.modalValue = undefined;
    this.modalRef.close();
    this.goTo(this.org.locations[idx]);
  }

  onModalMapReady(map: Map) {
    this.modalMap = map;
    console.log(map);
    const options = { title: this.org.name, riseOnHover: true, draggable: true };
    try {
    this.currentModalMarkerLayer = new Marker(latLng(this.modalValue.geo.coordinates[0], this.modalValue.geo.coordinates[1]), options);
    } catch (e) {
      this.currentModalMarkerLayer = new Marker(latLng(this.userGeo.geo.coordinates[0], this.userGeo.geo.coordinates[1]), options);
    }

    this.currentModalMarkerLayer.on('dragend', (event) => {
      if (!!this.modalValue) {
        console.log('DRAGEND', event);
        this.modalValue.geo = { type: 'Point', coordinates: [event.target._latlng.lat, event.target._latlng.lng] };
        this.modalMap.panTo(latLng(event.target._latlng.lat, event.target._latlng.lng));
        this.currentModalMarkerLayer.remove();
        this.currentModalMarkerLayer = new Marker(latLng(event.target._latlng.lat, event.target._latlng.lng), options);
        this.currentModalMarkerLayer.addTo(this.modalMap);
      }
    });

    this.currentModalMarkerLayer.addTo(this.modalMap);

    //this.map.options.layers[1](marker(this.org.locations[0].geo.coordinates[0], this.org.locations[0].geo.coordinates[1]));
  }

}
