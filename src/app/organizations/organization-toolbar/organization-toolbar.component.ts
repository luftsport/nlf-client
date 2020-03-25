import { Component, OnInit, Input, Inject } from '@angular/core';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfConfigItem } from 'app/api/api.interface';

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
