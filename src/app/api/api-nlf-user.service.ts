import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiNlfUserItem, ApiNlfUserList } from './api.interface';

@Injectable()
export class ApiNlfUserService extends ApiRestService {

  constructor( http: HttpClient
              // , private cookieService: CookieService
            ) { super(http); }

  private relativeUrl = '/melwin/users/';

  public getUser(id: number, options?: ApiOptionsInterface): Observable<ApiNlfUserItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getUsers(options?: ApiOptionsInterface): Observable<ApiNlfUserList> {

    return this.getList(this.relativeUrl, options);
  }

}
