import { ApiCacheService } from 'app/api/api-cache.service';
import { Component, OnInit, Input } from '@angular/core';
import { ApiNlfLicensesService } from 'app/api/api-nlf-licenses.service';
import { ApiOptionsInterface } from 'app/api/api.interface';

@Component({
  selector: 'nlf-resolve-license',
  // templateUrl: './resolve-license.component.html',
  template: '{{ licenseName }}',
  styleUrls: ['./resolve-license.component.css']
})
export class NlfResolveLicenseComponent implements OnInit {

  @Input() licenseid: string;
  @Input() unknown?: boolean;

  licenseName: string;

  constructor(private melwinLicensesService: ApiNlfLicensesService,
              private apiCache: ApiCacheService) { }

  ngOnInit() {

    let options: ApiOptionsInterface = {
      query: { projection: { name: 1 } }
    };

    this.apiCache.get(['resolve-license', this.licenseid, options.query],
      this.melwinLicensesService.getLicense(this.licenseid, options)).subscribe(
      data => {
        this.licenseName = data.name;
      },
      err => {
        if (!!this.unknown) { // Only return if we want the unknowns too
          this.licenseName = 'Ukjent lisens (' + this.licenseid + ')';
        }
      },
    );
  }

}
