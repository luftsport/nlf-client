import { Component, OnInit, Input } from '@angular/core';
import { ApiAclRolesService } from '../../../api/api-acl-roles.service';
import { ApiOptionsInterface } from '../../../api/api.interface';

@Component({
  selector: 'nlf-resolve-role',
  //templateUrl: './resolve-role.component.html',
  template: '{{ roleName }}',
  styleUrls: ['./resolve-role.component.css']
})
export class NlfResolveRoleComponent implements OnInit {

  @Input() roleid: string;

  roleName: string;

  constructor(private aclRolesService: ApiAclRolesService) { }

  ngOnInit() {

    let options: ApiOptionsInterface = {
        query: { projection: {name: 1}}
      };

    this.aclRolesService.getRole(this.roleid, options).subscribe(
      data => {
        console.log(data);
        this.roleName = data.name;
      },
      err => this.roleName = 'Rolle (' + this.roleid + ')',
      () => console.log('Done')
    );
  }

}
