import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiObservationsItem, ApiObservationsList } from './api.interface';

@Injectable()
export class ApiObservationsService extends ApiRestService {

  constructor( http: HttpClient ) { super(http); }

  private relativeUrl = '/observations/';

  public getObservation(id: number, options?: ApiOptionsInterface): Observable<ApiObservationsItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getObservations(options?: ApiOptionsInterface): Observable<ApiObservationsList> {

    return this.getList(this.relativeUrl, options);
  }
}
