import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiUserService } from '../../api/api-user.service';
import { ApiUserItem } from '../../api/api.interface';
import { NlfAlertService } from '../../services/alert/alert.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NlfLocalStorageService } from '../../services/storage/local-storage.service';
import { GeoLocationService } from '../../services/geo/geo-location.service';

@Component({
  selector: 'nlf-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class NlfUserProfileComponent implements OnInit {
  userid: number;
  user: ApiUserItem;
  avatar = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  dataReady = false;
  myself = false;
  geo: Coordinates;

  constructor(private route: ActivatedRoute,
    private userService: ApiUserService,
    public domSanitizer: DomSanitizer,
    private alertService: NlfAlertService,
    private localStorage: NlfLocalStorageService,
    private geoLocationService: GeoLocationService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (!!params['userid']) {
          this.userid = params['userid'];
        } else {
          this.userid = this.localStorage.getId();
        }
        this.getData();
      },
      err => {
        this.userid = this.localStorage.getId();
        this.getData();
      },

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

  public getData() {
    this.dataReady = false;
    this.userService.getUser(this.userid).subscribe(
      data => {
        this.user = data;
        if (!!data.avatar && !!data.avatar.file) {
          this.avatar = 'data:' + data.avatar.content_type + ';base64,' + data.avatar.file;
        }

        if (this.user.id === this.localStorage.getId()) {
          this.myself = true;
        }

      },
      err => {
        this.alertService.error(err.message);
      },
      () => this.dataReady = true
    );
  }
}
