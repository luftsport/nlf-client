import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiAclRoleItem, ApiAclRoleList } from './api.interface';



@Injectable()
export class ApiAclRolesService extends ApiRestService {

  constructor(http: HttpClient) { super(http); }

  private relativeUrl = '/acl/roles/';

  public getRole( id: string, options?: ApiOptionsInterface): Observable<ApiAclRoleItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getRoles(options?: ApiOptionsInterface): Observable<ApiAclRoleList> {

    return this.getList(this.relativeUrl, options);
  }

}
