import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiUserService } from '../api/api-user.service';
import { ApiOptionsInterface } from '../api/api.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { NlfLocalStorageService } from '../services/storage/local-storage.service';

@Component({
  selector: 'nlf-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class NlfUserComponent implements OnInit {

  user: any = {};
  something = 'testit';
  currentUser: any;
  avatar = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

  constructor(private apiUserService: ApiUserService,
              private domSanitizer: DomSanitizer,
              private storage: NlfLocalStorageService) {
      this.user.id = storage.getId();
  }

  public getAvatar() {
    this.apiUserService.getAvatar(this.user.id).subscribe(
      data => {

        if (data.avatar) {
          this.avatar  = 'data:' + data.avatar.content_type + ';base64,' + data.avatar.file;
        }
        // this.user.id = storage.getId();
      },
      err => console.error(err),
      () => console.log('Done')
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
