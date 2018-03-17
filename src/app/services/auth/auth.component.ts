import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: NlfAuthService,

    // private alertService: AlertService
    // private authenticationService: AuthenticationService,
    // private alertService: AlertService
  ) {
  }

  isAuth() {
    return this.auth.isAuthenticated();
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
  }



}
