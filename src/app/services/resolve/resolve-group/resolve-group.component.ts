import { ApiCacheService } from './../../../api/api-cache.service';
import { Component, OnInit, Input } from '@angular/core';
import { ApiAclGroupsService } from '../../../api/api-acl-groups.service';
import { ApiOptionsInterface } from '../../../api/api.interface';

@Component({
  selector: 'nlf-resolve-group',
  //templateUrl: './resolve-group.component.html',
  template: '{{ groupName }}',
  styleUrls: ['./resolve-group.component.css']
})
export class NlfResolveGroupComponent implements OnInit {

  @Input() groupid: string;

  groupName: string;

  constructor(private aclGroupsService: ApiAclGroupsService,
              private apiCache: ApiCacheService) { }

  ngOnInit() {

    let options: ApiOptionsInterface = {
        query: { projection: {name: 1}}
      };

    this.apiCache.get([this.groupid, options], this.aclGroupsService.getGroup(this.groupid, options)).subscribe(
      data => {
        console.log(data);
        this.groupName = data.name;
      },
      err => this.groupName = 'Gruppe (' + this.groupid + ')',
      () => console.log('Done')
    );
  }

}
