import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { RestService } from './rest.service'
import { MelwinUserItem, MelwinUserList } from './melwin-user.interface';
import { EveItem, EveList } from './eve.interface';

import { OptionsInterface } from './options.interface';

@Injectable()
export class MelwinUserService extends RestService {

  constructor( http: HttpClient
              //, private cookieService: CookieService
            ){super(http);}

  private relativeUrl: string = '/melwin/users/';

  public getUser(id:number, options?: OptionsInterface): Observable<MelwinUserItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getUsers(options?: OptionsInterface): Observable<MelwinUserList> {

    return this.getList(this.relativeUrl, options);
  }

}
