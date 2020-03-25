import { ApiCacheService } from 'app/api/api-cache.service';
import { Component, OnInit, Input } from '@angular/core';
import { ApiAclRolesService } from 'app/api/api-acl-roles.service';
import { ApiOptionsInterface } from 'app/api/api.interface';

@Component({
  selector: 'nlf-resolve-role',
  // templateUrl: './resolve-role.component.html',
  template: '{{ roleName }}',
  styleUrls: ['./resolve-role.component.css']
})
export class NlfResolveRoleComponent implements OnInit {

  @Input() roleid: string;

  roleName: string;

  constructor(private aclRolesService: ApiAclRolesService,
              private apiCache: ApiCacheService) { }

  ngOnInit() {

    const options: ApiOptionsInterface = {
        query: { projection: {name: 1}}
      };

    this.apiCache.get(['resolve-role', this.roleid, options.query], this.aclRolesService.getRole(this.roleid, options)).subscribe(
      data => {
        console.log(data);
        this.roleName = data.name;
      },
      err => this.roleName = 'Rolle (' + this.roleid + ')',
      () => console.log('Done')
    );
  }

}
