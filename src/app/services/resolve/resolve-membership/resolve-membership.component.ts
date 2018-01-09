import { Component, OnInit, Input } from '@angular/core';
import { ApiNlfMembershipService } from '../../../api/api-nlf-membership.service';
import { ApiOptionsInterface } from '../../../api/api.interface';

@Component({
  selector: 'nlf-resolve-membership',
  template: '{{ membershipName }}',
  styleUrls: ['./resolve-membership.component.css']
})
export class NlfResolveMembershipComponent implements OnInit {

  @Input() membershipid: string;

  membershipName: string;

  constructor(private melwinMembershipService: ApiNlfMembershipService) { }

  ngOnInit() {

    let options: ApiOptionsInterface = {
        query: { projection: {name: 1}}
      };

    this.melwinMembershipService.getMembership(this.membershipid, options).subscribe(
      data => {
        console.log(data);
        this.membershipName = data.name;
      },
      err => this.membershipName = 'Ukjent medlemsskap',
      () => console.log('Done')
    );
  }

}
