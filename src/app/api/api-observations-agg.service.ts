import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface } from './api.interface';

@Injectable()
export class ApiObservationsAggService extends ApiRestService {

  private relativeUrl: string;

  constructor(http: HttpClient) { super(http); }

  public setActivity(activity: string) {
    this.relativeUrl = '/' + activity + '/observations/aggregate';
  }

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
