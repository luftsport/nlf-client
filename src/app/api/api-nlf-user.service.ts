import { Injectable } from '@angular/core';
import { Observable, defer } from 'rxjs';
import { publishReplay, refCount, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiNlfUserItem, ApiNlfUserList } from './api.interface';

@Injectable()
export class ApiNlfUserService extends ApiRestService {

  constructor( http: HttpClient ) { super(http); }

  private relativeUrl = '/legacy/melwin/users/';

  public getUser(id: number, options?: ApiOptionsInterface): Observable<ApiNlfUserItem> {
    return this.getItem(this.relativeUrl, id, options);
  }

  public getUsers(options?: ApiOptionsInterface): Observable<ApiNlfUserList> {

    return this.getList(this.relativeUrl, options);
  }

  public search(query: string): Observable<ApiNlfUserList> {

    const options: ApiOptionsInterface = {
      query: {
        where: {'$text': {'$search': query}}
        },
    };

    return this.getList(this.relativeUrl, options);

  }

  public getUserIdCache(id: number, options?: ApiOptionsInterface): Observable<ApiNlfUserItem> {

    return defer(() => this.getUser(id, options)).pipe(publishReplay(1, 30000), refCount(), take(1));
  }
}
