import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { UserService } from '../api/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.css']
})
export class AppUserComponent implements OnInit {

  user: any = {};
  avatar: string = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

  constructor(private userService: UserService,
              private domSanitizer: DomSanitizer) {

      this.user.id = +localStorage.getItem('currentUser');
  }

  public getAvatar() {
    this.userService.getAvatar(this.user.id).subscribe(
      data => {

        if(data.avatar) {
          this.avatar  = 'data:'+data.avatar.content_type+';base64,'+data.avatar.file;
        }
        //this.user.id = localStorage.getItem('currentUser');
      },
      err => console.error(err),
      () => console.log("Done")
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
