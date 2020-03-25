import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiGeoAdminList, ApiGeoAdminItem } from './api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiGeoAdminService extends ApiRestService {

  relativeUrl = '/geo/admin';

  constructor(http: HttpClient) { super(http); }

  public get(options?: ApiOptionsInterface): Observable<ApiGeoAdminList> {
    return this.getList(this.relativeUrl, options);
  }

  //{"geometry": {"$geoIntersects":{"$geometry":{"type":"Point","coordinates":[ 10, 59 ]}}}}

}
