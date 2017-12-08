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

  configuration: Config;
  data;
  length;
  columns = [
   { key: 'id', title: 'ID' },
   { key: 'fullname', title: 'Name' },
   { key: 'phone', title: 'Phone' },
   { key: 'email', title: 'Email' },
 ];


  //private data:Array<any> = TableData;

  public constructor(private userService: UserService) {

    this.configuration = {
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

    this.getthem();
    //this.columns = ['phone', 'age', 'company', 'name', 'isActive'];
  }

  public ngOnInit() {

  }

  public getthem() {

    this.userService.getUsers().subscribe(
      data => {

        this.data = data._items;
        this.length = this.data.length; // this is for pagination
        console.log(this.data);
      },
      err => console.error(err),
      () => console.log("Done")
      );
    }


}
