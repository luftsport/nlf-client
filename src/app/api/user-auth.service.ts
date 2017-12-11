import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { RestService } from './rest.service'


import { UserItem, UserList } from './user.interface';

interface UserAuthItem {
  success: boolean;
  token: string;
  token64: string;
  message?: string;
  valid?: any;

}


@Injectable()
export class UserAuthService extends RestService {


  constructor( http: HttpClient
              //, private cookieService: CookieService
            ){super(http);}

  private relativeUrl: string = '/user/authenticate';

  public authenticate(username: string, password: string): Observable<any> {

    return this.post(this.relativeUrl , {username: username, password: password}, {});
  }


}
