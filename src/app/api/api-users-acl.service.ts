import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiAclUserInterface } from './api.interface';

@Injectable()
export class ApiUsersAclService extends ApiRestService {

  constructor( http: HttpClient ) { super(http); }

  private relativeUrl = '/users/acl/';

  /**
   * Returns an object with the read, write and execute rights for resource
   * @param objectId mongoId
   * @param resource string resource, example 'observations'
   * @param options ApiOptionsInterface
   */
  public getResourceAcl(objectId: string, resource: string, options?: ApiOptionsInterface): Observable<ApiAclUserInterface> {

    return this.getList(this.relativeUrl + resource + '/' + objectId, options);
  }

}
