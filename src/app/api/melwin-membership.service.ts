import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { RestService } from './rest.service';
import { OptionsInterface } from './options.interface';

interface MembershipItem {
  _id: string;
  id: string;
  name: string;
}

interface MembershipList {
  _items: MembershipItem[];

}


@Injectable()
export class MelwinMembershipService extends RestService {

  constructor(http: HttpClient) { super(http); }

  private relativeUrl: string = '/melwin/memberships/';

  public getMembership(id: string, options?: OptionsInterface): Observable<MembershipItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getMemberships(options?: OptionsInterface): Observable<MembershipList> {

    return this.getList(this.relativeUrl, options);
  }

}
