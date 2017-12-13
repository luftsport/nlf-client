import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { RestService } from './rest.service'
import { UserItem, UserList } from './user.interface';
import { EveItem, EveList } from './eve.interface';

import { OptionsInterface } from './options.interface';

@Injectable()
export class UserService extends RestService {

  constructor( http: HttpClient
              //, private cookieService: CookieService
            ){super(http);}

  private relativeUrl: string = '/melwin/users/';

  public getUser(id:number, options?: OptionsInterface): Observable<UserItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getUsers(options?: OptionsInterface): Observable<UserList> {

    return this.getList(this.relativeUrl, options);
  }

/**
  public getsomething: Observable<Article> = this.http.get("https://api.github.com/users/seeschweiler");

  public getto(): Observable<Article> {
    return this.getsomething; //this.http.get<Article>("https://api.github.com/users/seeschweiler");
  }
  **/

}
