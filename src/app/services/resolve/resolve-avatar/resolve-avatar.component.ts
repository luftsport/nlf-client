import { Component, OnInit, Input } from '@angular/core';
import { ApiCacheService } from 'app/api/api-cache.service';
import { ApiUserService } from 'app/api/api-user.service';
import { ApiOptionsInterface } from 'app/api/api.interface'
import { avatar_tmp_image } from 'app/interfaces/functions';
@Component({
  selector: 'nlf-resolve-avatar',
  templateUrl: './resolve-avatar.component.html',
  styleUrls: ['./resolve-avatar.component.css']
})
export class NlfResolveAvatarComponent implements OnInit {

  @Input() person_id: number;
  @Input() title: boolean = false;

  user;
  error = false;
  dataReady = false;
  avatar_tmp_image: string;
  avatar_tmp_color: string;
  // avatar_tmp_name: string;

  constructor(
    private userService: ApiUserService,
    private apiCache: ApiCacheService
  ) {

    this.avatar_tmp_image = avatar_tmp_image;
  }

  ngOnInit() {

    if (!!this.person_id && this.person_id > 0) {
      let options: ApiOptionsInterface = {
        query: {
          projection: { avatar: 1, id: 1 }
        }
      };

      this.apiCache.get([this.person_id, options], this.userService.getUser(this.person_id, options))
        .subscribe(
          data => {
            this.user = data;
            //if (!!this.user.avatar) {
            //  this.user.avatar = this.user.avatar; //'data:'+this.user.avatar.content_type +';base64,'+this.user.avatar.file;
            //  }
            this.dataReady = true;

          },
          err => {
            this.error = true;

          },
          () => { }
        );
    } else {
      this.error = true;
    }
  }



}
