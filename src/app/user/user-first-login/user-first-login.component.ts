import { Component, Inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NlfUserSubjectService } from 'app/user/user-subject.service';
import { NlfConfigService } from 'app/nlf-config.service';
import { LungoOrganizationsService } from 'app/api/lungo-organizations.service';
import { NlfConfigItem } from 'app/api/api.interface';

@Component({
  selector: 'nlf-user-first-login',
  templateUrl: './user-first-login.component.html',
  styleUrls: ['./user-first-login.component.css']
})
export class NlfUserFirstLoginComponent implements OnInit {

  org;
  success;
  error;
  userData;
  public config: NlfConfigItem;

  constructor(
    public activeModal: NgbActiveModal,
    private userSubject: NlfUserSubjectService,
    private configService: NlfConfigService,
    private orgService: LungoOrganizationsService) {

    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
        this.userSubject.observable.subscribe(
          data => {
            if (!!data) {
              this.userData = data;
              if (!!data.acl) {
                this.org = [];
                data.acl.forEach(role => {

                  if (+role.type == 14 && role.activity > 0 && +role.org > 0 && role.role === this.config['nif_roles']['klubbmedlem']) {
                    this.org.push(role);
                  }
                });

              }
            }
          }
        );
      }
    );

  }

  ngOnInit() {

  }

  private getClubFromDiscipline(discipline: number) {


  }
  public setDefaultClub(role) {

    this.orgService.getOrganization(role.org).subscribe(
      data => {
        if (data.hasOwnProperty('parent_id')) {
          this.userData.settings.default_club = data['parent_id'];
        }
      },
      err => console.log('Err assigning default values'),
      () => {
        this.userData.settings.default_discipline = role.org;
        this.userData.settings.default_activity = role.activity;
        if (!this.userData.settings.ors.hasOwnProperty('first_report')) {
          this.userData.settings.ors = { first_report: undefined };
        }
        this.userSubject.update(this.userData);
        this.success = true;
      }

    )


  }

}
