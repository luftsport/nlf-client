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

  private relativeUrl = '/integration/';

  constructor(http: HttpClient) { super(http); }

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

  public startSyncdaemonWorkers(): Observable<any> {
    return this.post(this.relativeUrl + 'syncdaemon/workers/start', null);
  }

  public stopSyncdaemonWorkers(): Observable<any> {
    return this.post(this.relativeUrl + 'syncdaemon/workers/shutdown', null);
  }

  public rebootSyncdaemonWorkers(): Observable<any> {
    return this.post(this.relativeUrl + 'syncdaemon/workers/reboot', null);
  }

  public stopSyncdaemon(): Observable<any> {
    return this.post(this.relativeUrl + 'syncdaemon/shutdown', null);
  }

  public getSyncdaemonStatus(): Observable<any> {
    return this.getList(this.relativeUrl + 'syncdaemon/status');
  }

  public rebootSyncdaemonWorker(index: number): Observable<any> {
    return this.post(this.relativeUrl + 'syncdaemon/worker/reboot/' + index, null);
  }

  public getNifCompetences(person_id: number, options?: ApiOptionsInterface): Observable<any>{
    return this.getList(this.relativeUrl + 'nif/competences/'+person_id);
  }

  public getNifLicenses(person_id: number, options?: ApiOptionsInterface): Observable<any>{
    return this.getList(this.relativeUrl + 'nif/licenses/'+person_id);
  }

  public generateChangeMessage(entity_id: number, entity_type: string, options?: ApiOptionsInterface): Observable<any>{
    return this.post(this.relativeUrl + 'nif/change/', {entity_id: entity_id, entity_type: entity_type}, options);
  }

}
