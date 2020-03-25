import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface, ApiNotificationsItem, ApiNotificationsList } from './api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiNotificationsService extends ApiRestService {

  private relativeUrl: string = '/notifications';

  constructor(http: HttpClient) { super(http); }


  public getNotification(id: string, options?: ApiOptionsInterface): Observable<ApiNotificationsItem> {
    return this.getItem(this.relativeUrl, id, options);
  }

  public getNotifications(options?: ApiOptionsInterface): Observable<ApiNotificationsList> {
    return this.getList(this.relativeUrl, options);
  }

  public reminder(payload, options?: ApiOptionsInterface): Observable<any> {
    return this.post(this.relativeUrl + '/bin/reminder/', payload, options);
  }

  public message(payload, options?: ApiOptionsInterface): Observable<any> {
    return this.post(this.relativeUrl + '/bin/message/', payload, options);
  }

  public getEvents(options?: ApiOptionsInterface): Observable<ApiNotificationsList> {
    return this.getList(this.relativeUrl + '/events', options);
  }

  public create(payload, options?: ApiOptionsInterface): Observable<ApiNotificationsItem> {
    return this.post(this.relativeUrl, payload, options);
  }

  public save(_id: string, payload, etag?: string, options?: ApiOptionsInterface): Observable<ApiNotificationsItem> {
    return this.patch(this.relativeUrl, _id, payload, options, etag);
  }
}
