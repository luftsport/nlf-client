import { Component, OnInit, Input } from '@angular/core';
import { AclGroupsService } from '../../api/acl-groups.service';
import { OptionsInterface } from '../../api/options.interface';

@Component({
  selector: 'app-resolve-group',
  //templateUrl: './resolve-group.component.html',
  template: '{{ groupName }}',
  styleUrls: ['./resolve-group.component.css']
})
export class ResolveGroupComponent implements OnInit {

  @Input() groupid: string;

  groupName: string = '';

  constructor(private aclGroupsService: AclGroupsService) { }

  ngOnInit() {

    let options: OptionsInterface = {
        query: { projection: {name: 1}}
      };

    this.aclGroupsService.getGroup(this.groupid, options).subscribe(
      data => {
        console.log(data);
        this.groupName = data.name;
      },
      err => this.groupName = 'Gruppe (' + this.groupid + ')',
      () => console.log('Done')
    );
  }

}
