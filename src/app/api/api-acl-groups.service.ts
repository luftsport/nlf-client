import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiAclGroupItem, ApiAclGroupList } from './api.interface';



@Injectable()
export class ApiAclGroupsService extends ApiRestService {

  private relativeUrl = '/acl/groups/';

  constructor(http: HttpClient) { super(http); }

  public getGroup(id: string, options?: ApiOptionsInterface): Observable<ApiAclGroupItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getGroups(options?: ApiOptionsInterface): Observable<ApiAclGroupList> {

    return this.getList(this.relativeUrl, options);
  }

}

