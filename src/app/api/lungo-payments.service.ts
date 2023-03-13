import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface } from './api.interface';
import { LungoPaymentsItem, LungoPaymentsItemList } from 'app/api/lungo.interface';

@Injectable({
  providedIn: 'root'
})
export class LungoPaymentsService extends ApiRestService {

  private relativeUrl = '/integration/payments/';

  constructor(http: HttpClient) { super(http); }

  public getPayment(id: string, options?: ApiOptionsInterface): Observable<LungoPaymentsItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getPayments(options?: ApiOptionsInterface): Observable<LungoPaymentsItemList> {

    return this.getList(this.relativeUrl, options);
  }

}
