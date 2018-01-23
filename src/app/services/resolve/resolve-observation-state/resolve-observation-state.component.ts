import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nlf-resolve-observation-state',
  templateUrl: './resolve-observation-state.component.html',
  styleUrls: ['./resolve-observation-state.component.css']
})
export class NlfResolveObservationStateComponent implements OnInit {

  @Input() state: string;
  @Input() icon: boolean;

  public statuses = {
    unknown : {badge: 'danger', icon: 'exclamation'},
    withdrawn: {badge: 'dark', icon: 'ban'},
    draft: {badge: 'secondary', icon: 'pencil'},
    pending_review_hi: {badge: 'info', icon: 'clock-o'},
    pending_review_fs: {badge: 'info', icon: 'clock-o'},
    pending_review_su: {badge: 'info', icon: 'clock-o'},
    closed: {badge: 'success', icon: 'check'}
  };

  constructor() { }

  ngOnInit() {

    if (!this.state || !this.statuses[this.state]) {
      this.state = 'unknown';
    }

  }

}
