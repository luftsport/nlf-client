import { ApiCacheService } from 'app/api/api-cache.service';
import { Injectable, OnInit } from '@angular/core';
import { ApiUserAuthService } from 'app/api/api-user-auth.service';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { NlfLocalStorageService } from 'app/services/storage/local-storage.service';
import { NlfAuthSubjectService } from './auth-subject.service';
// Import ng2-idle
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NlfAuthService {

  private isAuth = false;
  private message: string;


  // ng2-idle
  idleState: string;
  timedOut = false;
  lastPing?: Date = null;
  idleTimeout = 29 * 60; // seconds
  logoutTimeout = 60; // Seconds before logging out after idleTimeout times out
  loading = false;

  constructor(private apiCache: ApiCacheService,
    private userAuthService: ApiUserAuthService,
    private alertService: NlfAlertService,
    private route: ActivatedRoute,
    private router: Router,
    private idle: Idle,
    private keepalive: Keepalive,
    private storage: NlfLocalStorageService,
    private authSubject: NlfAuthSubjectService) {

    this.authSubject.observableAuth.subscribe(
      auth => this.isAuth = auth,
      err => this.isAuth = false
    );
  }

  public hasToken(): boolean {

    return this.storage.hasToken();

  }

  public login(username: string, password: string, returnUrl?: string): void {

    this.alertService.clear();
    this.loading = true;
    console.log('Returnurl', returnUrl);
    /** 
    this.isAuthSubject.next(true);

    if(returnUrl) {
      this.router.navigate([returnUrl]);
    }
    else {
      this.router.navigate(['/home']);
    }
    **/

    this.userAuthService.authenticate(username, password).subscribe(
      data => {
        if (!!data.success && data.success === true) {

          this.storage.saveUser(data.username, data.token64, data.valid['$date']);
          // broadcast
          this.authSubject.update(true);
          // clear alerts since we do not re-route
          this.alertService.clear();

          /**
          If first_login = true
          this.alertService.warning('Din første login, vennligst oppdater profilen');
          this.router.navigate(['user/profile']);
          **/

          /**
          Idle config!
          **/
          // sets an idle timeout of 5 seconds, for testing purposes.
          this.idle.setIdle(this.idleTimeout);
          // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
          this.idle.setTimeout(this.logoutTimeout);
          // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
          this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

          this.idle.onIdleEnd.subscribe(() => {
            this.idleState = 'Du er ikke lengre registrert som inaktiv';
            this.alertService.success(this.idleState);
          });

          this.idle.onTimeout.subscribe(() => {
            this.idleState = 'Din innlogging gikk ut på tid';
            this.timedOut = true;
            this.alertService.error(this.idleState);
            this.logout(true); // force logout!
          });

          this.idle.onIdleStart.subscribe(() => {
            this.idleState = 'Du er registrert som inaktiv';
            this.alertService.info(this.idleState);
          });

          this.idle.onTimeoutWarning.subscribe((countdown) => {
            this.idleState = 'Du vil bli logget ut om ' + countdown + ' sekunder!';
            this.alertService.info(this.idleState);
          });

          // sets the ping interval to 15 seconds
          this.keepalive.interval(15);

          this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

          this.idleReset();
          this.alertService.success('You succesfully logged in!'); //This works after navigate

          if (!!returnUrl) {
            console.log('Will redirect!', returnUrl);
            this.router.navigate([returnUrl]);
          }
          /**else {
            this.router.navigate(['/home']);
          } */


          this.loading = false;
          
          // oauth
          this.router.navigate([], {
            queryParams: {
              access_token: null,
              token_type: null,
              expires_in: null
            },
            queryParamsHandling: 'merge'
          });
        } else {

          this.alertService.error(data.message);
          this.message = data.message;
          this.authSubject.update(false);
          this.idleStop();
          this.loading = false;
        }
      },
      error => {
        console.log(error);
        // This is a HttpErrorResponse should send the whole to alertService and do stuff there
        this.alertService.danger(error.message);
        this.loading = false;
        this.authSubject.update(false);
        this.idleStop();

        // Do not work since no check for public pages
        // this.router.navigate(['/error/', error.status]);
        this.loading = false;
      });

  }

  public logout(force?: boolean, returnUrl?: string) {

    // if(!returnUrl) { returnUrl = 'home';}

    if (this.hasToken() && !force) {
      this.alertService.success('Du har blitt logget ut', true);

    } else if (this.hasToken() && force) {

      this.alertService.warning('Du har blitt automatisk logget ut', true);
    }

    // Remove stored on user, let this handle everything
    this.storage.clearStorage();

    // Cleanup api cache
    this.apiCache.clear();

    this.idleStop();
    this.authSubject.update(false);

    /**
    if(force) {
      this.router.navigate([returnUrl]);
    }
    else {
      this.router.navigate(['/home']);
    }
    **/

  }

  public idleStop() {
    if (!!this.idle) {
      this.idle.stop();
    }

  }

  public idleReset() {
    if (!!this.idle) {
      this.idle.watch();
      this.idleState = 'Started.';
      this.timedOut = false;
    }
  }
}
