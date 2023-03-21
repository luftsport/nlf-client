import { Component, OnInit } from '@angular/core';

import { NlfComponent } from 'app/nlf.component';
import { faSearch, faUser, faExchange, faRandom, faList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-ors-motor',
  templateUrl: './ors-motor.component.html',
  styleUrls: ['./ors-motor.component.css']
})
export class NlfOrsMotorComponent implements OnInit {

  faSearch = faSearch;
  faUser = faUser;
  faExchange = faExchange;
  faRandom = faRandom;
  faList = faList;

  constructor(private app: NlfComponent) { }

  ngOnInit() {
    this.app.setTitle('OBSREG Oversikt');
  }

}
