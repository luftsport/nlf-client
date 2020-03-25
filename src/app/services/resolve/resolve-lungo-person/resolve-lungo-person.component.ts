import { Component, OnInit, Input } from '@angular/core';
import { ApiOptionsInterface } from 'app/api/api.interface';
import { ApiCacheService } from 'app/api/api-cache.service';
import { LungoPersonsService } from 'app/api/lungo-persons.service';
import { ApiUserService } from 'app/api/api-user.service';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'nlf-resolve-lungo-person',
  templateUrl: './resolve-lungo-person.component.html',
  styleUrls: ['./resolve-lungo-person.component.css']
})
export class NlfResolveLungoPersonComponent implements OnInit {

  @Input() person_id: number;
  @Input() tmp_name?: string;
  @Input() link?: boolean;
  @Input() avatar?: boolean;
  @Input() only_first_name: boolean = false;

  dataReady = false;

  full_name = '';

  avatar_tmp_image = 'data:image/png;base64,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';
  
  avatar_img: string;

  constructor(private lungoUserService: LungoPersonsService,
    private userService: ApiUserService,
    private apiCache: ApiCacheService) { }

  ngOnInit() {
    if (!this.avatar) { this.avatar = false; }
    if (!this.link) { this.link = false; }
    // if (!this.tmp_name ) { this.tmp_name = ''; }

    if (this.person_id < 0 && !this.tmp_name) {

      this.full_name = 'Person ' + (-1 * this.person_id);
      this.dataReady = true;

    } else if (!!this.tmp_name && this.person_id <= 0) {

      this.avatar = false;
      this.link = false;
      this.full_name = this.tmp_name;
      this.dataReady = true;

    } else if (typeof this.person_id === 'undefined') {

      this.full_name = 'Ingen person';
      this.dataReady = true;

    } else {

      /**
       * We do need to check if the user exists locally too
       * - Resolve name from nlf-users
       * - Verify if user exists in users for linkage
       */


      const options: ApiOptionsInterface = {
        query: { projection: { full_name: 1, first_name: 1 } }
      };

      const lungoPerson = this.apiCache.get(['get-lungo-person', this.person_id, options.query],
        this.lungoUserService.getUser(this.person_id, options));

      if (!this.link && !this.avatar) { // Only check in nlf-lungo-users

        lungoPerson.subscribe(
          data => {
            if (this.only_first_name) {
              this.full_name = data.first_name
            } else {
              this.full_name = data.full_name
            }
          },
          err => this.full_name = 'Ukjent person',
          () => this.dataReady = true
        );
      } else { // check in both and decide if link or not

        const optionsuser: ApiOptionsInterface = {
          query: { projection: { id: 1, avatar: this.avatar ? 1 : -1 } }
        };
        
        const users = this.apiCache.get(['get-users', this.person_id, optionsuser.query],
          this.userService.getUser(this.person_id, optionsuser));

        forkJoin(
          users.pipe(catchError(userError => of(userError))),
          lungoPerson.pipe(catchError(lungoPersonError => of(lungoPersonError))))
          .subscribe(

            data => {
              //this.link = false;
              //if (!!data[0] && typeof data[0].error === 'undefined') {
              //  this.link = true;
              //}

              if (data[0] && typeof data[1].error === 'undefined') {
                
                if (this.only_first_name) {
              this.full_name = data[1].first_name;
            } else {
              this.full_name = data[1].full_name;
            }
                
                if(data[0].hasOwnProperty('avatar')) {
                
                    this.avatar_img = 'data:'+data[0].avatar.content_type +';base64,'+data[0].avatar.file;
            
                    //this.avatar_img = data[0].avatar;
                }
              } else if (!!data[1].status && data[1].status === 404) {
                this.full_name = 'Ukjent person';
                this.link = false;
              }
              this.dataReady = true;
            },
            err => console.log(err),
            () => {}
          );
      }
    }

  }

}
