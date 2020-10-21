import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiUserDataSubjectItem } from 'app/api/api.interface';
import { ApiUserService } from 'app/api/api-user.service';
import { isEqual, cloneDeep } from 'lodash';
import { NlfUserSubjectService } from 'app/user/user-subject.service';
import { avatar_tmp_image } from 'app/interfaces/functions';
import { NlfAlertService } from 'app/services/alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class NlfUserAvatarSubjectService {

  private subject = new BehaviorSubject<string>('');
  public observable = this.subject.asObservable();

  private inited = false;
  private _id: string;
  private avatar: string;
  private user_data: ApiUserDataSubjectItem;

  constructor(
    private userSubject: NlfUserSubjectService,
    private userService: ApiUserService,
    private alertService: NlfAlertService
  ) {
    this.avatar = avatar_tmp_image;
    this.userSubject.observable.subscribe(
      data => {
        try {
          this.user_data = data;
          if (!this.inited) {
            this._id = data._id;
            this.getAvatar();
            this.inited = true;
          }
        } catch { }
      },
      err => console.log('Error getting user data: ', err));
  }

  private getAvatar() {
    this.userService.getAvatar(this._id).subscribe(
      data => {
        try {
          this.avatar = data.avatar; //'data:' + data.avatar.content_type + ';base64,' + data.avatar.file;
          if(this.user_data._etag != data._etag) {
            this.user_data._etag = data._etag;
            this.userSubject.update(this.user_data);
          }
          this.subject.next(this.avatar);
        } catch {
          console.log('Error in avatar subject');
        }
      },
      err => console.error(err),
    );
  }

  public update(subject: string) {

    if (!!subject && subject != this.avatar) {

      this.userService.save(this._id, { avatar: subject }, this.user_data._etag).subscribe(
        data => {
          this.user_data._etag = data._etag;
          this.avatar = subject;
          this.subject.next(subject);
          this.userSubject.update(this.user_data);
          this.alertService.success('Avatar saved successfully', false, true, 5);
        },
        err => {
          this.alertService.error('Error storing avatar: ' + err, false, true, 15);
        }
      );
    }
  }

}
