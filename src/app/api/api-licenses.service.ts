import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiNlfLicenseItem, ApiNlfLicenseList } from './api.interface';


@Injectable()
export class ApiLicensesService  extends ApiRestService {

  private relativeUrl = '/legacy/licenses/';

  constructor(http: HttpClient) { super(http); }

  public getLicense(id: string, options?: ApiOptionsInterface): Observable<ApiNlfLicenseItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getLicenses(options?: ApiOptionsInterface): Observable<ApiNlfLicenseList> {

    return this.getList(this.relativeUrl, options);
  }

}
