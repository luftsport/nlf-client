import { ApiCacheService } from 'app/api/api-cache.service';
import { Injectable, OnInit, Inject } from '@angular/core';
import { ApiUserAuthService } from 'app/api/api-user-auth.service';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { NlfAuthSubjectService } from './auth-subject.service';
// Import ng2-idle
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { NlfConfigService } from 'app/nlf-config.service';
import { Router } from '@angular/router'; // ActivatedRoute
import { NlfUserSubjectService } from 'app/user/user-subject.service';
import { ApiUserDataSubjectItem, AuthDataSubjectInterface, NlfConfigItem } from 'app/api/api.interface';
import { environment } from 'environments/environment';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable()
export class NlfAuthService {

  private isAuth = false;
  private authData: AuthDataSubjectInterface;
  private message: string;

  ENV = environment;
  // ng2-idle
  idleState: string;
  timedOut = false;
  lastPing?: Date = null;
  idleTimeout = 60 * 30; // seconds
  logoutTimeout = 60 * 3; // Seconds before logging out after idleTimeout times out
  loading = false;

  id_token: string;

  firstLogin = false;
  userData: ApiUserDataSubjectItem;
  public config: NlfConfigItem;

  constructor(
    private apiCache: ApiCacheService,
    private userAuthService: ApiUserAuthService,
    private alertService: NlfAlertService,
    //private route: ActivatedRoute,
    private router: Router,
    private idle: Idle,
    private keepalive: Keepalive,
    private authSubject: NlfAuthSubjectService,
    private userSubject: NlfUserSubjectService,
    private configSubject: NlfConfigService,
    private deviceService: DeviceDetectorService) {



    this.authSubject.observableAuth.subscribe(
      auth => this.isAuth = auth,
      err => this.isAuth = false
    );

    this.authSubject.observableAuthData.subscribe(
      data => {
        console.log('AUTH DATA', data);
        this.authData = data;
        try {
          this.id_token = data.id_token;
        } catch (e) {
          this.id_token = null;
        }
        
      },
      err => this.authData = null
    );

    this.userSubject.observable.subscribe(
      userData => this.userData = userData,
      err => this.userData = null
    );
  }


  public login(username: string, password: string, id_token?: string, returnUrl?: string): void {
    this.alertService.clear();
    this.loading = true;
    /**
    this.isAuthSubject.next(true);

    if(returnUrl) {
      this.router.navigate([returnUrl]);
    }
    else {
      this.router.navigate(['/home']);
    }
    **/

    this.userAuthService.authenticate(username, password, id_token).subscribe(
      data => {
        console.log('Auth', data);
        if (!!data.success && data.success === true) {


          localStorage.setItem('auth-id', data.username);
          localStorage.setItem('auth-token', data.token64);
          localStorage.setItem('auth-valid', data.valid['$date']);

          this.id_token = data.id_token;
          localStorage.setItem('auth-id-token', data.id_token);

          data.settings['device_info'] = this.deviceService.getDeviceInfo()

          this.userData = {
            acl: data.acl,
            activities: data.activities,
            person_id: +data.username,
            _id: data._id,
            _etag: data._etag,
            settings: data.settings
          };
          localStorage.setItem('user-data', JSON.stringify(this.userData));
          // BROADCAST SUBJECTS
          if (!data.settings.hasOwnProperty('default_discipline') && !data.settings.hasOwnProperty('default_activity')) {
            this.firstLogin = true;
          }

          this.authSubject.update(true);

          this.authSubject.updateAuthData({
            person_id: +data.username,
            token: data.token64,
            id_token: data.id_token,
            valid: new Date(data.valid['$date'])
          });
          

          this.userSubject.update(this.userData);

          // Update global settings
          this.configSubject.init();

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
            this.alertService.success(this.idleState, false, true, 5);
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
          this.alertService.success('You succesfully logged in!', false, true, 5); //This works after navigate

          if (!!returnUrl) {
            console.log('Will redirect!', returnUrl);
            this.router.navigate([returnUrl]);
          }
          /**else {
            this.router.navigate(['/home']);
          } */

          this.loading = false;

        } else {

          this.alertService.error(data.message);
          this.message = data.message;
          this.authSubject.update(false);
          this.authSubject.updateAuthData(null);
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

      },
      () => {

      }
    );

  }

  public logout(force?: boolean, returnUrl?: string) {

    // if(!returnUrl) { returnUrl = 'home';}

    // Keep copy before nuking
    const id_token = this.id_token;
    
    // Remove stored on user, let this handle everything
    let initial_auth = this.isAuth;
    // Cleanup api cache
    this.apiCache.clear();

    this.idleStop();
    this.authSubject.update(false);
    this.authSubject.updateAuthData(undefined);
    localStorage.clear();

    if (!force) {
      this.alertService.success('Du har blitt logget ut', true);
    } else {
      this.alertService.warning('Du har blitt automatisk logget ut', true);
    }
    /**
    if(force) {
      this.router.navigate([returnUrl]);
    }
    else {
      this.router.navigate(['/home']);
    }
    **/

    // Only when actually logged out
    if (initial_auth && !this.isAuth) {
      let gg = this.ENV._logout_service + '?client_id=' + this.ENV._client_id + '&id_token_hint=' + id_token + '&redirect_uri=' + window.location.href;
      console.log('LOGOUT URL:', gg);
      (window as any).open(gg, '_self');
    }
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
