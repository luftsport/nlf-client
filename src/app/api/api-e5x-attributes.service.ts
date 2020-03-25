import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiE5XAttributesItem, ApiE5XAttributesList } from './api.interface';

@Injectable()
export class ApiE5XAttributesService  extends ApiRestService {

  private relativeUrl = '/e5x/attributes/';

  constructor(http: HttpClient) { super(http); }

  public getAttribute(_id: number, options?: ApiOptionsInterface): Observable<ApiE5XAttributesItem> {

    return this.getItem(this.relativeUrl, _id, options);
  }

  public getAttributes(options?: ApiOptionsInterface): Observable<ApiE5XAttributesList> {

    return this.getList(this.relativeUrl, options);
  }

}