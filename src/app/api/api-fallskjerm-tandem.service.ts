import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiHelpItem, ApiHelpList } from './api.interface';


@Injectable()
export class ApiFallskjermTandemService extends ApiRestService {

  private relativeUrl = '/fallskjerm/tandem/';

  constructor( http: HttpClient ) { super(http); }

  public search(query?: object): Observable<any> {

    return this.getList(this.relativeUrl + 'search/?' + Object.keys(query).map(key => key + '=' + query[key]).join('&'))
  }

  public getTandemRegistered(person_id: number, org_id: number): Observable<any> {

    return this.getItem(this.relativeUrl + 'registered/' + org_id + '/', person_id);
  }

  public create(payload, options?: ApiOptionsInterface): Observable<ApiHelpItem> {
    return this.post(this.relativeUrl, payload, options);
  }

  public save(_id: string, payload, etag?: string, options?: ApiOptionsInterface): Observable<ApiHelpItem> {
    return this.patch(this.relativeUrl, _id, payload, options, etag);
  }

  public remove(_id: string, etag?: string, options?: ApiOptionsInterface): Observable<ApiHelpItem> {
    return this.delete(this.relativeUrl, _id, options, etag);
  }
}
