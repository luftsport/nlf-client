import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.css']
})
export class AppUserComponent implements OnInit {

  constructor(private userService: UserService) {
    this.getone();
  }

  fullname: string = 'Loading..';
  birthdate: Date;
  users: any[];

  ngOnInit() {}


  public getone() {
    this.userService.getUser(45199).subscribe(
      data => {

        //this.data = data;
        //this.results = data;
        // item/list <Article[]> _items
        console.log(data);
        this.fullname = data.fullname;
        this.birthdate = data.birthdate;
        //this.body = data['_items'][0]['body'];
        //return data.name;
      },
    err => console.error(err),
    () => console.log("Done")
    );
  }

  public getthem() {

    this.users = [];
    this.userService.getUsers().subscribe(
      data => {
        console.log(data);
        this.users = data._items;
      },
      err => console.error(err),
      () => console.log("Done")
      );
    }
}
