import { Injectable } from '@angular/core';
import { UserAuthService } from '../api/user-auth.service';
import { AlertService } from '../services/alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthService {

  private isAuth: boolean = false;

  constructor(
    private authenticationService: UserAuthService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router) { }


  public logout(force?: boolean, returnUrl?: string) {

    if(!returnUrl) { returnUrl = 'home';}

    if(localStorage.getItem('currentUser') && !force) {
      this.alertService.success("Du har blitt logget ut", true);
    }
    else if(localStorage.getItem('currentUser') && force) {
      this.alertService.warning("Du har blitt automatisk logget ut", true);
    }
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('valid');

    if(force) {
      this.router.navigate([returnUrl]);
    }
    else {
      this.router.navigate('/home');
    }

  }


  public isAuthenticated() {

    return this.isAuth;

  }

  public login(username: string, password: string, returnUrl?: string) {
      if(!returnUrl) { returnUrl = 'home';}
      this.authenticationService.authenticate(username, password)
          .subscribe(
              data => {
                if(data.success == true) {
                  console.log(data);
                  localStorage.setItem('currentUser', username );
                  localStorage.setItem('token', data.token64);
                  localStorage.setItem('valid', data.valid['$date']);
                  this.isAuth = true;
                  //this.alertService.success("You logged in, yay!"); //This works after navigate
                  if(returnUrl) {
                    this.router.navigate([returnUrl]);
                  }
                  else {
                    this.router.navigate('/home');
                  }
                }
                else {

                  this.alertService.warning(data.message);
                  this.message = data.message;
                  this.isAuth = false;
                }
              },
              error => {
                  console.log(error);
                  //This is a HttpErrorResponse should send the whole to alertService and do stuff there
                  this.alertService.error(error.message);
                  this.loading = false;
                  this.isAuth = false;
              });
  }
}
