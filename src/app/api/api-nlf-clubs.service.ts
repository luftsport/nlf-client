import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiNlfClubItem, ApiNlfClubList } from './api.interface';



@Injectable()
export class ApiNlfClubsService extends ApiRestService {

  constructor(http: HttpClient) { super(http); }

  private relativeUrl = '/legacy/melwin/clubs/';

  public getClub(id: string, options?: ApiOptionsInterface): Observable<ApiNlfClubItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getClubs(options?: ApiOptionsInterface): Observable<ApiNlfClubList> {

    return this.getList(this.relativeUrl, options);
  }

}
