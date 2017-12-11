import { Injectable } from '@angular/core';
import { HttpRequest,HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(private router: Router) { }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //Request:
    request = request.clone({
    setHeaders: {
      Authorization: 'Basic ' + localStorage.getItem('token64'),

    }
    });

    return next.handle(request).do((event: HttpEvent<any>) => {

      //Response
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        //return next.handle(request);
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        console.log("Got error");
        if (err.status === 401) {
          this.collectFailedRequest(request); //from user-auth service which is needed in constructor
          console.log("401");
          console.log(this.cachedRequests);
          this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url }});

        }
      }
    });
  }
}
