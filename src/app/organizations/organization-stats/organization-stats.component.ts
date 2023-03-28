import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfConfigItem, ApiOptionsInterface, ApiPersonInterface } from 'app/api/api.interface';
import { LungoPersonsItem } from 'app/api/lungo.interface';
import { MapOptions, Layer, latLng, marker, tileLayer, Map, FeatureGroup } from 'leaflet';
import { LungoPersonsService } from 'app/api/lungo-persons.service';
//import { heatLayer, HeatMapOptions } from 'leaflet.heat';
import * as L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js'

@Component({
  selector: 'nlf-organization-stats',
  templateUrl: './organization-stats.component.html',
  styleUrls: ['./organization-stats.component.css']
})
export class NlfOrganizationStatsComponent implements OnInit {

  org_id: number;
  sub;
  public config: NlfConfigItem;

  map: Map;
  mapOptions: MapOptions = undefined;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private configService: NlfConfigService,
    private personService: LungoPersonsService
  ) {

    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
      }
    );

    this.sub = this.route.parent.params.subscribe(
      params => {
        this.org_id = +params['id'];
        this.configureMap();
      });

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private configureMap() {

    try {
      this.mapOptions = {
        layers: [
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
          //L.marker([63, 9], {title: 'Møllergata 39'})
        ],
        zoom: 5,
        center: L.latLng(63, 9)
      }

    } catch (e) { }

  }

  onMapReady(map: Map) {
    this.map = map
    let options: ApiOptionsInterface = {
      query: {
        where: {
          'address.location': { '$exists': true },
          '_merged_to': { '$exists': false }
          //'memberships.activity': {$in: [238]} // fallskjerm

        },
        // sort: [{ name: 1 }],
        max_results: 100000,
        projection: { id: 1 },

      },
    };

    if (Object.keys(this.config.activity_orgs).map(Number).indexOf(this.org_id) > -1) {
      options.query.where['federation.activity'] = this.config.activity_orgs[this.org_id];
    } else if (this.org_id === 376) {
      options.query.where['federation.activity'] = 27;
    } else {
      options.query.where['memberships.discipline'] = this.org_id;
    }

    this.personService.getUsers(options).subscribe(
      (data) => {
        let users = data._items.map(
          (item) => {
            try {
              return L.latLng(item.address.location.geo.coordinates[1], item.address.location.geo.coordinates[0]);
            } catch (e) { }
          }
        ).filter((latlngs) => { return latlngs !== undefined });

        console.log(users);
        let heatOptions: L.HeatMapOptions = {
          minOpacity: 0.4, //?: number | undefined;
          maxZoom: 20, // ?: number | undefined;
          max: 1, // number | undefined;
          radius: 15, //number | undefined;
          blur: 15, //?: number | undefined;
          //gradient: 'red', //?: ColorGradientConfig | undefined;
        }
        L.heatLayer(users, heatOptions).addTo(map);
      }
    )

    //this.map.setView([this.lungo.contact.location?.geo.coordinates[1], this.lungo.contact.location?.geo.coordinates[0]], 7);
  }

}
