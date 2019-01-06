import { ApiCacheService } from 'app/api/api-cache.service';
import { Component, OnInit, Input } from '@angular/core';
import { ApiNlfMembershipService } from 'app/api/api-nlf-membership.service';
import { ApiOptionsInterface } from 'app/api/api.interface';

@Component({
  selector: 'nlf-resolve-membership',
  template: '{{ membershipName }}',
  styleUrls: ['./resolve-membership.component.css']
})
export class NlfResolveMembershipComponent implements OnInit {

  @Input() membershipid: string;

  membershipName: string;

  constructor(private melwinMembershipService: ApiNlfMembershipService,
              private apiCache: ApiCacheService) { }

  ngOnInit() {

    let options: ApiOptionsInterface = {
        query: { projection: {name: 1}}
      };

    this.apiCache.get(['resolve-membership', this.membershipid, options.query],
    this.melwinMembershipService.getMembership(this.membershipid, options)).subscribe(
      data => {
        console.log(data);
        this.membershipName = data.name;
      },
      err => this.membershipName = 'Ukjent medlemsskap',
      () => console.log('Done')
    );
  }

}
