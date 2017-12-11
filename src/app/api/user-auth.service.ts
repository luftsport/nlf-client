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

  public getUsers(): Observable<UserAuthItem> {

    return this.getList(this.relativeUrl, {});
  }



/**
  public getsomething: Observable<Article> = this.http.get("https://api.github.com/users/seeschweiler");

  public getto(): Observable<Article> {
    return this.getsomething; //this.http.get<Article>("https://api.github.com/users/seeschweiler");
  }
  **/

}
