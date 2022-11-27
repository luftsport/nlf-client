import { Component, OnInit } from '@angular/core';

import { NlfComponent } from 'app/nlf.component';

@Component({
  selector: 'nlf-ors-sportsfly',
  templateUrl: './ors-sportsfly.component.html',
  styleUrls: ['./ors-sportsfly.component.css']
})
export class NlfOrsSportsflyComponent implements OnInit {

  constructor(private app: NlfComponent) { }

  ngOnInit() {
    this.app.setTitle('OBSREG Oversikt');
  }

}
