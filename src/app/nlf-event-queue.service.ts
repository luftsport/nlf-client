import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Define event types as enum
 */
export enum AppEventType {
  ObsregEvent = 'OBSREG_EVENT', //OBSREG
  WebSocketEvent = 'WEB_SOCKET_EVENT', //Socket.io
}

/**
 * Define events structure
 */
export class AppEvent<T> {
  constructor(
    public type: AppEventType,
    public payload: T,
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class NlfEventQueueService {

  private eventBroker = new Subject<AppEvent<any>>();

  on(eventType: AppEventType): Observable<AppEvent<any>> {
    return this.eventBroker.pipe(filter(event => event.type === eventType));
  }

  dispatch<T>(event: AppEvent<T>): void {
    this.eventBroker.next(event);
  }
}
