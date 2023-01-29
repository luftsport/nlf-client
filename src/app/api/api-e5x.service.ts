import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiClubItem, ApiClubList } from './api.interface';

@Injectable()
export class ApiE5xService  extends ApiRestService {

  private relativeUrl = '/e5x/';

  constructor(http: HttpClient) { super(http); }

  public generate(_id: string, _etag: string, activity: string, e5x, rit_version, options?: ApiOptionsInterface): Observable<ApiClubItem> {

    return this.post(this.relativeUrl + 'generate/' + activity + '/' + _id, {_etag: _etag, e5x: e5x, rit_version: rit_version}, options);
  }

  public getFile(options?: ApiOptionsInterface): Observable<ApiClubList> {

    return this.getList(this.relativeUrl, options);
  }

}
