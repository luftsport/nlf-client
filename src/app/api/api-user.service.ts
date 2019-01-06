import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';

import { ApiOptionsInterface, ApiUserItem, ApiUserList } from './api.interface';

@Injectable()
export class ApiUserService extends ApiRestService {

  constructor( http: HttpClient
              // , private cookieService: CookieService
            ) { super(http); }

  private relativeUrl = '/users/';

  public getUser(id: number, options?: ApiOptionsInterface): Observable<ApiUserItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getUsers(options?: ApiOptionsInterface): Observable<ApiUserList> {

    return this.getList(this.relativeUrl, options);
  }

  public getAvatar(id: number) {

    let options: ApiOptionsInterface = {
      query: {
        projection: {'avatar': 1}
        },
    };
    return this.getItem(this.relativeUrl, id, options);
  }

/**
  public getsomething: Observable<Article> = this.http.get("https://api.github.com/users/seeschweiler");

  public getto(): Observable<Article> {
    return this.getsomething; //this.http.get<Article>("https://api.github.com/users/seeschweiler");
  }
  **/

}
