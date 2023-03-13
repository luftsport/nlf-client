import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { LungoOrganizationsService } from 'app/api/lungo-organizations.service';
import { LungoOrganizationsItem } from 'app/api/lungo.interface';
import { ApiClubsService } from 'app/api/api-clubs.service';
import { ApiClubItem, ApiOptionsInterface, NlfConfigItem } from 'app/api/api.interface';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { GeoLocationService } from 'app/services/geo/geo-location.service';
import { NlfConfigService } from 'app/nlf-config.service';
import { MapOptions, Layer, latLng, marker, tileLayer, Map } from 'leaflet';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
// import { forkJoin } from 'rxjs';

@Component({
  selector: 'nlf-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.css']
})
export class NlfOrganizationDetailsComponent implements OnInit, OnDestroy {

  faUpload = faUpload;

  geo: { timestamp: number, coords: number[] };
  zoom = 12;
  map: Map;

  organization_id: number = 376;
  federation_id: number = 0;
  disciplines = [];


  lungo: LungoOrganizationsItem;
  local_org: ApiClubItem;
  dataReady = false;

  public config: NlfConfigItem;


  sub;

  mapOptions: MapOptions = undefined;
  mapLayers: Layer = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lungoOrgService: LungoOrganizationsService,
    private orgService: ApiClubsService,
    private alertService: NlfAlertService,
    private geoLocationService: GeoLocationService,
    private configService: NlfConfigService
  ) {
    /**
    this.sub = this.router.routerState.parent(this.route)
      .params.subscribe(params => {
        this.org_id = +params['id'];
        this.getOrg();
      });**/
    //this.route.params.subscribe(params =>
    //this.sub = this.router.routerState.parent(this.route).params.subscribe(

    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
        this.sub = this.route.parent.params.subscribe(
          params => {
            this.organization_id = params['id'] ? +params['id'] : 376;
            //this.version = params['version'] ? params['version'] : 0;
            this.dataReady = false;
            this.federation_id = 0;
            this.lungo = null;
            this.disciplines = [];
            this.getLungoOrganization();
          });
        
      }
    );

    
  }

  ngOnInit() {
    this.geoLocationService.getLocation({ enableHighAccuracy: true }).subscribe(
      position => {
        console.log(position);
        this.geo = position; // {{ geo.coords.latitude }} {{ geo.coords.longitude }}
      });

    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private configureMap() {

    try {
      this.mapOptions = {
        layers: [
          tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
          marker([this.lungo.contact.location.geo.coordinates[1], this.lungo.contact.location.geo.coordinates[0]])
        ],
        zoom: 7,
        center: latLng(this.lungo.contact.location.geo.coordinates[1], this.lungo.contact.location.geo.coordinates[0])
      }

    } catch (e) {}

  }

  onMapReady(map: Map) {
    this.map = map
    this.map.setView([this.lungo.contact.location?.geo.coordinates[1], this.lungo.contact.location?.geo.coordinates[0]], 7);
  }


  private getLungoOrganization() {
    this.mapOptions = undefined;
    this.lungoOrgService.getOrganization(this.organization_id).subscribe(
      data => {
        this.lungo = data;
        this.configureMap();

        if (!!data.main_activity?.id && (data.type_id === 6 || data.type_id === 14 || data.type_id === 5)) {
          this.federation_id = this.config[this.config.inv_mapping[data.main_activity.id]]['org_id'];
        } else {
          this.federation_id = 0;

          // Clubs -> grener under seksjon!
          if (data.type_id == 19) {
            const options: ApiOptionsInterface = {
              query: {
                where: {
                  'main_activity.id': data.main_activity.id,
                  type_id: 14,
                  is_active: true
                },
                sort: [{ name: 1 }],
                max_results: 1000,
                projection: { id: 1 },

              },
            }
            this.lungoOrgService.getOrganizations(options).subscribe(
              data => {
                this.disciplines = data['_items'];
              }
            )
          }
        }
      },
      err => {
        this.alertService.error(err.message);
        this.dataReady = false;
      },
      () => this.dataReady = true
    );
  }
}
