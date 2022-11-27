import { Component, OnInit } from '@angular/core';

import { NlfComponent } from 'app/nlf.component';

@Component({
  selector: 'nlf-ors-seilfly',
  templateUrl: './ors-seilfly.component.html',
  styleUrls: ['./ors-seilfly.component.css']
})
export class NlfOrsSeilflyComponent implements OnInit {

  constructor(private app: NlfComponent) { }

  ngOnInit() {
    this.app.setTitle('OBSREG Oversikt');
  }

}
