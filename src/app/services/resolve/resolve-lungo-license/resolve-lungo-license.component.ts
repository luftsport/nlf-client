import { Component, OnInit, Input } from '@angular/core';
import { ApiCacheService } from 'app/api/api-cache.service';
import { LungoLicensesService } from 'app/api/lungo-licenses.service';
import { ApiOptionsInterface } from 'app/api/api.interface';
import { LungoLicensesItem } from 'app/api/lungo.interface';

@Component({
  selector: 'nlf-resolve-lungo-license',
  templateUrl: './resolve-lungo-license.component.html',
  styleUrls: ['./resolve-lungo-license.component.css']
})
export class NlfResolveLungoLicenseComponent implements OnInit {


  @Input() license_id: string;
  @Input() link: boolean = false;
  @Input() long: boolean = false;

  license: LungoLicensesItem;
  dataReady = false;

  constructor(private licenseService: LungoLicensesService,
              private apiCache: ApiCacheService) { }

  ngOnInit() {

    const options: ApiOptionsInterface = {
      query: { projection: { type_name: 1, id: 1, period_name: 1 } }
    };

    this.apiCache.get(['get-lungo-license', this.license_id, options.query],
                      this.licenseService.getLicense(this.license_id, options)).subscribe(
      data => {
        this.license = data;

        /* @TODO: see if long should be used? BFSK, Bergen, Bergen Fallskjermklubb
        if (this.long = true) {
          this.licenseName = data.name;
        }
        else {
          this.licenseName = data.name.replace(' Fallskjermklubb', '');
        }
        */
      },
      err => this.license = { type_name: 'Ukjent lisens', id: 0, _id: '' },
      () => this.dataReady = true
    );
  }

}
