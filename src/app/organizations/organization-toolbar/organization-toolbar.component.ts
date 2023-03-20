import { Component, OnInit, Input, Inject } from '@angular/core';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfConfigItem } from 'app/api/api.interface';
import { faSitemap, faMapMarker, faEye, faPieChart, faPlane } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'nlf-organization-toolbar',
  templateUrl: './organization-toolbar.component.html',
  styleUrls: ['./organization-toolbar.component.css']
})
export class NlfOrganizationToolbarComponent implements OnInit {

  @Input() lungo;
  @Input() federation_id;
  /**
  @Input() :;
  @Input() :;
  @Input() :;
  **/
  public config: NlfConfigItem;

  faSitemap = faSitemap;
  faMapMarker = faMapMarker;
  faEye = faEye;
  faPieChart = faPieChart;
  faPlane = faPlane;
  faMap = faMap;

  dataReady: boolean = false;
  constructor(private configService: NlfConfigService) {

    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
      }
    );
  }

  ngOnInit() {
  }

  public getFederation(activity) {

    return this.config[this.config.inv_mapping[activity.id]]['org_id'];
  }

}
