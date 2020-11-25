import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiObservationsItem, ApiObservationsList, ApiWorkflowPayloadInterface } from './api.interface';

@Injectable()
export class ApiObservationsWorkflowService extends ApiRestService {

  private relativeUrl: string;

  constructor(http: HttpClient) { super(http); }

  public setActivity(activity: string) {
    this.relativeUrl = '/' + activity + '/observations/workflow/';
  }

  public getWorkflowState(id: string | number, options?: ApiOptionsInterface): Observable<ApiObservationsItem> {

    return this.getItem(this.relativeUrl + id, '/state', options);
  }

  public getWorkflowTodo(options?: ApiOptionsInterface): Observable<ApiObservationsList> {
    return this.getList(this.relativeUrl + 'todo', options);
  }

  public getGraph(objectId: string, state: string, options?: ApiOptionsInterface): Observable<any> {

    return this.getItem(this.relativeUrl + objectId, '/graph/' + state, options);
  }

  /**
   * Change workflow by action
   * @param objectId Mongodb _id
   * @param action string
   * @param comment string
   * @param options ApiOptionsInterface
   */
  public changeWorkflowState(objectId: string, action: string, payload: ApiWorkflowPayloadInterface, options?: ApiOptionsInterface): Observable<ApiObservationsList> {

    return this.post(this.relativeUrl + objectId + '/' + action, payload, options);
  }
}
