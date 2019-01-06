import { Component, OnInit } from '@angular/core';
import { ApiContentService } from 'app/api/api-content.service';
import { ApiContentItem, ApiContentList, ApiOptionsInterface } from 'app/api/api.interface';
import { TableConfig, TableEventObject } from 'app/interfaces/ngx-easy-table.interface';
import { ConfirmService } from 'app/services/confirm/confirm.service';

@Component({
  selector: 'nlf-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class NlfContentComponent implements OnInit {

  spaces: Array<ApiContentItem>;
  dataReady = false;

  columns = [
    { key: 'space_key', title: 'Space', sort: true },
    { key: 'title', title: 'Tittel', sort: true },
    {title: 'Operations'}
  ];

  pagination = {
    limit: 10,
    offset: 0,
    count: null,
  };

  sort: Array<Object> = [{ 'id': -1 }];

  tableSpaces: TableConfig = {
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
    paginationRangeEnabled: true,
    tableLayout: {
      style: 'normal', // or big or tiny
      theme: 'normal', // or dark
      border: true,
      hover: true,
      striped: false,
    }
  };

  constructor(private apiContent: ApiContentService,
    private confirmService: ConfirmService) { }

  ngOnInit() {

    this.getAllSpaces();

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
    this.getAllSpaces();
  }

  private getAllSpaces() {

    const options: ApiOptionsInterface = {
      query: {
        where: { parent: null},
        page: this.pagination.offset,
        max_results: this.pagination.limit,
        sort: this.sort,
      },
    };

    this.apiContent.getContentList(options).subscribe(
      data => {
        this.pagination.count = data._meta.total; // this is for pagination
        this.pagination = { ...this.pagination }; // Need to create new object to make change-detection work
        this.spaces = data._items;
      },
      err => console.log(err),
      () => this.dataReady = true
    );
  }

  public delete(row) {

    const confirmMsg = {
      title: 'Please confirm',
      message: 'Are you sure you want to delete the space ' + row.title + ' ?',
      yes: 'Delete',
      no: 'Cancel'
    };

    this.confirmService.confirm(confirmMsg).then(
      () => {
        this.apiContent.remove(row._id, row._etag).subscribe(
          data => {
            console.log(data);
          },
          err => console.log(err),
          () => this.getAllSpaces()
        );
      },
      () => { // No
        // Do nothing?
      }
    );
  }
}

