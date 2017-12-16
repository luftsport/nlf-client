import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertService } from '../services/alert/alert.service';
import { AuthService } from './auth.service';
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

    isLoggedIn : Observable<boolean>;

    constructor(private router: Router,
                private alertService: AlertService,
                private authService: AuthService
              ) {
              this.isLoggedIn = authService.isAuthenticated();
            }

    /**
    Since ng2-idle is used this is redudant
    Should be checking acl's instead
    **/
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("Logget inn guard:" + this.authService.hasToken());
        if (this.authService.hasToken()) {
            // logged in so return true
            //if( Date.now() > +localStorage.getItem('valid')-(1000*60*59) ) {
            if( Date.now() > +localStorage.getItem('valid') ) {
              this.alertService.warning('Your session has timed out and you got logged out');
              //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
              this.authService.logout();
              return false;

            }

            return true;
        }

        //this.authService.logout();
        //this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        this.authService.logout();
        return false;

    }
}
