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
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { NlfConfigService } from 'app/nlf-config.service';
import { forkJoin } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { avatar_tmp_image } from 'app/interfaces/functions';

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
  current_ors: { id: number, type: string };
  public avatar: string;
  public avatar_missing =  avatar_tmp_image;
  public dataReady = false;

  constructor(
    public authSubject: NlfAuthSubjectService,
    public authService: NlfAuthService,
    private modalService: NgbModal,
    private router: Router,
    private orsSubject: NlfOrsEditorService,
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
      )
    ]);


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

  ngOnInit() {

    this.orsSubject.observableObservation.subscribe(
      data => {
        if (!!data.id && !!data._model.type) {
          this.current_ors = { id: data.id, type: data._model.type };
        }
      },
      err => console.log(err),
      () => console.log('Done subject update')

    );

  }

}
