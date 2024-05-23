import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { NlfAuthService } from './auth.service';
import { NlfAuthSubjectService } from './auth-subject.service';


@Injectable()
export class NlfAuthGuard implements CanActivate {

    isLoggedIn: boolean;

    constructor(private router: Router,
        private alertService: NlfAlertService,
        private authService: NlfAuthService,
        private authSubject: NlfAuthSubjectService) {

        this.authSubject.observableAuth.subscribe(
            auth => this.isLoggedIn = auth,
            err => this.isLoggedIn = false
        );
    }

    /**
    Since ng2-idle is used this is redudant
    Should be checking acl's instead
    **/
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
        return true;
        if (this.isLoggedIn) { // do not validate token
            return true;
        } else {
            this.alertService.warning('Du har ikke tilgang til denne ressursen');
            this.authService.logout();
            return false;
        }

    }
}
