import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserService } from '../../api/user.service';

// Table
import { TemplateRef, ViewChild } from '@angular/core';
import {TableModule} from 'ngx-easy-table';
//import { TableData } from './table.data';

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

@Component({
  selector: 'app-app-user-table',
  templateUrl: './app-user-table.component.html',
  styleUrls: ['./app-user-table.component.css']
})
export class AppUserTableComponent implements OnInit {

  @ViewChild('detailsTemplate') detailsTemplateRef: TemplateRef<any>;


  data;

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

  configuration : Config = {
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

  public constructor(private userService: UserService) {

  }

  public ngOnInit() {
    this.getData();
  }


  eventEmitted($event) {
    this.parseEvent($event);
  }

  private parseEvent(obj: EventObject) {
    this.pagination.limit = obj.value.limit ? obj.value.limit : this.pagination.limit;
    this.pagination.offset = obj.value.page ? obj.value.page : this.pagination.offset;
    this.pagination = { ...this.pagination };
    this.getData();
  }

  public getData() {

    this.userService.getUsers(this.pagination.offset,this.pagination.limit).subscribe(
      data => {
        this.pagination.count = data._meta.total; // this is for pagination
        this.pagination = { ...this.pagination }; //Need to create new object to make change-detection work
        this.data = data._items;
      },
      err => console.error(err),
      () => console.log("Done")
      );
    }
}


interface EventObject {
  event: string;
  value: any;
}
