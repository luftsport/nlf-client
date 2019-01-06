import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiObservationsItem, ApiObservationsList } from './api.interface';

@Injectable()
export class ApiObservationsService extends ApiRestService {

  constructor(http: HttpClient) { super(http); }

  private relativeUrl = '/f/observations/';

  public getObservation(id: number | string, options?: ApiOptionsInterface): Observable<ApiObservationsItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public get(id: number | string, options?: ApiOptionsInterface): Observable<ApiObservationsItem> {
    return this.getObservation(id, options);
  }

  public getObservations(options?: ApiOptionsInterface): Observable<ApiObservationsList> {

    return this.getList(this.relativeUrl, options);
  }

  public create(payload, options?: ApiOptionsInterface): Observable<ApiObservationsItem> {
    return this.post(this.relativeUrl, payload, options);
  }

  public save(_id: string, payload, etag?: string, options?: ApiOptionsInterface): Observable<ApiObservationsItem> {
    return this.patch(this.relativeUrl, _id, payload, options, etag);
  }
}
