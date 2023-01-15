import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NlfAuthSubjectService } from './auth-subject.service';
import { Location } from '@angular/common';
import { environment } from 'environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NlfUserFirstLoginComponent } from 'app/user/user-first-login/user-first-login.component';
// import { UserAuthService } from '../api/user-auth.service';
// import { AlertService } from '../services/alert/alert.service';
import { ApiHeartbeatService } from 'app/api/api-heartbeat.service';
import { ApiHeartbeat } from 'app/api/api.interface';
import { NlfAuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';
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
  id_token: string;
  oauth_error: string;
  oauth_error_descr: string;
  _return_uri: string;
  ENV = environment;

  status: ApiHeartbeat;

  // random: number = 0;

  modalRef;

  constructor(private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    public auth: NlfAuthService,
    private authSubject: NlfAuthSubjectService,
    private modalService: NgbModal,
    private heartbeat: ApiHeartbeatService) {


    this._return_uri = window.location.href; // this.router.url;

    this.heartbeat.get().subscribe(
      data => this.status = data,
      err => {
        if ('_status' in err) {
          this.status = err;
        } else {
          this.status = { _status: false, message: { mongo: 0 } };
        }
      }
    )


    this.authSubject.observableAuth.subscribe(
      update => {
        console.log('Auth subject', update);
        this.isAuthenticated = update;
        if (update === true && this.auth.firstLogin && !this.modalService.hasOpenModals()) {
          this.open();
        } else if (update === false) {
          this.close();
        }

      },
      err => this.isAuthenticated = false
    );

  }

  ngOnInit() {
    // this.random = Math.random();
    this.route.queryParamMap.subscribe(
      (params: ParamMap) => {
        console.log('Params map', params['params']);
        if (!!params['params']['access_token']) {
          this.access_token = params['params']['access_token'];
          this.id_token = params['params']['id_token'];
          console.log('Query params map access token', params['params']);
          this.oauthLogin(this.access_token, this.id_token);
          this.removeOauthParams();

        } else if (!!params['params']['error']) {
          console.log('Query params map error', params['params']);
          this.oauth_error = params['params']['error'];
          this.oauth_error_descr = params['params']['error_description'];
          this.removeOauthParams();

        }

      },
      err => console.log('Error retrieving query params: ' + err), // this.removeOauthParams(),
      // () => this.removeOauthParams()
    );
  }

  open() {
    this.modalRef = this.modalService.open(NlfUserFirstLoginComponent, { backdrop: 'static', keyboard: false });
  }

  close() {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll();
    }
  }

  isAuth() {
    console.log('Auth component isAuth');
    return this.isAuthenticated;
  }

  oauthLogin(token, id_token?: string, returnUrl?: string) {
    console.log('Doing the login', token, id_token);
    this.auth.login('access_token', token, id_token, returnUrl);

    //this.location.go(this.location.path());

  }

  private removeOauthParams() {
    // return;
    // oauth
    this.router.navigate([], {
      queryParams: {
        access_token: null,
        token_type: null,
        expires_in: null,
        error: null,
        error_description: null,
        scope: null,
        id_token: null
      },
      queryParamsHandling: 'merge',
      // skipLocationChange: false,
      replaceUrl: true
    }).then(
      result => {
        console.log('PATH', this.location.path(), 'Router', this.router.url, 'URL', this.route.snapshot.url);
        this._return_uri = window.location.href;
      }
    );
  }


  /**
  ngOnInit() {

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log('Route', this.route.snapshot);
  }
 */


}
