import { Component, OnInit } from '@angular/core';
import { TableEventObject, DefaultTableConfig } from 'app/interfaces/ngx-easy-table.interface';
import { ApiFilesService } from 'app/api/api-files.service';
import { ApiOptionsInterface, ApiFileList, ApiFileItem } from 'app/api/api.interface';
//import { clone } from 'lodash';

@Component({
  selector: 'nlf-admin-files-orphan',
  templateUrl: './files-orphan.component.html',
  styleUrls: ['./files-orphan.component.css']
})
export class NlfAdminFilesOrphanComponent implements OnInit {

  data: ApiFileItem[];
  items: any;
  dataReady = false;
  tableConf;
  /**
  "_id": "54f9e2b97ae72894ddab7aa5",
      "contentType": "image/png",
      "uploadDate": "2015-03-06T17:24:09.750000Z",
      "md5": "19f403f5823d829d4ae7ed88a0c72019",
      "length": 169517,
      "ref_count": 0
    **/
  columns = [
    { key: 'contentType', title: 'Type', sort: true },
    { key: 'length', title: 'Size', sort: true },
    { key: 'uploadDate', title: 'Uploaded', sort: true },
    { key: 'md5', title: 'MD5', sort: true },
    { key: 'ref_count', title: 'Ref Col', sort: true },
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
    this.tableConf = {...DefaultTableConfig};
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

    this.apiFile.getOrphan(options).subscribe(
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
