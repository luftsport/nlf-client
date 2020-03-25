import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiRestService } from './api-rest.service';
import { ApiAircraftsItem, ApiAircraftsList, ApiOptionsInterface } from './api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiAircraftsService extends ApiRestService {

  private relativeUrl = '/aircrafts/';

  constructor(http: HttpClient) { super(http); }

  public getAircraft(callsign: string, options?: ApiOptionsInterface): Observable<ApiAircraftsItem> {
    return this.getItem(this.relativeUrl, callsign, options);
  }

  public getAircrafts(options?: ApiOptionsInterface): Observable<ApiAircraftsList> {
    return this.getList(this.relativeUrl, options);
  }

  public save(_id: string, payload, etag?: string, options?: ApiOptionsInterface): Observable<ApiAircraftsItem> {
    return this.patch(this.relativeUrl, _id, payload, options, etag);
  }

  public create(payload, options?: ApiOptionsInterface): Observable<ApiAircraftsItem> {
    return this.post(this.relativeUrl, payload, options);
  }

  public getAircraftTypes() {
    return this.getList(this.relativeUrl + 'types');
  }

}
