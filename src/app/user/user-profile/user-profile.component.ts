import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiUserService } from 'app/api/api-user.service';
import { ApiUserItem } from 'app/api/api.interface';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GeoLocationService } from 'app/services/geo/geo-location.service';
import { NlfUserSubjectService } from 'app/user/user-subject.service';

@Component({
  selector: 'nlf-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class NlfUserProfileComponent implements OnInit {
  person_id: number;
  user: ApiUserItem;
  avatar = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  dataReady = false;
  myself = false;
  geo: Coordinates;

  constructor(
    private userSubject: NlfUserSubjectService,
    private route: ActivatedRoute,
    private userService: ApiUserService,
    public domSanitizer: DomSanitizer,
    private alertService: NlfAlertService,
    private geoLocationService: GeoLocationService) {

    this.userSubject.observable.subscribe(
      data => {
        if (!!data) {
          this.person_id = data.person_id;
        }
      },
      err => console.log('Error getting user data: ', err));
  }

  ngOnInit() {
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

    this.geoLocationService.getLocation({ enableHighAccuracy: true }).subscribe(
      position => {
        console.log(position);
        this.geo = position;
      },
      err => {
        console.log(err);
      }
    );
  }

  public getData(id) {
    this.dataReady = false;
    this.userService.getUser(id).subscribe(
      data => {
        this.user = data;
        if (!!data.avatar && !!data.avatar.file) {
          this.avatar = 'data:' + data.avatar.content_type + ';base64,' + data.avatar.file;
        }

        this.person_id === id ? this.myself = true : this.myself = false;

      },
      err => {
        this.alertService.error(err.message);
      },
      () => this.dataReady = true
    );
  }
}
