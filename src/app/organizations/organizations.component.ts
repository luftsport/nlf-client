import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
//import { NlfConfigService } from 'app/nlf-config.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { LungoOrganizationsService } from 'app/api/lungo-organizations.service';
import { LungoOrganizationsItem, LungoOrganizationsList } from 'app/api/lungo.interface';
import { ApiOptionsInterface, NlfConfigItem } from 'app/api/api.interface';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { GeoLocationService } from 'app/services/geo/geo-location.service';

@Component({
  selector: 'nlf-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class NlfOrganizationsComponent implements OnInit {
  dataReady: boolean = false;
  orgs: LungoOrganizationsItem[];
  localGeo;
  //public config: NlfConfigItem;

  // @TODO - remove config?? Not needed?
  constructor(
    private lungoOrgService: LungoOrganizationsService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: NlfAlertService,
    private geoLocationService: GeoLocationService,
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

  }

  ngOnInit() {
    this.getLungoOrganizations();
  }

  public toFloat(arg) {
    return parseFloat(arg);
  }

  private getLungoOrganizations() {
    this.dataReady = false;
    const options: ApiOptionsInterface = {
      query: {
        where: { 'type_id': 14 },
        max_results: 1000,
        projection: { id: 1, main_activity: 1, activities: 1, name: 1, contact: 1 },
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
