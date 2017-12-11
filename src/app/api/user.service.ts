import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { RestService } from './rest.service'
import { UserItem } from './user.interface';
import {EveItems} from "./eve.interface";


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

}
