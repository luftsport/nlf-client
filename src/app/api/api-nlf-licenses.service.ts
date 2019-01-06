import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiNlfLicenseList, ApiNlfLicenseItem } from './api.interface';




@Injectable()
export class ApiNlfLicensesService extends ApiRestService {

  constructor(http: HttpClient) { super(http); }

  private relativeUrl = '/legacy/melwin/licenses/';

  public getLicense(id: string, options?: ApiOptionsInterface): Observable<ApiNlfLicenseItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getLicenses(options?: ApiOptionsInterface): Observable<ApiNlfLicenseList> {

    return this.getList(this.relativeUrl, options);
  }

}
