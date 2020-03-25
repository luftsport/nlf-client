import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface } from './api.interface';
import {
  LungoOrganizationsItem,
  LungoOrganizationsList,
  LungoOrganizationsTypesItem,
  LungoOrganizationsTypesList
} from 'app/api/lungo.interface';

@Injectable({
  providedIn: 'root'
})
export class LungoOrganizationsService extends ApiRestService {

  private relativeUrl = '/integration/organizations/';

  constructor(http: HttpClient) { super(http); }

  public getOrganization(id: number, options?: ApiOptionsInterface): Observable<LungoOrganizationsItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getOrganizations(options?: ApiOptionsInterface): Observable<LungoOrganizationsList> {

    return this.getList(this.relativeUrl, options);
  }

  public getOrganizationType(id: number, options?: ApiOptionsInterface): Observable<LungoOrganizationsTypesItem> {

    return this.getItem(this.relativeUrl + 'types/', id, options);
  }

  public getOrganizationsTypes(options?: ApiOptionsInterface): Observable<LungoOrganizationsTypesList> {

    return this.getList(this.relativeUrl + 'types/', options);
  }
}
