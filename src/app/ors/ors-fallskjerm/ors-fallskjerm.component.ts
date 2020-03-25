import { Component, OnInit } from '@angular/core';

import { NlfComponent } from 'app/nlf.component';

@Component({
  selector: 'nlf-ors-fallskjerm',
  templateUrl: './ors-fallskjerm.component.html',
  styleUrls: ['./ors-fallskjerm.component.css']
})
export class NlfOrsFallskjermComponent implements OnInit {

  constructor(private app: NlfComponent) { }

  ngOnInit() {
    this.app.setTitle('ORS Oversikt');
  }

}
