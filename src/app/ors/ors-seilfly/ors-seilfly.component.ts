import { Component, OnInit } from '@angular/core';
import { faExchange, faList, faRandom, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

import { NlfComponent } from 'app/nlf.component';

@Component({
  selector: 'nlf-ors-seilfly',
  templateUrl: './ors-seilfly.component.html',
  styleUrls: ['./ors-seilfly.component.css']
})
export class NlfOrsSeilflyComponent implements OnInit {

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
