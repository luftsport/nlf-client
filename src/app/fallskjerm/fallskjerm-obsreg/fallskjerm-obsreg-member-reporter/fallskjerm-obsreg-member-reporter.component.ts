import { Component, OnInit, Input } from '@angular/core';
import { DefaultTableConfig, TableEventObject } from 'app/interfaces/ngx-easy-table.interface';
import { Columns, Config, STYLE } from 'ngx-easy-table';
import { ApiOptionsInterface, ApiObservationsList } from 'app/api/api.interface';
import { ApiObservationsAggService } from 'app/api/api-observations-agg.service';

@Component({
  selector: 'nlf-fallskjerm-obsreg-member-reporter',
  templateUrl: './fallskjerm-obsreg-member-reporter.component.html',
  styleUrls: ['./fallskjerm-obsreg-member-reporter.component.css']
})
export class FallskjermObsregMemberReporterComponent implements OnInit {

  @Input() discipline;
  @Input() activity = 'fallskjerm';

  table_id = 'member-reporter';
  tableConf: Config;
  public columns: Columns[] = [
    { key: '_id', title: 'Navn'},
    { key: 'total', title: 'Antall'},

  ];

  pagination = {
    limit: 10,
    offset: 0,
    count: null,
  };

  data: ApiObservationsList;

  dataReady = false;

  constructor(private aggService: ApiObservationsAggService) { }

  ngOnInit(): void {
    this.tableConf = DefaultTableConfig;
    this.tableConf.tableLayout.style = STYLE.TINY;
    this.tableConf.headerEnabled = true;
    this.getData();
  }

  public parseEvent(obj: TableEventObject) {

    if (obj.event === 'onPagination') {
      this.pagination.limit = obj.value.limit ? obj.value.limit : this.pagination.limit;
      this.pagination.offset = obj.value.page ? obj.value.page : this.pagination.offset;
      this.pagination = { ...this.pagination };
      this.getData();
    }

  }

  public getData() {

    // Using OptionsInterface to build and pass options
    const options: ApiOptionsInterface = {
      query: {
        page: this.pagination.offset,
        max_results: this.pagination.limit,
      }
    };

    this.aggService.getUsersCreatedReports(this.discipline, options).subscribe(
      data => {
        this.pagination.count = data._meta.total; // this is for pagination
        this.pagination = { ...this.pagination }; // Need to create new object to make change-detection work
        data._items.forEach((row, index) => { 
          row['i'] = index + 1;
        });
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
