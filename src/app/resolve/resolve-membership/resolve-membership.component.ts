import { Component, OnInit, Input } from '@angular/core';
import { MelwinMembershipService } from '../../api/melwin-membership.service';
import { OptionsInterface } from '../../api/options.interface';

@Component({
  selector: 'app-resolve-membership',
  template: '{{ membershipName }}',
  styleUrls: ['./resolve-membership.component.css']
})
export class ResolveMembershipComponent implements OnInit {

  @Input() membershipid: string;

  membershipName: string = '';

  constructor(private melwinMembershipService: MelwinMembershipService) { }

  ngOnInit() {

    let options: OptionsInterface = {
        params: { projection: '{"name": 1}'}
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
