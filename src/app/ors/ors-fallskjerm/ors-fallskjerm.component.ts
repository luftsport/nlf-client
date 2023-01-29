import { Component, OnInit } from '@angular/core';
import { NlfUserSubjectService } from 'app/user/user-subject.service';
import { NlfComponent } from 'app/nlf.component';
import { ApiUserDataSubjectItem } from 'app/api/api.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'nlf-ors-fallskjerm',
  templateUrl: './ors-fallskjerm.component.html',
  styleUrls: ['./ors-fallskjerm.component.css']
})
export class NlfOrsFallskjermComponent implements OnInit {

  user_settings: ApiUserDataSubjectItem;

  constructor(
    private userSubject: NlfUserSubjectService,
    private app: NlfComponent    
  ) {

    this.userSubject.observable.subscribe(
      data => {
        if (!!data) {
          this.user_settings = data;
        }
      },
      err => console.log('Error getting user data: ', err),
      () => { }
    );

  }

  ngOnInit() {
    this.app.setTitle('OBSREG Oversikt');
  }



}
