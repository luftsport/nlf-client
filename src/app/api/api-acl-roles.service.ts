import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiAclRoleItem, ApiAclRoleList } from './api.interface';



@Injectable()
export class ApiAclRolesService extends ApiRestService {

  private relativeUrl = '/acl/roles/';

  constructor(http: HttpClient) { super(http); }

  public getRole( id: string, options?: ApiOptionsInterface): Observable<ApiAclRoleItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getRoles(options?: ApiOptionsInterface): Observable<ApiAclRoleList> {

    return this.getList(this.relativeUrl, options);
  }

}
