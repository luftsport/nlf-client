import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiRestService } from './api-rest.service';

import { ApiOptionsInterface, ApiMetarDict, ApiTafMetar } from './api.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiNlfMetService extends ApiRestService {

  private relativeUrl = '/weather/met/';

  constructor(http: HttpClient) { super(http); }

  public getLastMetar(icao: string, options?: ApiOptionsInterface): Observable<ApiMetarDict> {

    return this.getList(this.relativeUrl + 'metar/' + icao.toUpperCase(), options);
  }

  public getTafMetar(icao: string, date?: string, options?: ApiOptionsInterface): Observable<ApiTafMetar> {

    return this.getList(this.relativeUrl + icao.toUpperCase() + '/' + date, options);
  }

  public getNearestMetar(icao: string, datetime: string): Observable<{ metar: string, parsed: string }> {
    return this.getList(this.relativeUrl + 'metar/nearest/' + icao.toUpperCase() + '/' + datetime);
  }
}
