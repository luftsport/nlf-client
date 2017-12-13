import { Injectable } from '@angular/core';
import { HttpRequest,HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AlertService } from '../services/alert/alert.service';

//import { AuthComponent } from './auth.component'; // Do not work


/**
Should only use AlertService for development environment
**/

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(private router: Router, private alertService: AlertService) { } //, private auth: AuthComponent) { } Dows not work?

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //Request:
    if(localStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Basic ' + localStorage.getItem('token'),
        }
      });
    }

    return next.handle(request).do((event: HttpEvent<any>) => {

      //Response
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        //return next.handle(request);
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {

        if (err.status === 401) {
          this.collectFailedRequest(request); //from user-auth service which is needed in constructor
          console.log("401");
          console.log(this.cachedRequests);
          this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url }});

        }
        else {
          this.alertService.warning(err.message);
        }
      }
    });
  }
}
