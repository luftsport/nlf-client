import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiObservationsItem, ApiObservationsList } from './api.interface';

@Injectable()
export class ApiDistinctService extends ApiRestService {

  private relativeUrl: string = '/distinct/';
  private activity: string;

  constructor(http: HttpClient) { super(http); }

  public get(collection: string, field: string, options?: ApiOptionsInterface): Observable<ApiObservationsList> {
    return this.getItem(this.relativeUrl + collection +'/', field, options);
  }

}