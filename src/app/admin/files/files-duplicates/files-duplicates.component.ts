import { Component, OnInit } from '@angular/core';
import { TableEventObject, DefaultTableConfig } from 'app/interfaces/ngx-easy-table.interface';
import { ApiFilesService } from 'app/api/api-files.service';
import { ApiOptionsInterface, ApiFileList, ApiFileItem } from 'app/api/api.interface';
import { clone } from 'lodash';

@Component({
  selector: 'nlf-admin-files-duplicates',
  templateUrl: './files-duplicates.component.html',
  styleUrls: ['./files-duplicates.component.css']
})
export class NlfAdminFilesDuplicatesComponent implements OnInit {

  data: ApiFileItem[];
  items: any;
  dataReady = false;
  tableConf;
  /**
  "_id": "ff2234b7e4e111d924fa23895910c62f",
  "num": 2,
  "ref_ids": ["5d246035ee4db3043bf71c44", "5d2381abee4db3043bf71c36"],
  "size": 72706,
  "content_type": "image/jpeg"
  **/
  columns = [
    { key: 'content_type', title: 'Type', sort: true },
    { key: 'length', title: 'Size', sort: true },
    { key: 'num', title: 'Num', sort: true },
    { key: 'ref_ids', title: 'Files', sort: true },
  ];

  pagination = {
    limit: 10,
    offset: 0,
    count: null,
  };

  // Initial table sort
  sort: Array<Object> = [{ when: -1 }];
  constructor(
    private apiFile: ApiFilesService,
  ) { }

  ngOnInit() {
    this.tableConf = clone(DefaultTableConfig);
    this.tableConf.paginationRangeEnabled = true;
    this.tableConf.orderEnabled = true;
    this.tableConf.serverPagination = true;
    this.tableConf.persistState = true;

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

    // Using OptionsInterface to build and pass options
    let options: ApiOptionsInterface = {
      query: {
        page: this.pagination.offset,
        max_results: this.pagination.limit,
        sort: this.sort,
        projection: { file: 0 }
      },
    };

    this.apiFile.getDuplicates(options).subscribe(
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
