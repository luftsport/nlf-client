import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { RestService } from './rest.service'
import { OptionsInterface } from './options.interface';

interface LicenseItem {
  _id: string;
  id: string;
  name: string;
}

interface LicenseList {
  _items: LicenseItem[];

}

@Injectable()
export class LicensesService  extends RestService {

  constructor(http: HttpClient) { super(http); }

  private relativeUrl: string = '/licenses/';

  public getLicense(id:string, options?: OptionsInterface): Observable<LicenseItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getLicenses(options?: OptionsInterface): Observable<LicenseList> {

    return this.getList(this.relativeUrl, options);
  }

}
