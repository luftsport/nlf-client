import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiClubItem, ApiClubList } from './api.interface';

@Injectable()
export class ApiClubsService  extends ApiRestService {

  private relativeUrl = '/legacy/clubs/';

  constructor(http: HttpClient) { super(http); }

  public getClub(id: number, options?: ApiOptionsInterface): Observable<ApiClubItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getClubs(options?: ApiOptionsInterface): Observable<ApiClubList> {

    return this.getList(this.relativeUrl, options);
  }

}
