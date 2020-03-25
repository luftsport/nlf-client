import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from 'app/api/api-rest.service';
import { ApiOptionsInterface, ApiLocationItem, ApiLocationList } from 'app/api/api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiLocationsService extends ApiRestService {

  private relativeUrl = '/locations/';

  constructor(http: HttpClient) { super(http); }

  public search(query: string, options?: ApiOptionsInterface): Observable<ApiLocationList> {

    return this.getList(this.relativeUrl+'search?q='+query, options);
  }

}
