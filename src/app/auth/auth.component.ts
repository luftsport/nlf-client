import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserAuthService } from '../api/user-auth.service';
import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  message: string = '';

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: UserAuthService,
      private alertService: AlertService
      //private authenticationService: AuthenticationService,
      //private alertService: AlertService
    ) {
  this.logout(); }

  ngOnInit() {

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public logout() {
    if(localStorage.getItem('currentUser')) {
      this.alertService.info("Du har blitt logget ut");
    }
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('valid');
  }

  login() {
      this.loading = true;

      this.authenticationService.authenticate(this.model.username, this.model.password)
          .subscribe(
              data => {
                if(data.success == true) {
                  console.log(data);
                  localStorage.setItem('currentUser', this.model.username );
                  localStorage.setItem('token', data.token64);
                  localStorage.setItem('valid', data.valid['$date']);
                  this.router.navigate([this.returnUrl]);
                  //this.alertService.success("You logged in, yay!"); //This works after navigate
                }
                else {
                  this.loading = false;
                  this.alertService.warning(data.message);
                  this.message = data.message;
                }
              },
              error => {
                  console.log(error);
                  //This is a HttpErrorResponse should send the whole to alertService and do stuff there
                  this.alertService.error(error.message);
                  this.loading = false;
              });
  }

}
