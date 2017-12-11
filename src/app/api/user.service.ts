import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { RestService } from './rest.service'
import { UserItem, UserList } from './user.interface';


@Injectable()
export class UserService extends RestService {

  constructor( http: HttpClient
              //, private cookieService: CookieService
            ){super(http);}

  private relativeUrl: string = '/melwin/users/';

  public getUser(id:number): Observable<UserItem> {

    return this.getItem(this.relativeUrl , id, {});
  }

  public getUsers(page: number, max_results:number): Observable<EveItems> {
    return this.getList(this.relativeUrl, {page:page,max_results:max_results});
  }

/**
  public getsomething: Observable<Article> = this.http.get("https://api.github.com/users/seeschweiler");

  public getto(): Observable<Article> {
    return this.getsomething; //this.http.get<Article>("https://api.github.com/users/seeschweiler");
  }
  **/

}
