import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';

import { ApiOptionsInterface, ApiUserAuthItem } from './api.interface';




@Injectable()
export class ApiUserAuthService extends ApiRestService {

  constructor( http: HttpClient ) { super(http); }

  private relativeUrl = '/user/authenticate';

  public authenticate(username: string, password: string, options?: ApiOptionsInterface): Observable<any> {

    return this.post(this.relativeUrl , {username: username, password: password}, options);
  }

}
