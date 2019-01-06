import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiNlfUserItem, ApiNlfUserList, ApiTagList } from './api.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiTagsService extends ApiRestService {

  constructor(http: HttpClient) { super(http); }

  private relativeUrl = '/tags/';

  public getTags(options?: ApiOptionsInterface): Observable<ApiTagList> {

    return this.getList(this.relativeUrl, options);
  }

  public remove(_id: string, options?: ApiOptionsInterface) {
    // find tag _id then delete all returned in /tags/freq
    return this.delete(this.relativeUrl, _id, options);
  }


  public create(data: any, options?: ApiOptionsInterface) {

    return this.post(this.relativeUrl, data, options);
  }

  public freq(_id: string, inc?: number, options?: ApiOptionsInterface) {

    if (inc > 0 || !inc) {
      return this.post(this.relativeUrl + 'freq/' + _id, {}, options);
    } else if (inc < 0) {
      return this.delete(this.relativeUrl + 'freq/', _id, options);
    }

  }

  public search(options) {
    console.log('Searching in service');
    return this.getList(this.relativeUrl, options)
      .pipe(map(res => res['_items'])
      );

  }

}

/**
 {
        console.log(res);
        return res.json()._items.map(item => {
          return item.tag;
        });
      }
 */