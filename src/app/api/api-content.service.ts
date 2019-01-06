import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiContentItem, ApiContentList } from './api.interface';


@Injectable()
export class ApiContentService extends ApiRestService {

  constructor( http: HttpClient ) { super(http); }

  private relativeUrl = '/content/';

  public getContent(key: string, options?: ApiOptionsInterface): Observable<ApiContentItem> {
    return this.getItem(this.relativeUrl, key, options);
  }

  public getContentList(options?: ApiOptionsInterface): Observable<ApiContentList> {

    return this.getList(this.relativeUrl, options);
  }

  public create(payload, options?: ApiOptionsInterface): Observable<ApiContentItem> {
    return this.post(this.relativeUrl, payload, options);
  }

  public save(_id: string, payload, etag?: string, options?: ApiOptionsInterface): Observable<ApiContentItem> {
    return this.patch(this.relativeUrl, _id, payload, options, etag);
  }

  public remove(_id: string, etag?: string, options?: ApiOptionsInterface): Observable<ApiContentItem> {
    return this.delete(this.relativeUrl, _id, options, etag);
  }

  public aggregateParents(options?: ApiOptionsInterface): Observable<ApiContentList> {

    return this.getList(this.relativeUrl + 'aggregate/parents', options);
  }

  public aggregateChildren(options?: ApiOptionsInterface): Observable<ApiContentList> {

    return this.getList(this.relativeUrl + 'aggregate/children', options);
  }

  public aggregateSiblings(options?: ApiOptionsInterface): Observable<ApiContentList> {

    return this.getList(this.relativeUrl + 'aggregate/siblings', options);
  }
}
