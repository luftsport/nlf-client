import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiRestService } from './api-rest.service';
import { ApiOptionsInterface } from 'app/api/api.interface';
import {
  LungoSyncdaemonProcessInfoItem,
  LungoSyncdaemonWorkersLogsList,
  LungoSyncdaemonWorkerLogList,
  LungoSyncdaemonWorkersStatusList,
  LungoIntegrationChangesStatusList,
  LungoIntegrationChangesAggregateList } from './lungo.interface';

@Injectable({
  providedIn: 'root'
})
export class LungoIntegrationService extends ApiRestService {

  constructor(http: HttpClient) { super(http); }

  private relativeUrl = '/integration/';

  public getWorkersStatus(options?: ApiOptionsInterface): Observable<LungoSyncdaemonWorkersStatusList> {
    const localUrl = 'syncdaemon/workers/status';
    return this.getList(this.relativeUrl + localUrl, options);
  }

  public getWorkersLogs(options?: ApiOptionsInterface): Observable<LungoSyncdaemonWorkersLogsList> {
    const localUrl = 'syncdaemon/workers/logs';
    return this.getList(this.relativeUrl + localUrl, options);
  }

  public getWorkerLog(id: number, options?: ApiOptionsInterface): Observable<LungoSyncdaemonWorkerLogList> {
    return this.getItem(this.relativeUrl + 'syncdaemon/worker/log/', id, options);
  }

  public getProcessInfo(options?: ApiOptionsInterface): Observable<LungoSyncdaemonProcessInfoItem> {
    const localUrl = 'syncdaemon/process/info';
    return this.getList(this.relativeUrl + localUrl, options);
  }

  public getIntegrationChangesStatus(options?: ApiOptionsInterface): Observable<LungoIntegrationChangesStatusList> {
    const localUrl = 'integration/changes/status';
    return this.getList(this.relativeUrl + localUrl, options);
  }

  public getIntegrationChangesEntityTypes(options?: ApiOptionsInterface): Observable<LungoIntegrationChangesStatusList> {
    const localUrl = 'integration/changes/entity/types';
    return this.getList(this.relativeUrl + localUrl, options);
  }
  public getIntegrationChangesByHour(options?: ApiOptionsInterface): Observable<LungoIntegrationChangesAggregateList> {
    const localUrl = 'integration/changes/aggregate/hour';
    return this.getList(this.relativeUrl + localUrl, options);
  }


}
