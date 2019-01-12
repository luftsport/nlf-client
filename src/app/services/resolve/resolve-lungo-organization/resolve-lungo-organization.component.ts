import { Component, OnInit, Input } from '@angular/core';
import { ApiCacheService } from 'app/api/api-cache.service';
import { LungoOrganizationsService } from 'app/api/lungo-organizations.service';
import { ApiOptionsInterface } from 'app/api/api.interface';
import { LungoOrganizationsItem } from 'app/api/lungo.interface';

@Component({
  selector: 'nlf-resolve-lungo-organization',
  templateUrl: './resolve-lungo-organization.component.html',
  styleUrls: ['./resolve-lungo-organization.component.css']
})
export class NlfResolveLungoOrganizationComponent implements OnInit {


  @Input() organization_id: string;
  @Input() show_type = false;
  @Input() link: boolean;
  @Input() long: boolean;

  organization: LungoOrganizationsItem;
  dataReady = false;

  constructor(private orgService: LungoOrganizationsService,
              private apiCache: ApiCacheService) { }

  ngOnInit() {

    const options: ApiOptionsInterface = {
      query: { projection: { name: 1, id: 1, main_activity: 1 } }
    };

    this.apiCache.get(['get-lungo-organization', this.organization_id, options.query],
                      this.orgService.getOrganization(this.organization_id, options)).subscribe(
      data => {
        this.organization = data;

        /* @TODO: see if long should be used? BFSK, Bergen, Bergen Fallskjermklubb
        if (this.long = true) {
          this.organizationName = data.name;
        }
        else {
          this.organizationName = data.name.replace(' Fallskjermklubb', '');
        }
        */
      },
      err => this.organization = { name: 'Ukjent klubb', id: 0, _id: '', main_activity: {id: 27} },
      () => this.dataReady = true
    );
  }

}
