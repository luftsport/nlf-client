import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { do } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Router, RouterStateSnapshot } from '@angular/router';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { NlfAuthService } from './auth.service';
import { NlfAuthSubjectService } from './auth-subject.service';

// import { AuthService } from './auth.service'; //Can't use due to cyclic dependency?

/**
* Should only use AlertService for development environment
*/

@Injectable()
export class NlfAuthInterceptor implements HttpInterceptor {

  cachedRequests: Array<HttpRequest<any>> = [];
  hasToken = false;
  token: String;

  constructor(private router: Router,
    private alertService: NlfAlertService,
    private injector: Injector, // Because https://github.com/angular/angular/issues/18224
    private http: HttpClient,
    private authDataSubject: NlfAuthSubjectService) {

    this.authDataSubject.observableAuth.subscribe(
      data => {
        if (!!data && data.hasOwnProperty('token') && this.cachedRequests.length > 0) {
          this.retryFailedRequests();
        }
      },
      err => console.log('Auth interceptor error getting login logout')
    );
    this.authDataSubject.observableAuthData.subscribe(
      data => {
        if (!!data) {
          this.token = data.token;
        }
      },
      err => console.log('Problem getting token: ', err)
    );
  }

  public collectFailedRequest(request): void {
    console.log('cached Request', request);
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
    // https://stackoverflow.com/questions/45202208/angular-4-interceptor-retry-requests-after-token-refresh?noredirect=1&lq=1

    this.cachedRequests.forEach(request => {
      console.log('Retrying: ', request);
      // request.method === "POST" || PUT PATCH DELETE
      this.http.request(request).subscribe((response) => { });
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!!this.token) { // should verify valid?
      request = request.clone({
        setHeaders: {
          Authorization: 'Basic ' + this.token,
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache'
        }
      });
    }

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {

          // Response
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
            // return next.handle(request);
          }
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {

            if (err.status === 401) {
              const auth = this.injector.get(NlfAuthService); // Because https://github.com/angular/angular/issues/18224
              this.collectFailedRequest(request);
              console.log('401');
              console.log(this.cachedRequests);
              // this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url }});
              auth.logout();

            } else {
              // this.alertService.warning(err.message);
            }
          }
        }
      )
    );
  }
}
