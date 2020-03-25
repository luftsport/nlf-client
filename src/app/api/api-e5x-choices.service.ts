import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiE5XChoicesItem, ApiE5XChoicesList } from './api.interface';

@Injectable()
export class ApiE5XChoicesService  extends ApiRestService {

  private relativeUrl = '/e5x/choices/';

  constructor(http: HttpClient) { super(http); }

  public getChoice(_id: number, options?: ApiOptionsInterface): Observable<ApiE5XChoicesItem> {

    return this.getItem(this.relativeUrl, _id, options);
  }

  public getChoices(options?: ApiOptionsInterface): Observable<ApiE5XChoicesList> {

    return this.getList(this.relativeUrl, options);
  }

}
