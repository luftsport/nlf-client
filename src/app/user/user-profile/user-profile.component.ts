import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute, RouterLink } from '@angular/router';
import { ApiUserService } from 'app/api/api-user.service';
import { ApiUserDataSubjectItem, NlfConfigItem } from 'app/api/api.interface';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GeoLocationService } from 'app/services/geo/geo-location.service';
import { NlfUserSubjectService } from 'app/user/user-subject.service';
import { NlfUserAvatarSubjectService } from 'app/user/user-avatar-subject.service';
import { NlfConfigService } from 'app/nlf-config.service';
import { includes } from 'lodash';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { avatar_tmp_image } from 'app/interfaces/functions';
import { NlfUserFirstLoginComponent } from 'app/user/user-first-login/user-first-login.component';
import { forkJoin } from 'rxjs';
import { faCog, faTimes, faCheck, faPencil } from '@fortawesome/free-solid-svg-icons';
import { faUser, faUserCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'nlf-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class NlfUserProfileComponent implements OnInit {
  person_id: number;
  public user: ApiUserDataSubjectItem;
  public config: NlfConfigItem;

  dataReady = false;
  avatarReady = false;
  myself = false;
  geo: number[];

  imageError: string;
  isImageSaved: boolean;
  cardImageBase64: string;

  uploadedImage: File;
  imagePreview: string;
  modalRef;
  modalClubRef;


  // ngx-image-cropper
  imageChangedEvent: any = '';
  avatar: string;
  modal_avatar: string;
  public avatar_missing = avatar_tmp_image;
  public default_discipline: number;

  faCog = faCog;
  faTimes = faTimes;
  faCheck = faCheck;
  faUser = faUser;
  faUserCircle = faUserCircle;
  faPencil = faPencil;

  constructor(
    private userSubject: NlfUserSubjectService,
    private configSubject: NlfConfigService,
    private userAvatarSubject: NlfUserAvatarSubjectService,
    private route: ActivatedRoute,
    private userService: ApiUserService,
    public domSanitizer: DomSanitizer,
    private alertService: NlfAlertService,
    private geoLocationService: GeoLocationService,
    private modalService: NgbModal,
    private router: Router) {

    forkJoin([
      this.configSubject.observableConfig.subscribe(
        config => {
          this.config = config;
        }
      ),
      this.userSubject.observable.subscribe(
        data => {
          if (!!data) {
            this.user = data;
            this.person_id = data.person_id;

            this.userAvatarSubject.observable.subscribe(
              data => {
                if (!!data) {
                  this.avatar = data;

                }
                this.dataReady = true
              },
              err => console.log('Error getting user avatar: ', err)
            );

          }
        },
        err => console.log('Error getting user data: ', err)
      )

    ]);





    this.geoLocationService.getLocation({ enableHighAccuracy: true }).subscribe(
      position => {
        console.log(position);
        this.geo = position;
      },
      err => {
        console.log(err);
      }
    );

    this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        if (!!this.modalService.hasOpenModals()) {
          this.modalService.dismissAll();
        }
      });
  }

  ngOnInit() {

    /**
    this.route.params.subscribe(
      params => {
        if (!!params['person_id']) {
          this.getData(params['person_id']);
        } else {
          this.getData(this.person_id);
        }

      },
      err => console.log('Error getting user')
    );
    **/

  }

  public openDefaultClub() {
    this.modalClubRef = this.modalService.open(NlfUserFirstLoginComponent, { backdrop: 'static', keyboard: false });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.modal_avatar = event.base64;
  }
  imageLoaded() {

    // show cropper
  }
  cropperReady() {
    // cropper ready
    this.avatarReady = true;
  }

  loadImageFailed() {
    // show message
  }

  removeImage() {
    this.avatar = undefined;
    this.modal_avatar = null;
    this.userAvatarSubject.update(this.avatar);
  }

  public openModal(template) {
    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }

  public cancelModal() {
    this.modalRef.close();
    this.avatarReady = false;
    this.modal_avatar = null;
  }

  public closeModal() {
    this.modalRef.close();
    this.avatarReady = false;
    this.avatar = this.modal_avatar;
    this.userAvatarSubject.update(this.avatar);
    this.modal_avatar = null;
  }


}
