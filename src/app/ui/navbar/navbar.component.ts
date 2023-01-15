import { Component, OnInit, Inject } from '@angular/core';
import { NlfAuthSubjectService } from 'app/services/auth/auth-subject.service';
import { NlfAuthService } from 'app/services/auth/auth.service';
import { ApiUserDataSubjectItem, NlfConfigItem } from 'app/api/api.interface';
import { NlfUserSubjectService } from 'app/user/user-subject.service';
import { NlfUserAvatarSubjectService } from 'app/user/user-avatar-subject.service';
import { NlfOrsCreateModalComponent } from 'app/ors/ors-create-modal/ors-create-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationStart } from '@angular/router';
import { environment } from 'environments/environment';
import { NlfConfigService } from 'app/nlf-config.service';
import { forkJoin } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { avatar_tmp_image, hashString } from 'app/interfaces/functions';
// import { Observable } from "rxjs";


@Component({
  selector: 'nlf-ui-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NlfUiNavbarComponent implements OnInit {

  loggedInObservable;
  navbarOpen = false;
  isCollapsed = true;
  modalRef;
  ENV = environment;
  public user_data: ApiUserDataSubjectItem;
  public config: NlfConfigItem;
  public avatar: string;
  public avatar_missing = avatar_tmp_image;
  public dataReady = false;

  constructor(
    public authSubject: NlfAuthSubjectService,
    public authService: NlfAuthService,
    private modalService: NgbModal,
    private router: Router,
    private userSubject: NlfUserSubjectService,
    private userAvatarSubject: NlfUserAvatarSubjectService,
    private configSubject: NlfConfigService,
    public domSanitizer: DomSanitizer
  ) {

    this.loggedInObservable = this.authSubject.observableAuth;

    this.userAvatarSubject.observable.subscribe(
      data => {
        this.avatar = data;
      }
    );

    forkJoin([
      this.configSubject.observableConfig.subscribe(
        config => {
          this.config = config;
        }
      ),
      this.userSubject.observable.subscribe(
        data => {
          if (!!data && Object.keys(data).length > 0) {
            this.user_data = data;
          }
        }
      ),
      this.dataReady = true
    ]
    );


    router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        if (!!this.modalService.hasOpenModals()) {
          this.modalService.dismissAll();
        }
      });
  }

  public openCreateOrsModal() {
    this.modalRef = this.modalService.open(NlfOrsCreateModalComponent, { size: 'lg' });
  }

  public userHash(person_id) {
    return hashString(String(person_id));
  }

  public getUserObsreg() {
    try {
      return this.config.inv_mapping[this.user_data.settings.default_activity];
    } catch { }

    return "ors"; // @TODO "obsreg"
  }

  ngOnInit() {

  }

}
