import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NlfAuthSubjectService } from './auth-subject.service';
import { Location } from '@angular/common';
import { environment } from 'environments/environment';


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
  private isAuthenticated = false;

  access_token: string;
  oauth_error: string;
  oauth_error_descr: string;
  _return_uri: string;
  env = environment;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    public auth: NlfAuthService,
    private authSubject: NlfAuthSubjectService) {


    this._return_uri = window.location.href; //this.router.url;

    this.authSubject.observableAuth.subscribe(
      update => this.isAuthenticated = update,
      err => this.isAuthenticated = false
    );

    this.route.queryParams.subscribe(
      params => {
        this.access_token = params['access_token'];
        console.log('ACCESS TOKEN', this.access_token);
        //this.oauth_error = params['error'];
        //this.oauth_error_descr = params['error_description'];
        if (!!this.access_token) {
          this.oauthLogin();
        }
      },
      err => { }
    );


  }

  ngOnInit() { }

  isAuth() {
    console.log('Auth component isAuth');
    return this.isAuthenticated;
  }

  oauthLogin(returnUrl?: string) {
    console.log('Doing the login', this.access_token);
    this.auth.login('access_token', this.access_token, returnUrl);
    //this.location.go(this.location.path());

  }

  login(returnUrl?: string) {
    console.log('Authed STARTED');
    this.auth.login(this.model.username, this.model.password, returnUrl);
  }

  /**
  ngOnInit() {

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log('Route', this.route.snapshot);
  }
 */


}
