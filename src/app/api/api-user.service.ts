import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';

import { ApiOptionsInterface, ApiUserItem, ApiUserList, ApiUserORSList } from './api.interface';

@Injectable()
export class ApiUserService extends ApiRestService {

  private relativeUrl = '/users/';

  constructor(http: HttpClient) { super(http); }

  public getUser(id: number | string, options?: ApiOptionsInterface): Observable<ApiUserItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getUsers(options?: ApiOptionsInterface): Observable<ApiUserList> {

    return this.getList(this.relativeUrl, options);
  }

  public save(_id: string, payload, etag?: string, options?: ApiOptionsInterface): Observable<ApiUserItem> {
    return this.patch(this.relativeUrl, _id, payload, options, etag);
  }

  public getAvatar(id: number | string ) {

    const options: ApiOptionsInterface = {
      query: {
        projection: { 'avatar': 1 }
      },
    };
    return this.getItem(this.relativeUrl, id, options);
  }

  public getUserObservations(activity: string, options?: ApiOptionsInterface): Observable<ApiUserORSList> {

    return this.getList(this.relativeUrl + 'observations/' + activity, options);
  }



  /**
    public getsomething: Observable<Article> = this.http.get("https://api.github.com/users/seeschweiler");

    public getto(): Observable<Article> {
      return this.getsomething; //this.http.get<Article>("https://api.github.com/users/seeschweiler");
    }
    **/

}
