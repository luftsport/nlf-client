import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserAuthService } from '../api/user-auth.service';
import { AlertService } from '../services/alert.service';

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
    ) { }

  ngOnInit() {
      // reset login status
      //this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
      this.loading = true;


      this.authenticationService.authenticate(this.model.username, this.model.password)
          .subscribe(
              data => {
                if(data.success == true) {
                  console.log(data);
                  localStorage.setItem('currentUser', data.id );
                  localStorage.setItem('token64', data.token64);
                  this.router.navigate([this.returnUrl]);
                }
                else {
                  this.loading = false;
                  this.alertService.error(data.message);
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
