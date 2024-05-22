import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiObservationsItem, ApiObservationsList } from './api.interface';

@Injectable()
export class ApiSearchService extends ApiRestService {

  private relativeUrl: string = '/search/';
  private activity: string;

  constructor(http: HttpClient) { super(http); }

  public getFilterDefinition(collection: string, section?: string, options?: ApiOptionsInterface): Observable<any> {
    return this.getItem(this.relativeUrl + 'definition/' + collection + '/', section, options);
  }

  public getFilterSections(collection: string, options?: ApiOptionsInterface): Observable<any> {
    return this.getItem(this.relativeUrl + 'definition/sections/', collection, options);
  }

  public getSearches(options?: ApiOptionsInterface): Observable<any> {

    return this.getList(this.relativeUrl, options);
  }

  public getSearch(_id: string, options?: ApiOptionsInterface): Observable<any> {

    return this.getItem(this.relativeUrl, _id, options);
  }

  public create(payload, options?: ApiOptionsInterface): Observable<any> {
    return this.post(this.relativeUrl, payload, options);
  }

  public save(_id: string, payload, etag?: string, options?: ApiOptionsInterface): Observable<any> {
    return this.patch(this.relativeUrl, _id, payload, options, etag);
  }

  public remove(_id: string, etag?: string, options?: ApiOptionsInterface) {
    return this.delete(this.relativeUrl, _id, options, etag);
  }

}