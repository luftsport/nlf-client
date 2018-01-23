import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiObservationsWorkflowService } from '../../../api/api-observations-workflow.service';
import { ApiOptionsInterface } from '../../../api/api.interface';
import { TableModule } from 'ngx-easy-table';
import { TableConfig, TableEventObject } from './../../../interfaces/ngx-easy-table.interface';

@Component({
  selector: 'nlf-ors-fallskjerm-todo-table',
  templateUrl: './ors-fallskjerm-todo-table.component.html',
  styleUrls: ['./ors-fallskjerm-todo-table.component.css']
})
export class NlfOrsFallskjermTodoTableComponent implements OnInit {
  data: any;
  items: any;
  dataReady = false;

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
  sort: Array<Object> = [{ 'when': 1 }];

  tableTodo: TableConfig = {
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

  constructor(private workflowService: ApiObservationsWorkflowService) { }

  ngOnInit() {
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

    this.getData();
  }

  public getData() {

    let options: ApiOptionsInterface = {
      query: {
        page: this.pagination.offset + 1, // Error due to backend!
        max_results: this.pagination.limit,
        sort: this.sort,
      },
    };

    this.workflowService.getWorkflowTodo(options).subscribe(
      data => {
        this.pagination.count = data._meta.total - this.tableTodo.rows; // Error due to backend!
        this.pagination = { ...this.pagination };
        this.data = data._items;
      },
      err => console.error(err),
      () =>  this.dataReady = true
    );
  }
}
