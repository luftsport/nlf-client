import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { RestService } from './rest.service';
import { OptionsInterface } from './options.interface';

interface GroupItem {
  _id: string;
  name: string;
  description: string;
  ref: string;
}

interface GroupList {
  _items: GroupItem[];

}

@Injectable()
export class AclGroupsService extends RestService {

  constructor(http: HttpClient) { super(http); }

  private relativeUrl: string = '/acl/groups/';

  public getGroup( id: string, options?: OptionsInterface): Observable<GroupItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getGroups(options?: OptionsInterface): Observable<GroupList> {

    return this.getList(this.relativeUrl, options);
  }

}

