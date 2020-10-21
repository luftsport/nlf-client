import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiObservationsItem, ApiObservationsList } from './api.interface';

@Injectable()
export class ApiObservationsService extends ApiRestService {

  private relativeUrl: string;
  private activity: string;

  constructor(http: HttpClient) { super(http); }

  public setActivity(activity: string) {
    this.activity = activity;
    this.relativeUrl = '/' + activity + '/observations/';
  }

  public getObservation(id: number | string, options?: ApiOptionsInterface): Observable<ApiObservationsItem> {
    return this.getItem(this.relativeUrl, id, options);
  }

  public get(id: number | string, options?: ApiOptionsInterface): Observable<ApiObservationsItem> {
    return this.getObservation(id, options);
  }

  public getObservations(options?: ApiOptionsInterface): Observable<ApiObservationsList> {
    return this.getList(this.relativeUrl, options);
  }

  public getObservationsSelf(options?: ApiOptionsInterface): Observable<ApiObservationsList> {
    return this.getList(this.relativeUrl + 'user', options);
  }

  public create(payload, options?: ApiOptionsInterface): Observable<ApiObservationsItem> {
    return this.post(this.relativeUrl, payload, options);
  }

  public save(_id: string, payload, etag?: string, options?: ApiOptionsInterface): Observable<ApiObservationsItem> {
    return this.patch(this.relativeUrl, _id, payload, options, etag);
  }

  public addAclUser(_id: string, right: string, person_id: number, payload={}, etag?: string, options?: ApiOptionsInterface): Observable<any> {
    //observations/<string:activity>/<objectid:_id>/<string:right>/<int:person_id>
    return this.post('/acl/observations/'+this.activity+'/'+_id +'/' +right +'/'+person_id, payload, options);
  }

  public removeAclUser(_id: string, right: string, person_id: number, options?: ApiOptionsInterface): Observable<any> {
    return this.delete('/acl/observations/'+this.activity+'/'+_id +'/' +right +'/', ''+person_id, options);
  }
}
