import { Component, OnInit } from '@angular/core';
import { faExchange, faList, faRandom, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

import { NlfComponent } from 'app/nlf.component';

@Component({
  selector: 'nlf-ors-sportsfly',
  templateUrl: './ors-sportsfly.component.html',
  styleUrls: ['./ors-sportsfly.component.css']
})
export class NlfOrsSportsflyComponent implements OnInit {

  constructor(private app: NlfComponent) { }

  faUser = faUser;
  faSearch = faSearch;
  faExchange = faExchange;
  faRandom = faRandom;
  faList = faList;

  ngOnInit() {
    this.app.setTitle('OBSREG Oversikt');
  }

}
