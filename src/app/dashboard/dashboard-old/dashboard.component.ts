import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DashboardComponent, WidgetComponent } from 'ngx-dashboard';
import { WidgetOrsPieComponent } from '../widget-ors-pie/widget-ors-pie.component';
import * as CJ from 'circular-json-es6';
@Component({
  selector: 'nlf-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  host: {
    '(window:resize)': '_onResize($event)',
  }
})
export class NlfDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild(DashboardComponent) dashboard: DashboardComponent;
  widgetsSize: number[] = [300, 150];
  dashboardMargin: number = 20;
  hasDash = false;
  init = false;
  replacerSeen = [];

  // Dummy data
  hopptyper = [{ 'name': 'Trening', 'value': 12311 },
              { 'name': 'Demo', 'value': 32 },
              { 'name': 'AFF', 'value': 1455 },
              { 'name': 'Tandem', 'value': 1732 },
              { 'name': 'Konkuranse', 'value': 855 },
  ];
  bar = [{ 'name': 'Voss', 'value': 16311 },
          { 'name': 'Tønsberg', 'value': 14243 },
          { 'name': 'Oslo', 'value': 13477 },
          { 'name': 'NTNU', 'value': 7665 },
          { 'name': 'Bergen', 'value': 1785 },
  ];
  // @HostListener('window:resize') this._onResize($event);
  constructor() {
    //localStorage.clear();
    console.log(CJ.stringifyStrict);
    console.log('Storage');
    console.log(localStorage.getItem('dashboard'));
    if (!!localStorage.getItem('dashboard')) {
      this.hasDash = true;

    }

  }

  ngOnInit() {
    this._onResize(null);
    console.log('PASRE', CJ.stringifyStrict({ a: 'test', c: 'abrajk' }));
  }

  ngAfterViewInit() {

    if (this.hasDash && !this.init) {
      //Object.assign(this.dashboard, <DashboardComponent>CJ.parse(localStorage.getItem('dashboard')));
      /*
       const state = CJ.parse(localStorage.getItem('dashboard')) as DashboardComponent;
       this.dashboard = state;
       this.dashboard.refreshWidgets();
       console.log('New dashboard:', this.dashboard);
       */
      /*widgets.forEach(w => {
        //if (!this.dashboard.getWidgetById(w.))
        console.log('W');
        console.log(w);
        this.dashboard.addItem(w);
      },
        () => this.init = true
      );*/

    }

  }

  private _onResize(event: any) {

    if (window.innerWidth < 750) {
      this.dashboardMargin = 10;
      this.widgetsSize = [this.dashboard.width / 2 - this.dashboardMargin, this.widgetsSize[1]];

    } else {
      this.dashboardMargin = 20;
      const nbColumn = Math.floor(this.dashboard.width / (300 + this.dashboardMargin));
      this.widgetsSize = [this.dashboard.width / nbColumn - this.dashboardMargin, this.widgetsSize[1]];
    }
    //this.changed();
  }

  log(widget: WidgetComponent, type: string) {
    console.log('LOG', widget, type);
    //console.log('Storage');
    //console.log(localStorage.getItem('dashboard'));
  }

  logOrder(order: Array<string>) {
    console.log(order, 'orderchange');
  }


  changed() {

    try {
      localStorage.setItem('dashboard', CJ.stringifyStrict(this.dashboard));
    } catch (e) {
      console.log('Tryed stringify', e);
    }

    let arr = [];
    console.log('changed!');
    console.log(this.dashboard.order);

    /*
    this.dashboard.order.forEach(id => {
      console.log('ID:', id);
      console.log(this.dashboard.getWidgetById(id));
      arr.push(this.dashboard.getWidgetById(id));
      console.log('Class is', this.dashboard.getWidgetById(id).constructor.name);
    }
    );
    console.log('Type widget', typeof arr[0]);
    console.log('dashboard now2', localStorage.getItem('dashboard'));
    console.log('Stringyfy',  CJ.stringifyStrict(arr));
    */
  }

  addWidget() {
    const ref: WidgetOrsPieComponent = this.dashboard.addItem(WidgetOrsPieComponent);
    ref.widgetId = Math.random() + '';
    ref.dashboard = this.dashboard;
    // console.log('REF', CJ.stringifyStrict(ref));
    this.changed();

  }

  close(e: any, id: string) {
    this.dashboard.removeItemById(id);
    e.preventDefault();
    e.stopPropagation();
    this.changed();
  }
}
