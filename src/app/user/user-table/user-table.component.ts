import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiNlfUserService } from 'app/api/api-nlf-user.service';
import { ApiOptionsInterface } from 'app/api/api.interface';
// Table
import { TemplateRef, ViewChild } from '@angular/core';
import { TableModule } from 'ngx-easy-table';
// import { TableData } from './table.data';

interface Config {
  searchEnabled: boolean;
  headerEnabled: boolean;
  orderEnabled: boolean;
  globalSearchEnabled: boolean;
  paginationEnabled: boolean;
  exportEnabled: boolean;
  clickEvent: boolean;
  selectRow: boolean;
  selectCol: boolean;
  selectCell: boolean;
  rows: number;
  additionalActions: boolean;
  serverPagination: boolean;
  isLoading: boolean;
  detailsTemplate: boolean;
  groupRows: boolean;
}

interface EventObject {
  event: string;
  value: any;
}

@Component({
  selector: 'nlf-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class NlfUserTableComponent implements OnInit {

  @ViewChild('detailsTemplate') detailsTemplateRef: TemplateRef<any>;

  data: any;
  items: any;

  columns = [
    { key: 'id', title: 'ID' },
    { key: 'fullname', title: 'Name' },
    { key: 'phone', title: 'Phone' },
    { key: 'email', title: 'Email' },
  ];

  pagination = {
    limit: 10,
    offset: 0,
    count: null,
  };

  // Initial table sort
  sort: Array<Object> = [{ 'id': 1 }];

  configuration: Config = {
    searchEnabled: false,
    headerEnabled: true,
    orderEnabled: true,
    globalSearchEnabled: false,
    paginationEnabled: true,
    exportEnabled: true,
    clickEvent: false,
    selectRow: true,
    selectCol: false,
    selectCell: false,
    rows: 10,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: true,
    groupRows: false
  };

  public constructor(private userService: ApiNlfUserService) {

  }

  public ngOnInit() {
    this.getData();
  }


  eventEmitted($event) {
    this.parseEvent($event);
  }

  private parseEvent(obj: EventObject) {

    if (obj.event === 'onPagination') {
      this.pagination.limit = obj.value.limit ? obj.value.limit : this.pagination.limit;
      this.pagination.offset = obj.value.page ? obj.value.page : this.pagination.offset;
      this.pagination = { ...this.pagination };

    }
    if (obj.event === 'onOrder') {

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

    // Always call getData on table event? No only for pagination and order
    this.getData();
  }

  public getData() {

    // Using OptionsInterface to build and pass options
    let options: ApiOptionsInterface = {
      query: {
        page: this.pagination.offset,
        max_results: this.pagination.limit,
        sort: this.sort,
        // where: {'id': {'$in': []}}
      },
      headers: { 'X-Something-Stinks': 'Have a fishy day!' },
    };

    this.userService.getUsers(options).subscribe(
      data => {
        this.pagination.count = data._meta.total; // this is for pagination
        this.pagination = { ...this.pagination }; // Need to create new object to make change-detection work
        this.data = data._items;
      },
      err => console.error(err),
      () => console.log('Done')
    );
  }
}



