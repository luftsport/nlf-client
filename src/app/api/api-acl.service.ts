import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiEveBaseItem, ApiEveBaseList } from 'app/api/api-eve.interface';

import { ApiRestService } from 'app/api/api-rest.service';
import { ApiOptionsInterface, ApiAclUsersInterface } from 'app/api/api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiAclService extends ApiRestService {

  private relativeUrl = '/acl/';

  constructor(http: HttpClient) { super(http); }

  /**
  public getAclItem( collection: string, _id: string, flat): Observable<any> {

    return this.getItem(this.relativeUrl, _id, options);
  }
  **/

  public getAclUsers(collection: string, _id: string, options?: ApiOptionsInterface) {
    return this.getItem(this.relativeUrl + 'users/' + collection + '/', _id +'/flat', options);
  }

  public getAclUserList(collection: string, _id: string, options?: ApiOptionsInterface) {
    return this.getItem(this.relativeUrl + 'users/' + collection + '/', _id, options);
  }

  public getRoles(options?: ApiOptionsInterface): Observable<any> {

    return this.getList(this.relativeUrl, options);
  }

}
