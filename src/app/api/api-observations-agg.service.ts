import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiObservationsItem, ApiObservationsList } from './api.interface';

@Injectable()
export class ApiObservationsAggService extends ApiRestService {

  constructor(http: HttpClient) { super(http); }

  private relativeUrl = '/f/observations/aggregate';

  /**
   * 
   * @param options Only query is required
   * 
   * @TODO: see if constructing options here is better?
   * => $in clubs, from and to
   */
  public getPie(options?: ApiOptionsInterface): Observable<any> {

    return this.getList(this.relativeUrl, options);
  }

}
