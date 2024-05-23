import { Component, OnInit, Input } from '@angular/core';
import { DefaultTableConfig, TableEventObject } from 'app/interfaces/ngx-easy-table.interface';
import { Columns, Config, STYLE } from 'ngx-easy-table';
import { ApiOptionsInterface, ApiObservationsList } from 'app/api/api.interface';
import { ApiObservationsAggService } from 'app/api/api-observations-agg.service';

@Component({
  selector: 'nlf-fallskjerm-obsreg-members-other',
  templateUrl: './fallskjerm-obsreg-members-other.component.html',
  styleUrls: ['./fallskjerm-obsreg-members-other.component.css']
})
export class FallskjermObsregMembersOtherComponent implements OnInit {

  @Input() discipline;
  @Input() activity = 'fallskjerm';

  table_id = 'member-other';
  tableConf: Config;
  public columns: Columns[] = [
    { key: 'id', title: 'ID'},
    { key: 'tags', title: 'Tittel'},
    { key: 'involved', title: 'Involverte'},
    { key: 'when', title: 'Når'},
    { key: 'location.name', title: 'Sted'},
    { key: 'discipline', title: 'Klubb'},
    { key: 'rating', title: 'Rating'},
  ];

  pagination = {
    limit: 10,
    offset: 0,
    count: null,
  };

  data: ApiObservationsList;

  dataReady = false;

  // Initial table sort
  sort: Array<Object> = [{ when: -1 }];

  constructor(private aggService: ApiObservationsAggService) { }

  ngOnInit(): void {
    this.tableConf = DefaultTableConfig;
    this.tableConf.tableLayout.style = STYLE.TINY;
    this.tableConf.headerEnabled = true;
    this.tableConf.orderEnabled = false;
    this.getData();
  }



  public parseEvent(obj: TableEventObject) {

    if (obj.event === 'onPagination') {
      this.pagination.limit = obj.value.limit ? obj.value.limit : this.pagination.limit;
      this.pagination.offset = obj.value.page ? obj.value.page : this.pagination.offset;
      this.pagination = { ...this.pagination };
      this.getData();
    }

    if (obj.event === 'onOrder') {

      // Limits which columns can order or not
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

  }

  public getData() {

    // Using OptionsInterface to build and pass options
    let options: ApiOptionsInterface = {
      query: {
        page: this.pagination.offset,
        max_results: this.pagination.limit,
        sort: this.sort,
      },
    };

    this.aggService.getUsersForeign(this.discipline, options).subscribe(
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


