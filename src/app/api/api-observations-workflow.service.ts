import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiObservationsItem, ApiObservationsList } from './api.interface';

@Injectable()
export class ApiObservationsWorkflowService extends ApiRestService {

  constructor( http: HttpClient ) { super(http); }

  private relativeUrl = '/observations/workflow/';

  public getWorkflowState(id: string | number, options?: ApiOptionsInterface): Observable<ApiObservationsItem> {

    return this.getItem(this.relativeUrl + id + 'state', id, options);
  }

  public getWorkflowTodo(options?: ApiOptionsInterface): Observable<ApiObservationsList> {
    console.log(options);
    return this.getList(this.relativeUrl + 'todo', options);
  }

  /**
   * Change workflow by action
   * @param objectId Mongodb _id
   * @param action string
   * @param comment string
   * @param options ApiOptionsInterface
   */
  public changeWorkflowState(objectId: string, action: string, comment: string, options?: ApiOptionsInterface): Observable<ApiObservationsList> {

    return this.post(this.relativeUrl + objectId + '/' + action, {'comment': comment}, options);
  }
}
