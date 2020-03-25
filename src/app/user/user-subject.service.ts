import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiUserDataSubjectItem } from 'app/api/api.interface';
import { ApiUserService } from 'app/api/api-user.service';
import { isEqual, cloneDeep } from 'lodash';

@Injectable()
export class NlfUserSubjectService {
  /**
   *
   */

  private subject = new BehaviorSubject<ApiUserDataSubjectItem>({});
  public observable = this.subject.asObservable();

  private currentSettings = {};

  constructor(private user: ApiUserService) {

    // Always!
    try {
      const data = <ApiUserDataSubjectItem>JSON.parse(localStorage.getItem('user-data'));

      if (!!data && data.hasOwnProperty('settings')) {
        this.currentSettings = cloneDeep(data.settings);
      }
      this.update(data);
    } catch (e) {
      console.log('User subject error instantiating user data: ', e);
    }
  }

  public update(subject: ApiUserDataSubjectItem) {

    console.log('USER SUBJECT', subject);
    if (!!subject && subject.hasOwnProperty('settings') && !isEqual(subject.settings, this.currentSettings)) {
      console.log('USER SAVING....');
      this.user.save(subject._id, { settings: subject.settings }, subject._etag).subscribe(
        success => {
          subject._etag = success._etag;
          this.currentSettings = cloneDeep(subject.settings);
          localStorage.setItem('user-data', JSON.stringify(subject));
          this.subject.next(subject);
        },
        err => console.log('Det oppstod en feil under lagring av settings')
      );

    }

    this.subject.next(subject);
  }

}
