import { Component, OnInit } from '@angular/core';

import { NlfOrsFallskjermAllTableComponent } from './ors-fallskjerm-all-table/ors-fallskjerm-all-table.component';
import { NlfOrsFallskjermSelfTableComponent } from './ors-fallskjerm-self-table/ors-fallskjerm-self-table.component';
import { NlfOrsFallskjermTodoTableComponent } from './ors-fallskjerm-todo-table/ors-fallskjerm-todo-table.component';
import { NlfComponent } from '../../nlf.component';

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
