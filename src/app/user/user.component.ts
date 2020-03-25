import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUserService } from 'app/api/api-user.service';
import { ApiOptionsInterface } from 'app/api/api.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { NlfUserSubjectService } from 'app/user/user-subject.service';

@Component({
  selector: 'nlf-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class NlfUserComponent implements OnInit {

  user: any = {};
  person_id: number;
  something = 'testit';
  currentUser: any;
  avatar = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  dataReady = false;

  
  constructor(private apiUserService: ApiUserService,
    public domSanitizer: DomSanitizer,
    private userSubject: NlfUserSubjectService) {

    this.userSubject.observable.subscribe(
      data => {
        if (!!data) {
          this.person_id = data.person_id;
        }
      },
      err => console.log('Error getting user data: ', err)
    );
  }

  public getAvatar() {
    this.apiUserService.getAvatar(this.person_id).subscribe(
      data => {

        if (data.avatar) {
          this.avatar = 'data:' + data.avatar.content_type + ';base64,' + data.avatar.file;
        }
        // this.user.id = storage.getId();
      },
      err => console.error(err),
      () => { this.dataReady = true; }
    );
  }


  ngOnInit() {
    this.getAvatar();
  }

  /**

  $scope.avatar.dataURL = 'data:'+data.avatar.content_type+';base64,'+data.avatar.file;
}
else {
  $scope.avatar.dataURL = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  public getone(id:number) {


    this.userService.getUser(id).subscribe(
      data => {
        console.log(data);
        this.fullname = data.fullname;
        this.birthdate = data.birthdate;
      },
    err => console.error(err),
    () => console.log("Done")
    );
  }

  public getthem() {

    this.users = [];
    this.userService.getUsers(0,10).subscribe(
      data => {
        console.log(data);
        this.users = data._items;
      },
      err => console.error(err),
      () => console.log("Done")
      );
    }
    **/
}

