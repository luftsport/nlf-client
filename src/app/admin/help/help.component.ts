import { Component, OnInit } from '@angular/core';
import { ApiHelpService } from './../../api/api-help.service';
import { ApiHelpItem, ApiHelpList, ApiOptionsInterface } from './../../api/api.interface';
import { TableConfig, TableEventObject } from './../../interfaces/ngx-easy-table.interface';
import { ConfirmService } from './../../services/confirm/confirm.service';

@Component({
  selector: 'nlf-admin-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class NlfAdminHelpComponent implements OnInit {

  help: Array<ApiHelpItem>;
  dataReady = false;

  columns = [
    { key: 'key', title: 'Key', sort: true },
    { key: 'title', title: 'Tittel', sort: true },
    {title: 'Operations'}
  ];

  pagination = {
    limit: 10,
    offset: 0,
    count: null,
  };

  sort: Array<Object> = [{ 'id': -1 }];

  tableHelp: TableConfig = {
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
    detailsTemplate: false,
    groupRows: false,
    paginationRangeEnabled: true
  };

  constructor(private apiHelp: ApiHelpService,
    private confirmService: ConfirmService) { }

  ngOnInit() {

    this.getAllHelp();

  }

  eventEmitted($event) {
    this.parseEvent($event);
  }

  private parseEvent(obj: TableEventObject) {

    if (obj.event === 'onPagination') {
      this.pagination.limit = obj.value.limit ? obj.value.limit : this.pagination.limit;
      this.pagination.offset = obj.value.page ? obj.value.page : this.pagination.offset;
      this.pagination = { ...this.pagination };

    }
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

    // Always call getData on table event? No only for pagination and order
    this.getAllHelp();
  }

  private getAllHelp() {

    const options: ApiOptionsInterface = {
      query: {
        page: this.pagination.offset,
        max_results: this.pagination.limit,
        sort: this.sort,
      },
    };

    this.apiHelp.getHelpList(options).subscribe(
      data => {
        this.pagination.count = data._meta.total; // this is for pagination
        this.pagination = { ...this.pagination }; // Need to create new object to make change-detection work
        this.help = data._items;
      },
      err => console.log(err),
      () => this.dataReady = true
    );
  }

  public delete(row) {

    const confirmMsg = {
      title: 'Please confirm',
      message: 'Are you sure you want to delete ' + row.title + ' ?',
      yes: 'Delete',
      no: 'Cancel'
    };

    this.confirmService.confirm(confirmMsg).then(
      () => {
        this.apiHelp.remove(row._id, row._etag).subscribe(
          data => {
            console.log(data);
          },
          err => console.log(err),
          () => this.getAllHelp()
        );
      },
      () => { // No
        // Do nothing?
      }
    );
  }
}
