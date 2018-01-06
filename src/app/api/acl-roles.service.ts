import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { RestService } from './rest.service';
import { OptionsInterface } from './options.interface';

interface RoleItem {
  _id: string;
  name: string;
  description?: string;
  ref?: string;
  group?: any;
}

interface RoleList {
  _items: RoleItem[];

}

@Injectable()
export class AclRolesService extends RestService {

  constructor(http: HttpClient) { super(http); }

  private relativeUrl: string = '/acl/roles/';

  public getRole( id: string, options?: OptionsInterface): Observable<RoleItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getRoles(options?: OptionsInterface): Observable<RoleList> {

    return this.getList(this.relativeUrl, options);
  }

}
