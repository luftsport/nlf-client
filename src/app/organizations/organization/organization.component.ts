import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfConfigItem } from 'app/api/api.interface';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { LungoOrganizationsService } from 'app/api/lungo-organizations.service';
import { LungoOrganizationsItem } from 'app/api/lungo.interface';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { faSitemap, faHome, faMap, faMapMarker, faDashboard, faPieChart, faPlane } from '@fortawesome/free-solid-svg-icons';
// import { forkJoin } from 'rxjs';

@Component({
  selector: 'nlf-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class NlfOrganizationComponent implements OnInit, OnDestroy {

  organization_id: number;
  dataReady: boolean = false;
  federation_id: number;
  lungo: LungoOrganizationsItem;
  sub;
  public config: NlfConfigItem;

  faSitemap = faSitemap;
  faHome = faHome;
  faMap = faMap;
  faMapMarker = faMapMarker;
  faDashboard = faDashboard;
  faPieChart = faPieChart;
  faPlane = faPlane;


  constructor(
    private lungoOrgService: LungoOrganizationsService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: NlfAlertService,
    private configService: NlfConfigService) {

    /*
          this.router.routerState.parent(this.route).params.subscribe(
            params => {
              console.log('AAJAJAJAJAJAJAJAJFUNNYSUGER', +params['id']);
              //this.getOrg();
            }
          );
          */
    this.sub = this.route.params.subscribe(params => {
      this.organization_id = params['id'] ? +params['id'] : 376;
      this.run();
    });
    /**
    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;

      }
    )**/

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private run() {
    if (!this.config) {
      this.configService.observableConfig.subscribe(
        data => {
          this.config = data;
          this.getLungoOrganization();
        }
      );
    } else {
      this.getLungoOrganization();
    }
  }

  public getFederation(activity) {

    return this.config[this.config.inv_mapping[activity.id]]['org_id'];
  }

  private getLungoOrganization() {
    this.dataReady = false;
    this.lungoOrgService.getOrganization(this.organization_id).subscribe(
      data => {
        this.lungo = data;
        if (data.type_id === 6 || data.type_id === 14 || data.type_id === 5) {
          this.federation_id = this.config[this.config.inv_mapping[data.main_activity.id]].org_id;
        } else {
          this.federation_id = 0;
        }
        this.dataReady = true;
      },
      err => {
        this.alertService.error(err.message);
        this.dataReady = false;
      },
      () => this.dataReady = true
    );


  }
}
