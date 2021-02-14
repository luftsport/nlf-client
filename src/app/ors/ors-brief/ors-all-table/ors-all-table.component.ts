import { Component, OnInit, Input, Inject } from '@angular/core';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { ApiOptionsInterface, NlfConfigItem } from 'app/api/api.interface';
import { Columns, Config, STYLE } from 'ngx-easy-table';
import { TableEventObject, DefaultTableConfig } from 'app/interfaces/ngx-easy-table.interface';
import { LungoOrganizationsService } from 'app/api/lungo-organizations.service';
import { NlfConfigService } from 'app/nlf-config.service';
import { cleanObject } from 'app/interfaces/functions';
//import { clone } from 'lodash';
import { ExportToCsv } from 'export-to-csv';
import { debounce } from 'ts-debounce';

@Component({
  selector: 'nlf-ors-all-table',
  templateUrl: './ors-all-table.component.html',
  styleUrls: ['./ors-all-table.component.css']
})
export class NlfOrsAllTableComponent implements OnInit {

  @Input() activity: string;

  data: any;
  items: any;
  clubs;
  dataReady = false;
  public config: NlfConfigItem;

  filter = { club: null, discipline: null, type: null, state: null, id: null, tags: null };
  tableConf: Config;
  columns = [
    { key: 'id', title: 'Id', sort: true },
    { key: 'when', title: 'Når', sort: true },
    { key: 'tags', title: 'Tittel', sort: true },
    { key: 'club', title: 'Klubb', sort: false },
    { key: 'rating._rating', title: 'Rating', sort: true },
    { key: 'workflow.state', title: 'Status', sort: true },
    { key: 'type', title: 'Type', sort: true },
  ];

  debouncedFilterId = debounce(this.filterId, 700);
  debouncedFilterTitle = debounce(this.filterTitle, 800);

  // Pagination settings
  pagination = {
    limit: 10,
    offset: 0,
    count: null,
  };

  // Initial table sort
  sort: Array<Object> = [{ 'id': -1 }];


  constructor(private orsService: ApiObservationsService,
    private orgService: LungoOrganizationsService,
    private configService: NlfConfigService
  ) { }

  ngOnInit() {
    this.tableConf = {...DefaultTableConfig};
    this.tableConf.paginationRangeEnabled = true;
    this.tableConf.orderEnabled = true;
    this.tableConf.serverPagination = true;
    this.tableConf.persistState = true;

    this.orsService.setActivity(this.activity);
    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
        this.getClubs();
        this.getData();
      }
    );

  }

  eventEmitted($event) {
    this.parseEvent($event);
  }

  public getClubs() {

    const options: ApiOptionsInterface = {
      query: {
        where: {
          'main_activity.id': this.config.mapping[this.activity],
          type_id: 14,
          is_active: true
        },
        projection: { id: 1, _id: 1, name: 1 },
        max_results: 250,
        sort: [{ name: 1 }]
      }
    };
    this.orgService.getOrganizations(options).subscribe(
      data => {
        this.clubs = data._items;
      },
      err => console.error(err)
    );

  }

  public clubChooser(event) {
    if (!!event.target.value && event.target.value != '') {
      this.filter.discipline = +event.target.value;
    } else {
      this.filter.discipline = null;
    }
    this.getData();
  }
  public stateChooser(event) {
    if (!!event.target.value && event.target.value != '') {
      this.filter.state = event.target.value;
    } else {
      this.filter.state = null;
    }
    this.getData();
  }
  public typeChooser(event) {
    console.log('EVENT type', event);
    if (!!event.target.value && event.target.value != '') {
      this.filter.type = event.target.value;
    } else {
      this.filter.type = null;
    }
    console.log('Filter Type', this.filter.type);
    this.getData();
  }

  public filterId(ors_id) {
    console.log('ID FILTER', ors_id);
    if (!!ors_id && ors_id != '') {
      this.filter.id = +ors_id;
    } else {
      this.filter.id = null;
    }
    this.getData();
  }

  public filterTitle(tag) {
    console.log('TITLE FILTER', tag);
    if (!!tag && tag != '') {
      this.filter.tags = tag; //= {$in: [tag.charAt(0).toUpperCase() + tag.slice(1), tag.toLowerCase(), tag]};
    } else {
      this.filter.tags = null;
    }
    this.getData();

  }

  private getWhere() {
    let where = {};
    Object.keys(this.filter).forEach(key => {
      if (!!this.filter[key] && this.filter[key] !== null) {
        if (key === 'state') {
          where['workflow.state'] = this.filter[key];
        } else if (key === 'tags') {
          where['$text'] = {$search: this.filter[key]};
        }
        else {
          where[key] = this.filter[key];
        }
      }
    });
    return where;

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
        this.getData();
      }
    }
  }

  public getData() {
    this.tableConf.isLoading = true;
    //this.dataReady = false;
    // Using OptionsInterface to build and pass options
    let options: ApiOptionsInterface = {
      query: {
        where: this.getWhere(),
        page: this.pagination.offset,
        max_results: this.pagination.limit,
        sort: this.sort,
      },
    };

    this.orsService.getObservations(cleanObject(options)).subscribe(
      data => {
        this.pagination.count = data._meta.total; // this is for pagination
        this.pagination = { ...this.pagination }; // Need to create new object to make change-detection work
        this.data = data._items;
      },
      err => console.error(err),
      () => {
        this.tableConf.isLoading = false;
        this.dataReady = true // After first data is ready, do not load anymore
      }
    );
  }

  public exportToCSV(): void {
   const options = {
     fieldSeparator: ',',
     quoteStrings: '"',
     decimalSeparator: '.',
     showLabels: true,
     showTitle: false,
     useTextFile: false,
     useBom: true,
     useKeysAsHeaders: true,
   };
   const csvExporter = new ExportToCsv(options);

   csvExporter.generateCsv(this.data);
}
}
