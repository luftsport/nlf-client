import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface } from './api.interface';
import { LungoActivitiesItem, LungoActivitiesList } from 'app/api/lungo.interface';

@Injectable({
  providedIn: 'root'
})
export class LungoActivitiesService extends ApiRestService {

  constructor(http: HttpClient) { super(http); }

  private relativeUrl = '/integration/activities/';

  public getActivity(id: string, options?: ApiOptionsInterface): Observable<LungoActivitiesItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getActivities(options?: ApiOptionsInterface): Observable<LungoActivitiesList> {

    return this.getList(this.relativeUrl, options);
  }

}
