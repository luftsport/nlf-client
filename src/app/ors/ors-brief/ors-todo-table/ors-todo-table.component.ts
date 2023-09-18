import { Component, OnInit, Input } from '@angular/core';
import { ApiObservationsWorkflowService } from 'app/api/api-observations-workflow.service';
import { ApiOptionsInterface } from 'app/api/api.interface';
import { TableEventObject, DefaultTableConfig } from 'app/interfaces/ngx-easy-table.interface';
import { timeSince } from 'app/interfaces/functions';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { isObject as _isObject, has as _has } from 'lodash';

@Component({
  selector: 'nlf-ors-todo-table',
  templateUrl: './ors-todo-table.component.html',
  styleUrls: ['./ors-todo-table.component.css']
})
export class NlfOrsTodoTableComponent implements OnInit {

  faClock = faClock;

  @Input() activity: string;

  data: any;
  items: any;
  dataReady = false;
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
  sort: Array<Object> = [{ 'when': 1 }];

  constructor(private workflowService: ApiObservationsWorkflowService) { }

  ngOnInit() {
    this.tableConf = DefaultTableConfig;
    this.tableConf.paginationRangeEnabled = true;
    this.tableConf.orderEnabled = true;
    this.tableConf.serverPagination = true;
    this.tableConf.persistState = true;

    this.workflowService.setActivity(this.activity);
    this.
    getData();
  }

  public timedelta(_updated) {
    return timeSince(_updated);
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
      if (_isObject(obj) && _has(obj, 'value.key') && this.columns[this.columns.findIndex(c => c.key === obj.value.key)].sort === true) {
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
        page: this.pagination.offset, // Error due to backend!
        max_results: this.pagination.limit,
        sort: this.sort,
      },
    };

    this.workflowService.getWorkflowTodo(options).subscribe(
      data => {
        this.pagination.count = data._meta.total; // this is for pagination
        this.pagination = { ...this.pagination }; // Need to create new object to make change-detection work
        this.data = data._items;
      },
      err => console.error(err),
      () =>  this.dataReady = true
    );
  }
}
