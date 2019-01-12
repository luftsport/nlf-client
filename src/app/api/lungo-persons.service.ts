import { Injectable } from '@angular/core';
import { Observable, defer } from 'rxjs';
import { publishReplay, refCount, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiNlfUserItem, ApiNlfUserList } from './api.interface';
import { LungoPersonsItem, LungoPersonsList, LungoPersonsSearchList } from './lungo.interface';

@Injectable({
  providedIn: 'root'
})
export class LungoPersonsService extends ApiRestService {

  constructor( http: HttpClient ) { super(http); }

  private relativeUrl = '/integration/persons/';

  public getUser(id: number, options?: ApiOptionsInterface): Observable<LungoPersonsItem> {
    return this.getItem(this.relativeUrl, id, options);
  }

  public getUsers(options?: ApiOptionsInterface): Observable<LungoPersonsList> {

    return this.getList(this.relativeUrl, options);
  }

  public search(query: string): Observable<LungoPersonsList> {

    const options: ApiOptionsInterface = {
      query: {
        where: {'$text': {'$search': query}}
        },
    };

    return this.getList(this.relativeUrl + '/search', options);

  }
}
