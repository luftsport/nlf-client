import { Component, OnInit, Input, Inject } from '@angular/core';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { ApiOptionsInterface, NlfConfigItem, ApiObservationsFallskjermItem, ApiObservationsFallskjermList, ApiObservationsItem } from 'app/api/api.interface';
import { ApiNotificationsService } from 'app/api/api-notifications.service';
import { ConfirmService } from 'app/services/confirm/confirm.service';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { Columns, Config, STYLE } from 'ngx-easy-table';
import { TableEventObject, DefaultTableConfig } from 'app/interfaces/ngx-easy-table.interface';
import { LungoOrganizationsService } from 'app/api/lungo-organizations.service';
import { NlfConfigService } from 'app/nlf-config.service';
import { cleanObject } from 'app/interfaces/functions';
//import { clone } from 'lodash';
import { ExportToCsv } from 'export-to-csv';
import { Router, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nlf-ors-fallskjerm-dashboard-table',
  templateUrl: './ors-fallskjerm-dashboard-table.component.html',
  styleUrls: ['./ors-fallskjerm-dashboard-table.component.css']
})
export class NlfOrsFallskjermDashboardTableComponent implements OnInit {

  private _dateRange = [];
  @Input() activity: string;
  @Input() discipline: number;
  @Input() set dateRange(value) {
    this._dateRange = value;
    try {
      this.getData();
    } catch { }
  }

  data: ApiObservationsItem[];
  modalObservation: ApiObservationsItem;

  clubs;
  dataReady = false;
  public config: NlfConfigItem;


  filter = { club: null, discipline: null, type: null, state: null };
  tableConf: Config;
  columns = [
    { key: 'id', title: 'ID', sort: true },
    { key: 'when', title: 'Tid', sort: true },
    { key: 'tags', title: 'Tittel', sort: true },
    { key: 'reporter', title: 'Observatør', sort: true },
    { key: 'rating._rating', title: 'Rating', sort: true },
    { key: 'workflow.state', title: 'Status', sort: true },
    { key: 'type', title: 'Type', sort: true },
    { title: 'Tools' },
  ];

  // Pagination settings
  pagination = {
    limit: 10,
    offset: 0,
    count: null,
  };

  modalRef;

  // Initial table sort
  sort: Array<Object> = [{ 'id': -1 }];


  constructor(
    private orsService: ApiObservationsService,
    private orgService: LungoOrganizationsService,
    private configService: NlfConfigService,
    private modalService: NgbModal,
    private router: Router,
    private ntfService: ApiNotificationsService,
    private alertService: NlfAlertService,
    private confirmService: ConfirmService
  ) {


    this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        if (!!this.modalService.hasOpenModals()) {
          this.modalService.dismissAll();
        }
      });
  }


  ngOnInit() {

    this.tableConf = { ...DefaultTableConfig };
    this.tableConf.paginationRangeEnabled = true;
    this.tableConf.orderEnabled = true;
    this.tableConf.serverPagination = true;
    this.tableConf.persistState = true;

    this.orsService.setActivity(this.activity);

    this.filter['discipline'] = this.discipline;

    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
        this.getData();
      }
    );

  }

  eventEmitted($event) {
    this.parseEvent($event);
  }

  openModal(template, ors) {
    this.modalObservation = ors;
    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }

  closeModal() {
    this.modalObservation = undefined;
    this.modalRef.close();
  }

  public notify(observation) {
    const confirmMsg = {
      title: 'Vennligst bekreft',
      message: 'Er du sikker på at ønsker sende en purring for <strong>#' + observation.id + ' ' + observation.tags.join('/') + '</strong>?',
      yes: 'Ja',
      no: 'Nei'
    };
    this.confirmService.confirm(confirmMsg).then(
      () => { // Yes
        this.ntfService.reminder({ event_from: observation._model.type + '_observations', event_from_id: observation._id }).subscribe(
          data => {
            console.log(data);
            this.alertService.success('Purringen ble sendt', false, true, 10);
          },
          err => {
            this.alertService.error(err.error._error, false, true, 10);
          },
          () => { }
        );
      },
      () => { // No
        console.log('NO');
        // Do nothing?
      }
    );
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

  private getWhere() {
    let where = {};
    if (this._dateRange.length===2) {
      where = { when: { $gte: this._dateRange[0].toISOString(), $lte: this._dateRange[1].toISOString() } };
    }
    Object.keys(this.filter).forEach(key => {
      if (!!this.filter[key] && this.filter[key] !== null) {
        if (key === 'state') {
          where['workflow.state'] = this.filter[key];
        } else {
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
