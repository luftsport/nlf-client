import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiHeartbeat } from './api.interface';


@Injectable()
export class ApiHeartbeatService extends ApiRestService {

  private relativeUrl = '/heartbeat/';

  constructor(http: HttpClient) { super(http); }

  public get(options?: ApiOptionsInterface): Observable<ApiHeartbeat> {

    return this.getList(this.relativeUrl, options);
  }

}
