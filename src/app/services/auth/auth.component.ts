import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NlfAuthSubjectService } from './auth-subject.service';


// import { UserAuthService } from '../api/user-auth.service';
// import { AlertService } from '../services/alert/alert.service';
import { NlfAuthService } from './auth.service';

@Component({
  selector: 'nlf-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class NlfAuthComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  message: string;
  private isAuthenticated: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private auth: NlfAuthService,
              private authSubject: NlfAuthSubjectService) {

    this.authSubject.observableAuth.subscribe(
      update => this.isAuthenticated = update,
      err => this.isAuthenticated = false
    );
  }


  isAuth() {
    console.log('Auth component isAuth');
    return this.isAuthenticated;
  }

  login(returnUrl?: string) {

    this.loading = true;
    if (this.auth.login(this.model.username, this.model.password, returnUrl)) {
      this.loading = false;

    } else {
      this.loading = false;
    }

  }

  ngOnInit() {

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log('Route', this.route.snapshot);
  }



}
