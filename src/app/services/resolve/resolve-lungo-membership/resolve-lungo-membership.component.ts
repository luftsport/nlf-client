import { Component, OnInit, Input } from '@angular/core';
import { LungoPersonsMembershipsItem } from 'app/api/lungo.interface';

@Component({
  selector: 'nlf-resolve-lungo-membership',
  templateUrl: './resolve-lungo-membership.component.html',
  styleUrls: ['./resolve-lungo-membership.component.css']
})
export class NlfResolveLungoMembershipComponent implements OnInit {

  @Input() membership: LungoPersonsMembershipsItem;
  @Input() payment_status: boolean = false;

  constructor() { }

  ngOnInit() {
    
  }

  public getPaymentStatus() {

    if(this.membership.hasOwnProperty('payment')) {
      return true;
    }

    return false;

  }

}
