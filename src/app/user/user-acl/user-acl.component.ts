
import { Component, OnInit, Input } from '@angular/core';
import { ApiAclRolesService } from 'app/api/api-acl-roles.service';
import { ApiAclGroupsService } from 'app/api/api-acl-groups.service';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { ApiOptionsInterface } from 'app/api/api.interface';

@Component({
  selector: 'nlf-user-acl',
  templateUrl: './user-acl.component.html',
  styleUrls: ['./user-acl.component.css']
})
export class NlfUserAclComponent implements OnInit {

  @Input() groups: string[];
  @Input() roles: string[];
  @Input() clubs: string[];

  public acl = {};
  public keys: any;

  constructor(
    private alertService: NlfAlertService,
    private groupsService: ApiAclGroupsService,
    private rolesService: ApiAclRolesService) {
  }

  ngOnInit() {

    // add groups to acl
    if (!!this.groups) {
      for (let g of this.groups) {
        this.acl[g] = [];
      }
    }
    // add club groups to acl
    if (!!this.clubs) {
      for (let c of this.clubs) {

        let options: ApiOptionsInterface = {
          query: { where: { ref: c } }
        };
        this.groupsService.getGroups(options).subscribe(
          data => {
            if (data._items.length > 0) {
              this.acl[data._items[0]['_id']] = [];
            }
          },
          err => console.log(err)
        );
      }
    }

    // Add each role to groups
    if (!!this.roles) {

      for (let r of this.roles) {

        this.rolesService.getRole(r).subscribe(
          data => {
            if (!!data.group) {
              if (!this.acl[data.group]) {
                this.acl[data.group] = [r];
              }
              else {
                this.acl[data.group].push(r);
              }
            }
          },
          err => console.log(err)
        );

      }

    }

    this.keys = Object.keys(this.acl);

  }

  public getKeys() {
    return Object.keys(this.acl);
  }

  get diagnostic() { return JSON.stringify(this.acl); }
}
