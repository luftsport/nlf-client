import { ApiCacheService } from './../../api/api-cache.service';
import { Injectable } from '@angular/core';
import { ApiUserAuthService } from '../../api/api-user-auth.service';
import { NlfAlertService } from '../alert/alert.service';
import { NlfLocalStorageService } from '../storage/local-storage.service';

// Import ng2-idle
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NlfAuthService {

  private isAuth: boolean = false;
  private loading: boolean = false;

  private message: string;

  //n g2-idle
  idleState: string;
  timedOut: boolean = false;
  lastPing?: Date = null;
  idleTimeout = 29 * 60; //seconds
  logoutTimeout = 60; // Seconds before logging out after idleTimeout times out

  public isAuthSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private apiCache: ApiCacheService,
    private userAuthService: ApiUserAuthService,
    private alertService: NlfAlertService,
    private route: ActivatedRoute,
    private router: Router,
    private idle: Idle,
    private keepalive: Keepalive,
    private storage: NlfLocalStorageService) {

    // this.isAuthSubject.next(false);
  }

  public hasToken(): boolean {

    return this.storage.hasToken();

  }

  public isAuthenticated(): Observable<boolean> {
    return this.isAuthSubject.asObservable();
  }

  public login(username: string, password: string, returnUrl?: string): void {

    if (!returnUrl) {
      returnUrl = 'home';
    }


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

          this.storage.saveUser(username, data.token64, data.valid['$date']);
          // broadcast
          this.isAuthSubject.next(true);
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
          // this.alertService.success("You logged in, yay!"); //This works after navigate
          /**
          if(returnUrl) {
            this.router.navigate([returnUrl]);
          }
          else {
            this.router.navigate(['/home']);
          }
          **/
          return true;
        } else {

          this.alertService.warning(data.message);
          this.message = data.message;
          this.isAuthSubject.next(false);
          this.idleStop();
          return false;
        }
      },
      error => {
        console.log(error);
        // This is a HttpErrorResponse should send the whole to alertService and do stuff there
        this.alertService.error(error.message);
        this.loading = false;
        this.isAuthSubject.next(false);
        this.idleStop();
        
        // Do not work since no check for public pages
        // this.router.navigate(['/error/', error.status]);
        return false;
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
    this.isAuthSubject.next(false);

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
