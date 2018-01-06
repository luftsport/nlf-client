import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { RestService } from './rest.service'
import { OptionsInterface } from './options.interface';

interface ClubItem {
  _id: string;
  id: string;
  name: string;
}

interface ClubList {
  _items: ClubItem[];

}

@Injectable()
export class MelwinClubsService extends RestService {

  constructor(http: HttpClient) { super(http); }

  private relativeUrl: string = '/melwin/clubs/';

  public getClub(id:string, options?: OptionsInterface): Observable<ClubItem> {

    return this.getItem(this.relativeUrl, id, options);
  }

  public getClubs(options?: OptionsInterface): Observable<ClubList> {

    return this.getList(this.relativeUrl, options);
  }

}
