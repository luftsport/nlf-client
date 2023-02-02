import { Component, OnInit, Input, Inject } from '@angular/core';
import { ApiAircraftsService } from 'app/api/api-aircrafts.service';
import { ApiOptionsInterface, ApiAircraftsItem } from 'app/api/api.interface';
import { ApiEveBaseAggregateList } from 'app/api/api-eve.interface';
import { Columns, Config, DefaultConfig, STYLE } from 'ngx-easy-table';
import { TableEventObject } from 'app/interfaces/ngx-easy-table.interface';
import { cleanObject } from 'app/interfaces/functions';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-aircrafts-list',
  templateUrl: './aircrafts-list.component.html',
  styleUrls: ['./aircrafts-list.component.css']
})
export class NlfAircraftsListComponent implements OnInit {

  faPlane = faPlane;

  data: ApiAircraftsItem[];
  aircraft_types: ApiEveBaseAggregateList;
  selected_aircraft_types = [];
  items: any;
  clubs;
  dataReady = false;

  // Table
  tableConf: Config;

  filter = {club: null, discipline: null, type: null, state: null};

  columns = [
    { key: 'callsign', title: 'Reg', sort: true },
    { key: 'type', title: 'Type', sort: true },
    { key: 'manufacturer', title: 'Produsent', sort: true },
    { key: 'model', title: 'Modell', sort: true },
    { key: 'msn', title: 'MSN', sort: false },
    { key: 'status', title: 'Status', sort: true },
    { key: 'e5x', title: 'E5X', sort: true },
  ];

  pagination = {
    limit: 10,
    offset: 0,
    count: null,
  };

  // Initial table sort
  sort: Array<Object> = [{ 'callsign': 1 }];


  constructor(
    private aircraftsService: ApiAircraftsService
    ) { }

  ngOnInit() {
    this.tableConf = DefaultConfig;
    this.tableConf.paginationRangeEnabled = true;
    this.tableConf.paginationEnabled = true;
    this.tableConf.tableLayout.hover = true;
    this.tableConf.tableLayout.striped  = true;
    this.tableConf.tableLayout.style = 'bootstrap';
    this.tableConf.rows = 10;
    this.tableConf.persistState = true;
    this.getAircraftTypes();
    this.getAircrafts();
  }


  eventEmitted($event) {
    this.parseEvent($event);
  }


  public clubChooser(event) {
    if(!!event.target.value || event.target.value === '') {
      this.filter.discipline = +event.target.value;
    } else {
      this.filter.discipline = null;
    }
    this.getAircrafts();
  }
  public stateChooser(event) {
    if(!!event.target.value || event.target.value === '') {
      this.filter.state = event.target.value;
    } else {
      this.filter.state = null;
    }
    this.getAircrafts();
  }
  public typeChooser(event) {
    if(!!event.target.value || event.target.value === '') {
      this.filter.type = null; //this.filter.type.push(event.target.value);
    } else {
      this.filter.type = {$nin: this.selected_aircraft_types};
    }
    this.getAircrafts();
  }

  private getWhere() {

    let where = {};

    Object.keys(this.filter).forEach(key => {
      if (!!this.filter[key] && this.filter[key] !==null) {
        if(key==='state') {
          where['workflow.state'] = this.filter[key];
        } else {
          where[key] = this.filter[key];
        }
      }
    });
    return where;

  }

  private parseEvent(obj: TableEventObject) {
    console.log('Event', obj);

    // Pagination
    if (obj.event === 'onPagination') {
      this.pagination.limit = obj.value.limit ? obj.value.limit : this.pagination.limit;
      this.pagination.offset = obj.value.page ? obj.value.page : this.pagination.offset;
      this.pagination = { ...this.pagination };
    }

    // onClick
    if (obj.event === 'onClick') {

    }
    // Sort/order
    if (obj.event === 'onOrder') {

      // Limits which columns can order or not
      if (this.columns[this.columns.findIndex(c => c.key === obj.value.key)].sort === true) {
        this.sort = [];
        let tmpSort = {};

        if (obj.value.order === 'desc') {
          tmpSort[obj.value.key] = -1;
        }
        else if (obj.value.order === 'asc') {
          tmpSort[obj.value.key] = 1;
        }
        this.sort.push(tmpSort);

      }
    }

    if (['onPagination', 'onOrder'].indexOf(obj.event)>-1) {
      // Always call getAircrafts on table event? No only for pagination and order
      this.getAircrafts();
    }
  }

  public getAircraftTypes() {
    this.aircraftsService.getAircraftTypes().subscribe(
      data => {
        this.aircraft_types = data._items;
      },
      err => console.error(err),
      //() => this.dataReady = true
    );
  }


  public getAircrafts() {
    // Using OptionsInterface to build and pass options
    let options: ApiOptionsInterface = {
      query: {
        where: this.getWhere(),
        page: this.pagination.offset,
        max_results: this.pagination.limit,
        sort: this.sort,
        projection: {image: 0}
      },
    };
    //console.log('AC options', options);
    this.aircraftsService.getAircrafts(cleanObject(options)).subscribe(
      data => {
        this.pagination.count = data._meta.total; // this is for pagination
        this.pagination = { ...this.pagination }; // Need to create new object to make change-detection work
        this.data = data._items;
      },
      err => console.error(err),
      () => this.dataReady = true // After first data is ready, do not load anymore
    );
  }


}
