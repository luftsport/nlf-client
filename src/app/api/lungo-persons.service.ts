import { Injectable, Inject } from '@angular/core';
import { Observable, defer } from 'rxjs';
import { publishReplay, refCount, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiNlfUserItem, ApiNlfUserList } from './api.interface';
import { LungoPersonsItem, LungoPersonsList, LungoPersonsSearchList } from './lungo.interface';

import { NlfConfigService } from 'app/nlf-config.service';

export interface typicalAGGInterface {
  _id: string | number;
  total: string | number;
}

@Injectable({
  providedIn: 'root'
})
export class LungoPersonsService extends ApiRestService {

  private relativeUrl = '/integration/persons/';
  public config;

  constructor(http: HttpClient,
    private configService: NlfConfigService
  ) {
      super(http);
      this.configService.observableConfig.subscribe(
        data => {
          this.config = data;
        }
      );
    }

  public getUser(id: number, options?: ApiOptionsInterface): Observable<LungoPersonsItem> {
    return this.getItem(this.relativeUrl, id, options);
  }

  public getUsers(options?: ApiOptionsInterface): Observable<LungoPersonsList> {

    return this.getList(this.relativeUrl, options);
  }

  /**
  * SEARCH
  **/
  public search(query: string, activity?: string): Observable<LungoPersonsList | LungoPersonsSearchList> {

    const options: ApiOptionsInterface = {
      query: {
        where: { '$text': { '$search': query } }
      },
    };

    if (!!activity) {
      options.query.where['activities'] = { '$in': [this.config.mapping[activity]] };
    }

    return this.getList(this.relativeUrl + 'search', options);

  }

  /**
  * AGGREGATIONS
  **/
  public getAgeDistributionAGG(options?: ApiOptionsInterface): Observable<typicalAGGInterface[]> {
    return this.getList(this.relativeUrl + 'age', options);
  }
  public getAgeDistributionPyramid(options?: ApiOptionsInterface): Observable<typicalAGGInterface[]> {
    return this.getList(this.relativeUrl + 'distribution/pyramid', options);
  }
}
