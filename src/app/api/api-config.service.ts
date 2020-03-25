import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiRestService } from './api-rest.service';
import { NlfConfigItem, ApiOptionsInterface } from './api.interface';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService extends ApiRestService {

  private relativeUrl = '/app/config/';

  constructor(http: HttpClient) {
    super(http);
  }

  public getConfig(options?: ApiOptionsInterface): Observable<NlfConfigItem> {
    return this.getItem(this.relativeUrl, environment._name, options);
  }

}
