import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiNlfLicenseList, ApiNlfLicenseItem } from './api.interface';




@Injectable()
export class ApiNlfLicensesService extends ApiRestService {

  private relativeUrl = '/legacy/melwin/licenses/';

  constructor(http: HttpClient) { super(http); }

  public getLicense(id: string, options?: ApiOptionsInterface): Observable<ApiNlfLicenseItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getLicenses(options?: ApiOptionsInterface): Observable<ApiNlfLicenseList> {

    return this.getList(this.relativeUrl, options);
  }

}
