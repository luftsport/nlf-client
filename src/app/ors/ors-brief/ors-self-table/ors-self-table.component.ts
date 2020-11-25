import { Component, OnInit, Input } from '@angular/core';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { ApiOptionsInterface, ApiUserDataSubjectItem } from 'app/api/api.interface';
import { NlfUserSubjectService } from 'app/user/user-subject.service';
import { Columns, Config, STYLE } from 'ngx-easy-table';
import { TableEventObject, DefaultTableConfig } from 'app/interfaces/ngx-easy-table.interface';
//import { clone } from 'lodash';


@Component({
  selector: 'nlf-ors-self-table',
  templateUrl: './ors-self-table.component.html',
  styleUrls: ['./ors-self-table.component.css']
})
export class NlfOrsSelfTableComponent implements OnInit {

  @Input() activity: string;

  data: any;
  items: any;
  dataReady = false;
  userData: ApiUserDataSubjectItem;
  tableConf;

  columns = [
    { key: 'id', title: 'ID', sort: true },
    { key: 'when', title: 'Tid', sort: true },
    { key: 'tags', title: 'Tittel', sort: true },
    { key: 'workflow.state', title: 'Status', sort: true },
    { key: 'type', title: 'Type', sort: true },
  ];

  pagination = {
    limit: 10,
    offset: 0,
    count: null,
  };

  // Initial table sort
  sort: Array<Object> = [{ when: -1 }];

  constructor(
    private orsService: ApiObservationsService,
    private userSubject: NlfUserSubjectService) {


    this.userSubject.observable.subscribe(
      data => {
        if (!!data) {
          this.userData = data;
        }
      }
    );
  }


  ngOnInit() {
    this.tableConf = {...DefaultTableConfig};
    this.tableConf.paginationRangeEnabled = true;
    this.tableConf.orderEnabled = true;
    this.tableConf.serverPagination = true;
    this.tableConf.persistState = true;

    this.orsService.setActivity(this.activity);
    this.getData();
  }

  eventEmitted($event) {
    this.parseEvent($event);
  }

  private parseEvent(obj: TableEventObject) {

    if (obj.event === 'onPagination') {
      this.pagination.limit = obj.value.limit ? obj.value.limit : this.pagination.limit;
      this.pagination.offset = obj.value.page ? obj.value.page : this.pagination.offset;
      this.pagination = { ...this.pagination };
      this.getData();
    }
    if (obj.event === 'onOrder') {

      // Limits which columns can order or not
      // if (this.columns[this.columns.findIndex(c => c.key === obj.value.key)].sort === true) {
      this.sort = [];
      let tmpSort = {};

      if (obj.value.order === 'desc') {
        tmpSort[obj.value.key] = -1;
      }
      else if (obj.value.order === 'asc') {
        tmpSort[obj.value.key] = 1;
      }
      this.sort.push(tmpSort);
      this.getData();
    }
    //}

    // Always call getData on table event? No only for pagination and order

  }

  public getData() {

    if (!!this.userData) {
      // Using OptionsInterface to build and pass options
      let options: ApiOptionsInterface = {
        query: {
          page: this.pagination.offset,
          max_results: this.pagination.limit,
          sort: this.sort,
        },
      };

      this.orsService.getObservationsSelf(options).subscribe(
        data => {
          this.pagination.count = data._meta.total; // this is for pagination
          this.pagination = { ...this.pagination }; // Need to create new object to make change-detection work
          this.data = data._items;
        },
        err => console.error(err),
        () => {
          this.tableConf.isLoading = false;
          this.dataReady = true;
        }
      );
    }
  }
}
