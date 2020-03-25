import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface } from './api.interface';
import { LungoLicensesItem, LungoLicensesList } from 'app/api/lungo.interface';

@Injectable({
  providedIn: 'root'
})
export class LungoLicensesService extends ApiRestService {

  private relativeUrl = '/integration/licenses/';

  constructor(http: HttpClient) { super(http); }

  public getLicense(id: string, options?: ApiOptionsInterface): Observable<LungoLicensesItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getLicenses(options?: ApiOptionsInterface): Observable<LungoLicensesList> {

    return this.getList(this.relativeUrl, options);
  }

}
