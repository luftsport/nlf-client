import { Component, OnInit } from '@angular/core';
import { ApiNlfUserService } from '../../api/api-nlf-user.service';
import { NlfLocalStorageService } from '../../services/storage/local-storage.service';
import { NlfAlertService } from '../../services/alert/alert.service';


@Component({
  selector: 'nlf-user-membership',
  templateUrl: './user-membership.component.html',
  styleUrls: ['./user-membership.component.css'],
})
export class NlfUserMembershipComponent implements OnInit {

  id: number;
  // Always initialize object
  user = {}; // MelwinUserItem = {id: this.id, membership: {}, licenses: {}, location: {}};
  hasLicenses = false;

  constructor(private storage: NlfLocalStorageService,
              private membership: ApiNlfUserService,
              private alertService: NlfAlertService) {

    this.id = storage.getId();
    this.getuser();
  }

  public getuser() {

    this.membership.getUser(this.id).subscribe(
      data => {
        this.user = data;

        if (!!data.licenses && !!data.licenses.rights && data.licenses.rights.length > 0 ) {
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
