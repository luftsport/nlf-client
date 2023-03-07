import { Component, OnInit, Inject, OnDestroy, ViewChild, TemplateRef, NgZone } from '@angular/core';
//import { NlfConfigService } from 'app/nlf-config.service';
import { ActivatedRoute, RouterLink, Router, NavigationStart } from '@angular/router';
import { LungoOrganizationsService } from 'app/api/lungo-organizations.service';
import { LungoOrganizationsItem, LungoOrganizationsList } from 'app/api/lungo.interface';
import { ApiOptionsInterface, NlfConfigItem } from 'app/api/api.interface';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { GeoLocationService } from 'app/services/geo/geo-location.service';
import { Map, Marker, latLng, marker, tileLayer, markerClusterGroup, LatLng, MapOptions } from 'leaflet';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nlf-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class NlfOrganizationsComponent implements OnInit {
  dataReady: boolean = false;
  orgs: LungoOrganizationsItem[];
  localGeo;

  modalOrg: LungoOrganizationsItem;
  modalRef;
  @ViewChild('modalTemplate', {static: false}) modalTemp: TemplateRef<void>;

  map: Map;
  mapCenter = new LatLng(59.9, 10.9);
  markers = markerClusterGroup();
  options: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 6,
    center: this.mapCenter
  };

  //public config: NlfConfigItem;

  // @TODO - remove config?? Not needed?
  constructor(
    private lungoOrgService: LungoOrganizationsService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private alertService: NlfAlertService,
    private geoLocationService: GeoLocationService,
    private zone: NgZone
    //private configService: NlfConfigService
  ) {

    this.geoLocationService.getLocation({ enableHighAccuracy: true }).subscribe(
      position => {
        console.log(position);
        try {
          this.localGeo = { type: 'Point', coordinates: [position.coords.latitude, position.coords.longitude] };
        } catch (err) {
          console.log('Catched', err);
        }
      },
      err => {
        console.log('ERR Position', err);
      },
      () => {

      }
    );

    router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        if (!!this.modalService.hasOpenModals()) {
          this.modalService.dismissAll();
        }
      });

  }

  ngOnInit() {
    this.getLungoOrganizations();
   
  }

  private mkClusters() {

    for (let i = 0; i < this.orgs.length; i++) {
      try {
        if (!!this.orgs[i].contact?.location?.geo) {
          console.log(this.orgs[i].contact?.location?.geo);

          this.markers.addLayer(
            marker(
              new LatLng(
                this.orgs[i].contact?.location?.geo?.coordinates[1],
                this.orgs[i].contact?.location?.geo?.coordinates[0]
              ),
              { title: this.orgs[i].name, riseOnHover: true }
            ).on('click', () => {this.zone.run(() => this.openModal(this.orgs[i]) ) }));

        }
      } catch (e) {
        console.log('Could not add marker to cluster', e);
      }
    }

    this.map.fitBounds(this.markers.getBounds());
    //this.markers.addTo(this.map);
    // this.map.addLayer(this.markers);
  }

  openModal(org) {
    console.log(org);
    this.modalOrg = org;
    console.log(this.modalTemp);
    this.modalRef = this.modalService.open(this.modalTemp, { size: 'lg', backdrop: 'static', keyboard: false });
    
  }


  public onMapReady(map: Map) {
    this.map = map;

    this.mkClusters();
  }

  private getLungoOrganizations() {
    this.dataReady = false;
    const options: ApiOptionsInterface = {
      query: {
        where: { 'type_id': 6, is_active: {$ne: false}},
        max_results: 10000,
        projection: { id: 1, main_activity: 1, activities: 1, name: 1, contact: 1, type_id: 1, is_active: 1 },
      },
    };
    this.lungoOrgService.getOrganizations(options).subscribe(
      data => {
        this.orgs = data['_items'];
      },
      err => {
        this.alertService.error(err.message);
        this.dataReady = false;
      },
      () => this.dataReady = true
    );
  }
}
