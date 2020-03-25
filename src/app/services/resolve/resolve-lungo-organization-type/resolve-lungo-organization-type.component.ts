import { Component, OnInit, Input } from '@angular/core';
import { ApiCacheService } from 'app/api/api-cache.service';
import { LungoOrganizationsService } from 'app/api/lungo-organizations.service';
import { ApiOptionsInterface } from 'app/api/api.interface';
import { LungoOrganizationsTypesItem } from 'app/api/lungo.interface';

@Component({
  selector: 'nlf-resolve-lungo-organization-type',
  templateUrl: './resolve-lungo-organization-type.component.html',
  styleUrls: ['./resolve-lungo-organization-type.component.css']
})
export class ResolveLungoOrganizationTypeComponent implements OnInit {


  @Input() type_id: number;
  @Input() link: boolean;
  @Input() long: boolean;

  organization_type: LungoOrganizationsTypesItem;
  dataReady = false;

  constructor(private orgService: LungoOrganizationsService,
              private apiCache: ApiCacheService) { }

  ngOnInit() {

    const options: ApiOptionsInterface = {
      query: { projection: { org_type_id: 1, org_type_text: 1 } }
    };

    this.apiCache.get(['get-lungo-organization-type', this.type_id, options.query],
                      this.orgService.getOrganizationType(this.type_id, options)).subscribe(
      data => {
        this.organization_type = data;

      },
      err => this.organization_type = { org_type_text: 'Ukjent organisasjonstype', org_type_id: 0, _id: '' },
      () => this.dataReady = true
    );
  }

}
