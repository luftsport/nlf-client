import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiHelpItem, ApiHelpList } from './api.interface';


@Injectable()
export class ApiHelpService extends ApiRestService {

  private relativeUrl = '/help/';

  constructor( http: HttpClient ) { super(http); }

  public getHelp(key: string, options?: ApiOptionsInterface): Observable<ApiHelpItem> {
    return this.getItem(this.relativeUrl, key, options);
  }

  public getHelpList(options?: ApiOptionsInterface): Observable<ApiHelpList> {

    return this.getList(this.relativeUrl, options);
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
