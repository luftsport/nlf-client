import { ApiCacheService } from 'app/api/api-cache.service';
import { Component, OnInit, Input } from '@angular/core';
import { ApiNlfUserService } from 'app/api/api-nlf-user.service';
import { ApiOptionsInterface } from 'app/api/api.interface';
import { ApiUserService } from 'app/api/api-user.service';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { faQuestion, faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-resolve-user',
  templateUrl: './resolve-user.component.html',
  styleUrls: ['./resolve-user.component.css']
})
export class NlfResolveUserComponent implements OnInit {

  faQuestion = faQuestion;
  faSpinner = faSpinner;

  @Input() userid: number;
  @Input() tmp_name?: string;
  @Input() link?: boolean;
  @Input() avatar?: boolean;

  dataReady = false;

  fullname = '';

  constructor(
    private melwinUserService: ApiNlfUserService,
    private userService: ApiUserService,
    private apiCache: ApiCacheService) { }

  ngOnInit() {
    if (!this.avatar) { this.avatar = false; }
    if (!this.link) { this.link = false; }
    // if (!this.tmp_name ) { this.tmp_name = ''; }

    if (this.userid < 0 && !this.tmp_name) {

      this.fullname = 'Person ' + (-1 * this.userid);
      this.dataReady = true;

    } else if (!!this.tmp_name && this.userid <= 0) {

      this.avatar = false;
      this.link = false;
      this.fullname = this.tmp_name;
      this.dataReady = true;

    } else if (typeof this.userid === 'undefined') {

      this.fullname = 'Ingen personer';
      this.dataReady = true;

    } else {

      /**
       * We do need to check if the user exists locally too
       * - Resolve name from nlf-users
       * - Verify if user exists in users for linkage
       */


      const options: ApiOptionsInterface = {
        query: { projection: { fullname: 1 } }
      };

      const nlfUsers = this.apiCache.get(['resolve-user', this.userid, options.query], this.melwinUserService.getUser(this.userid, options));

      if (!this.link) { // Only check in nlf-users

        nlfUsers.subscribe(
          data => this.fullname = data.fullname,
          err => this.fullname = 'Ukjent person',
          () => this.dataReady = true
        );
      } else { // check in both and decide if link or not

        const optionsuser: ApiOptionsInterface = {
          query: { projection: { id: 1 } }
        };

        const users = this.apiCache.get(['get-user', this.userid, optionsuser.query], this.userService.getUser(this.userid, optionsuser));

        forkJoin(
          users.pipe(catchError(userError => of(userError))),
          nlfUsers.pipe(catchError(nlfUserError => of(nlfUserError))))
          .subscribe(

          data => {
            this.link = false;
            if (!!data[0] && typeof data[0].error === 'undefined') {
              this.link = true;
            }

            if (data[0] && typeof data[1].error === 'undefined') {
              this.fullname = data[1].fullname;
            } else if (!!data[1].status && data[1].status === 404) {
              this.fullname = 'Ukjent person';
              this.link = false;
            }
          },
          err => console.log(err),
          () => this.dataReady = true
          );
      }
    }

  }

}
