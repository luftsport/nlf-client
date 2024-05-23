import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface } from './api.interface';
import { LungoCompetencesItem, LungoCompetencesList, LungoCompetencesTypesItem, LungoCompetencesTypesList } from 'app/api/lungo.interface';

@Injectable({
  providedIn: 'root'
})
export class LungoCompetencesService extends ApiRestService {

  private relativeUrl = '/integration/competences/';

  constructor(http: HttpClient) { super(http); }

  public getCompetence(id: string | number, options?: ApiOptionsInterface): Observable<LungoCompetencesItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getCompetences(options?: ApiOptionsInterface): Observable<LungoCompetencesList> {

    return this.getList(this.relativeUrl, options);
  }

  public getFunctionType(id: string, options?: ApiOptionsInterface): Observable<LungoCompetencesTypesItem> {

    return this.getItem(this.relativeUrl + 'types/', id, options);
  }

  public getCompetencesTypes(options?: ApiOptionsInterface): Observable<LungoCompetencesTypesList> {

    return this.getList(this.relativeUrl + 'types/', options);
  }


}
