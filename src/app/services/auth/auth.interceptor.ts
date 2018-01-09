import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router, RouterStateSnapshot } from '@angular/router';
import { NlfAlertService } from '../alert/alert.service';
import { NlfLocalStorageService } from '../storage/local-storage.service';


// import { AuthService } from './auth.service'; //Can't use due to cyclic dependency?



/**
* Should only use AlertService for development environment
*/

@Injectable()
export class NlfAuthInterceptor implements HttpInterceptor {

  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(private router: Router,
    private alertService: NlfAlertService,
    private storage: NlfLocalStorageService
    // private authService: AuthService
  ) {  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed

    for (let r of this.cachedRequests) {
      // next.handle(r) //.do((event: HttpEvent<any>) =>);
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Request:
    if (this.storage.hasToken(true)) { // should verify valid?
      request = request.clone({
        setHeaders: {
          Authorization: 'Basic ' + this.storage.getToken(),
        }
      });
    }

    return next.handle(request).do((event: HttpEvent<any>) => {

      // Response
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        // return next.handle(request);
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {

        if (err.status === 401) {
          this.collectFailedRequest(request); //from user-auth service which is needed in constructor
          console.log('401');
          console.log(this.cachedRequests);
          //this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url }});

        }
        else {
          this.alertService.warning(err.message);
        }
      }
    });
  }
}
