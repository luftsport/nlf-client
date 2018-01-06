import { Component, OnInit, Input } from '@angular/core';
import { AclRolesService } from '../../api/acl-roles.service';
import { OptionsInterface } from '../../api/options.interface';

@Component({
  selector: 'app-resolve-role',
  //templateUrl: './resolve-role.component.html',
  template: '{{ roleName }}',
  styleUrls: ['./resolve-role.component.css']
})
export class ResolveRoleComponent implements OnInit {

  @Input() roleid: string;

  roleName: string = '';

  constructor(private aclRolesService: AclRolesService) { }

  ngOnInit() {

    let options: OptionsInterface = {
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
