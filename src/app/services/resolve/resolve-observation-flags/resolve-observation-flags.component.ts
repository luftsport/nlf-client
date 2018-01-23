import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nlf-resolve-observation-flags',
  templateUrl: './resolve-observation-flags.component.html',
  styleUrls: ['./resolve-observation-flags.component.css']
})
export class NlfResolveObservationFlagsComponent implements OnInit {

  @Input() flag: string;
  name: string;
  list = { 'aviation': 'Luftfartshendelse', 'insurance': 'Forsikringssak' };

  constructor() { }

  ngOnInit() {
    try {
      this.name = this.list[this.flag];
    } catch (e) {
      this.name = 'Ukjent';
    }
  }

}
