import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiNlfClubItem, ApiNlfClubList } from './api.interface';



@Injectable()
export class ApiNlfClubsService extends ApiRestService {

  private relativeUrl = '/legacy/clubs/';

  constructor(http: HttpClient) { super(http); }

  public getClub(id: number|string, options?: ApiOptionsInterface): Observable<ApiNlfClubItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getClubs(options?: ApiOptionsInterface): Observable<ApiNlfClubList> {

    return this.getList(this.relativeUrl, options);
  }

  public create(payload, options?: ApiOptionsInterface): Observable<ApiNlfClubItem> {
    return this.post(this.relativeUrl, payload, options);
  }

  public save(_id: string, payload, etag?: string, options?: ApiOptionsInterface): Observable<ApiNlfClubItem> {
    return this.patch(this.relativeUrl, _id, payload, options, etag);
  }

}
