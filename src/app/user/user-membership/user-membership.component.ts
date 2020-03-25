import { Component, OnInit } from '@angular/core';
import { ApiNlfUserService } from 'app/api/api-nlf-user.service';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { NlfUserSubjectService } from 'app/user/user-subject.service';

@Component({
  selector: 'nlf-user-membership',
  templateUrl: './user-membership.component.html',
  styleUrls: ['./user-membership.component.css'],
})
export class NlfUserMembershipComponent implements OnInit {

  id: number;
  // Always initialize object
  user: any; // = {}; // ApiNlfUserItem = {id: this.id, membership: {}, licenses: {}, location: {}};
  hasLicenses = false;
  render = false;

  constructor(
    private userSubject: NlfUserSubjectService,
    private membership: ApiNlfUserService,
    private alertService: NlfAlertService) {

    this.userSubject.observable.subscribe(
      data => {
        if (!!data) {
          this.getuser(data.person_id);
        }
      },
      err => console.log('Error getting user data: ', err)

    );

  }

  public getuser(person_id: number) {

    this.membership.getUser(person_id).subscribe(
      data => {
        this.user = data;
        // Only render on data
        this.render = true;
        if (!!data.licenses && !!data.licenses.rights && data.licenses.rights.length > 0) {
          this.hasLicenses = true;
        }
      },
      err => {
        console.error(err);
        this.alertService.error('Kunne ikke finne medlemsskapsdata på deg');
      },
      // () => console.log("Done")
    );

  }

  ngOnInit() {
  }

  get diagnostic() { return JSON.stringify(this.user); }

}
