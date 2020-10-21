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

  public getTypes(options?: ApiOptionsInterface): Observable<any> {

    return this.getList(this.relativeUrl + '/types', options);
  }

  public getTypesDiscipline(options?: ApiOptionsInterface): Observable<any> {

    return this.getList(this.relativeUrl + '/types/discipline', options);
  }

  public getStatesDiscipline(options?: ApiOptionsInterface): Observable<any> {

    return this.getList(this.relativeUrl + '/states/discipline', options);
  }

}
