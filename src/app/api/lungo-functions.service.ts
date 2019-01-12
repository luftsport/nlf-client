import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface } from './api.interface';
import { LungoFunctionsItem, LungoFunctionsList, LungoFunctionsTypesItem, LungoFunctionsTypesList } from 'app/api/lungo.interface';

@Injectable({
  providedIn: 'root'
})
export class LungoFunctionsService extends ApiRestService {

  constructor(http: HttpClient) { super(http); }

  private relativeUrl = '/integration/functions/';

  public getFunction(id: string, options?: ApiOptionsInterface): Observable<LungoFunctionsItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getFunctions(options?: ApiOptionsInterface): Observable<LungoFunctionsList> {

    return this.getList(this.relativeUrl, options);
  }

  public getFunctionType(id: string, options?: ApiOptionsInterface): Observable<LungoFunctionsTypesItem> {

    return this.getItem(this.relativeUrl + 'types/', id, options);
  }

  public getFunctionsTypes(options?: ApiOptionsInterface): Observable<LungoFunctionsTypesList> {

    return this.getList(this.relativeUrl + 'types/', options);
  }


}
