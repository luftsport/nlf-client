import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NlfAlertService } from '../alert/alert.service';
import { NlfAuthService } from './auth.service';
import { Observable } from "rxjs";
import { NlfLocalStorageService } from '../storage/local-storage.service';

@Injectable()
export class NlfAuthGuard implements CanActivate {

    isLoggedIn: Observable<boolean>;

    constructor(private router: Router,
                private alertService: NlfAlertService,
                private authService: NlfAuthService,
                private storage: NlfLocalStorageService
              ) {
              this.isLoggedIn = authService.isAuthenticated();
            }

    /**
    Since ng2-idle is used this is redudant
    Should be checking acl's instead
    **/
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.storage.hasToken(false)) { // do not validate token
            return true;
        } else {

          this.alertService.warning('Your session has timed out and you got automatically logged out');
          this.authService.logout();
          return false;
        }

    }
}
