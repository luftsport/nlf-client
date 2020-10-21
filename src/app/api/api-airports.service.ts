import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiRestService } from './api-rest.service';
import { ApiAirport, ApiAirports, ApiOptionsInterface } from './api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiAirportsService extends ApiRestService {

  private relativeUrl = '/integration/aip/airports/';

  constructor(http: HttpClient) { super(http); }

  public getAirspace(id: number | string, options?: ApiOptionsInterface): Observable<ApiAirport> {
    return this.getItem(this.relativeUrl, id, options);
  }

  public getAirports(options?: ApiOptionsInterface): Observable<ApiAirports> {
    return this.getList(this.relativeUrl, options);
  }
}
