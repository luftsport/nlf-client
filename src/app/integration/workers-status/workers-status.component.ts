import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { LungoSyncdaemonWorkersStatusItem, LungoIntegrationChangesStatusItem } from 'app/api/lungo.interface';
import { LungoIntegrationService } from 'app/api/lungo-integration.service';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { Columns, Config, DefaultConfig, STYLE } from 'ngx-easy-table';
// import { Config } from './ngx-easy-table/model/config';

@Component({
  selector: 'nlf-workers-status',
  templateUrl: './workers-status.component.html',
  styleUrls: ['./workers-status.component.css']
})
export class NlfWorkersStatusComponent implements OnInit {
  workers: LungoSyncdaemonWorkersStatusItem[];
  dataReady = false;
  sync = 0;
  pop = 0;
  msgs = 0;
  online = 0;

  status: LungoIntegrationChangesStatusItem[];
  entityTypes = [];
  entityTypesReady = false;

  tableConfig: Config;

  /**
  "name": "klubb-214063",
  "id": 214063,
  "status": true,
  "state": "waiting",
  "mode": "populate",
  "reason": "connection pool",
  "index": 0,
  "uptime": [0, 39626],
  "started": "2018-12-25T05:04:01.219050",
  "messages": 467,
  "sync_type": "changes",
  "sync_interval": ["2017-05-21T13:40:03.640000+00:00", "2017-06-20T13:40:03.640000+00:00"],
  "sync_misfires": 0,
  "sync_errors": 0,
  "next_run_time": null
   */
  columns = [
    { key: 'status', title: 'Status', sort: true },
    { key: 'id', title: 'ID', sort: true },
    { key: 'state', title: 'State', sort: true },
    { key: 'mode', title: 'Mode', sort: true },
    { key: 'sync_type', title: 'Type', sort: true },
    { key: 'sync_errors', title: 'Errors', sort: true },
    { key: 'next_run_time', title: 'Next', sort: false },
    { key: 'messages', title: 'Messages', sort: true },
  ];

  pagination = {
    limit: 10,
    offset: 0,
    count: null,
  };

  // Pie
  pie = [];
  view: any[] = [700, 300];
  label = 'Syncdaemon';
  activeEntries = [];
  colorScheme = { // BS light '#f9f9f9',
    domain: ['#5cb85c', '#5bc0de', '#428bca', '#d9534f', '#0c0c0c']
  };
  syncdaemonStatus = [];
  pieReady = false;

  next_run_time: Date;
  last_synced: Date;

  daemonStatus = false;
  workersStarted = false;

  constructor(
    private lungo: LungoIntegrationService,
    private alertService: NlfAlertService
  ) { }

  ngOnInit() {

    this.tableConfig = DefaultConfig;
    this.tableConfig.tableLayout.style = STYLE.TINY;
    this.tableConfig.tableLayout.hover = true;
    this.tableConfig.headerEnabled = true;
    this.tableConfig.detailsTemplate = true;
    this.tableConfig.showDetailsArrow = true;
    this.tableConfig.orderEnabled = true;

    this.getWorkers();
    this.getSyncdaemonStatus();

  }

  public uptime(value: number) {
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value - (hours * 3600)) / 60);
    const seconds: number = Math.floor(value - hours * 3600 - minutes * 60);
    return hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds'; // { hours: hours, minutes: minutes, seconds: seconds };
  }

  public refresh() {
    this.getWorkers();
    this.getStatus();
  }
  public getTableData(request) {

    return this.lungo.getWorkersStatus();
    //.pipe(
    //  map(response => response._items),
    // map((list: LungoSyncdaemonWorkersStatusItem[]) => this.applyPaging(request, list)),
    //);
  }

  eventEmitted($event) {
    // this.parseEvent($event);
    console.log($event);
  }

  getWorkers() {
    this.lungo.getWorkersStatus().subscribe(
      data => {
        this.workers = data._items;
        this.getStatus();
        this.pokk();
      },
      err => {
        this.alertService.error(err.message);
      },
      () => this.getTypesSyncdaemon()
    );
  }
  getStatus() {
    this.lungo.getIntegrationChangesStatus().subscribe(
      data => {
        this.status = data._items;

      },
      err => {
        this.alertService.error(err.message);
      },
      () => {
        this.dataReady = true;
        this.getTypesStatus();
        this.getEntityTypes();
      }
    );
  }
  pokk() {
    this.pop = 0;
    this.sync = 0;
    this.online = 0;
    this.msgs = 0;

    this.workers.forEach(element => {
      if (element.mode === 'populate') { this.pop++; }
      if (element.mode === 'sync') { this.sync++; }
      if (!!element.status) { this.online++; }
      this.msgs = this.msgs + element.messages;

      if (!this.next_run_time) {
        this.next_run_time = new Date(element.next_run_time);
      }

      if (!!element.next_run_time) {
        let ldate = new Date(element.next_run_time);
        if (ldate.getTime() < this.next_run_time.getTime()) {
          this.next_run_time = ldate;
        }
      }

    });
  }
  // PIE METHODS
  getTypesStatus() {
    const should = ['pending', 'error', 'finished', 'ready'];
    let has = [];
    this.pie = [];

    this.status.forEach(el => {
      this.pie.push({ name: el._id, value: el.count });
      has.push(el._id);
    });

    should.forEach(n => {
      if (has.indexOf(n) < 0) {
        this.pie.push({ name: n, value: 0 });
      }
    });

    this.pieReady = true;
  }

  getTypesWorkers() {
    this.workers.forEach(el => {
      this.pie.push({ 'name': el.id, 'value': el.name });
    });
  }

  getTypesSyncdaemon() {

    this.syncdaemonStatus = [
      { name: 'populate', value: this.pop },
      { name: 'sync', value: this.sync },
      { name: 'offline', value: this.workers.length - this.online },
    ];
    this.pieReady = true;
    // { name: 'online', value: this.online },


  }

  getEntityTypes() {

    this.lungo.getIntegrationChangesEntityTypes().subscribe(
      data => {
        this.entityTypes = [];
        data._items.forEach(el => {
          this.entityTypes.push({ name: el._id, value: el.count });
        });
      },
      err => {
        this.alertService.error(err.message);
      },
      () => this.entityTypesReady = true
    );
  }


  getSyncdaemonStatus() {
    this.lungo.getSyncdaemonStatus().subscribe(
      data => {
        if (data['status'] === true) {
          this.daemonStatus = true;
          this.lungo.getWorkersStatus().subscribe(
            status => {
              if (!!status['_error']) {
                this.workersStarted = false;
              }
            }
          );
        }
      },
      err => {

      }
    );
  }
  startWorkers() {

    this.lungo.startSyncdaemonWorkers().subscribe(
      data => {

      },
      err => {

      },
      () => this.getSyncdaemonStatus()
    );
  }

  rebootWorker(index) {
    this.lungo.rebootSyncdaemonWorker(index).subscribe(
      data => { },
      err => { },
      () => this.getSyncdaemonStatus()
    )
  }


}
