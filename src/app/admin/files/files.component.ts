import { Component, OnInit } from '@angular/core';
import { TableEventObject, DefaultTableConfig } from 'app/interfaces/ngx-easy-table.interface';
import { ApiFilesService } from 'app/api/api-files.service';
import { ApiOptionsInterface, ApiFileList, ApiFileItem } from 'app/api/api.interface';
import { clone } from 'lodash';

@Component({
  selector: 'nlf-admin-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class NlfAdminFilesComponent implements OnInit {

  data: ApiFileItem[];
  items: any;
  dataReady = false;
  tableConf;


  /*
  "_id": "5d9b01feee4db30eb6f12887",
  "ref": "_observations",
  "ref_id": "5d919304ee4db3120f05812b",
  "content_type": "image/jpeg",
  "name": "real reason evolution started.jpg",
  "size": 35166,
  "owner": 8795979,
  "activity": "motorfly",
  "_updated": "2019-10-07T09:14:38.000000Z",
  "_created": "2019-10-07T09:14:38.000000Z",
  "_version": 1,
  "_etag": "26e53e7c187da7eb8cc0f0181b3cce91698074cb",
  */

  columns = [
    { key: 'ref_id', title: 'ID', sort: true },
    { key: 'ref', title: 'Ref Collection', sort: true },
    { key: 'content_type', title: 'Type', sort: true },
    { key: 'size', title: 'Size', sort: true },
    { key: 'owner', title: 'Owner', sort: true },
    { key: 'activity', title: 'Activity', sort: true },
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

    this.apiFile.getFiles(options).subscribe(
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
