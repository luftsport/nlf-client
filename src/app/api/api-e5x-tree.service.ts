import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiClubItem, ApiClubList } from './api.interface';

@Injectable()
export class ApiE5XChoicesService  extends ApiRestService {

  private relativeUrl = '/e5x/choices/';

  constructor(http: HttpClient) { super(http); }

  public getTree(id: number, options?: ApiOptionsInterface): Observable<ApiClubItem> {

    return this.getItem(this.relativeUrl, id, options);
  }
  public getTrees(options?: ApiOptionsInterface): Observable<ApiClubList> {

    return this.getList(this.relativeUrl, options);
  }

}