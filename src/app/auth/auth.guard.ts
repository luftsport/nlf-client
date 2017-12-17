import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertService } from '../services/alert/alert.service';
import { AuthService } from './auth.service';
import { Observable } from "rxjs";
import { LocalStorageService } from '../services/storage/local-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {

    isLoggedIn : Observable<boolean>;

    constructor(private router: Router,
                private alertService: AlertService,
                private authService: AuthService,
                private storage: LocalStorageService
              ) {
              this.isLoggedIn = authService.isAuthenticated();
            }

    /**
    Since ng2-idle is used this is redudant
    Should be checking acl's instead
    **/
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.storage.hasToken(true)) {
            return true;
        }
        else {
          this.alertService.warning('Your session has timed out and you got automatically logged out');
          this.authService.logout();
          return false;
        }

    }
}
