import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiRestService } from './api-rest.service';
import { ApiAirspace, ApiAirspaces, ApiOptionsInterface } from './api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiAirspacesService extends ApiRestService {

  private relativeUrl = '/integration/aip/airspaces/';

  constructor(http: HttpClient) { super(http); }

  public getAirspace(id: number | string, options?: ApiOptionsInterface): Observable<ApiAirspace> {
    return this.getItem(this.relativeUrl, id, options);
  }

  public getAirspaces(options?: ApiOptionsInterface): Observable<ApiAirspaces> {
    return this.getList(this.relativeUrl, options);
  }
}
