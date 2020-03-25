import { Component, OnInit, Inject } from '@angular/core';
import { NlfAuthSubjectService } from 'app/services/auth/auth-subject.service';
import { NlfAuthService } from 'app/services/auth/auth.service';
import { ApiUserDataSubjectItem, NlfConfigItem } from 'app/api/api.interface';
import { NlfUserSubjectService } from 'app/user/user-subject.service';
import { NlfOrsCreateModalComponent } from 'app/ors/ors-create-modal/ors-create-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationStart } from '@angular/router';
import { environment } from 'environments/environment';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { NlfConfigService } from 'app/nlf-config.service';
import { forkJoin } from 'rxjs';

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
  user_data: ApiUserDataSubjectItem;
  public config: NlfConfigItem;
  current_ors: { id: number, type: string };

  constructor(
    public authSubject: NlfAuthSubjectService,
    public authService: NlfAuthService,
    private modalService: NgbModal,
    private router: Router,
    private orsSubject: NlfOrsEditorService,
    private userSubject: NlfUserSubjectService,
    private configSubject: NlfConfigService
  ) {

    this.loggedInObservable = this.authSubject.observableAuth;


    forkJoin([
      this.configSubject.observableConfig.subscribe(
        config => {
          this.config = config;
          console.log('[CONFIG]', config);
        }
      ),
      this.userSubject.observable.subscribe(
        data => {
          console.log('NAVBAR SETTING', data);
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
