import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiNlfMembershipItem, ApiNlfMembershipList } from './api.interface';




@Injectable()
export class ApiNlfMembershipService extends ApiRestService {

  constructor(http: HttpClient) { super(http); }

  private relativeUrl = '/legacy/melwin/memberships/';

  public getMembership(id: string, options?: ApiOptionsInterface): Observable<ApiNlfMembershipItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getMemberships(options?: ApiOptionsInterface): Observable<ApiNlfMembershipList> {

    return this.getList(this.relativeUrl, options);
  }

}
