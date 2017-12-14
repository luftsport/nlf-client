import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            //if( Date.now() > +localStorage.getItem('valid')-(1000*60*59) ) {
            if( Date.now() > +localStorage.getItem('valid') ) {
              this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
              return false;

            }

            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;

    }
}
