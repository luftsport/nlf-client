import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultTableConfig, TableEventObject } from 'app/interfaces/ngx-easy-table.interface';
import { Columns, Config, STYLE } from 'ngx-easy-table';
import { ApiOptionsInterface, ApiObservationsList } from 'app/api/api.interface';
import { ApiObservationsAggService } from 'app/api/api-observations-agg.service';
import { LungoPersonsService } from 'app/api/lungo-persons.service';
import { LungoPersonsItem, LungoPaymentsItem } from 'app/api/lungo.interface';
import { LungoPaymentsService } from 'app/api/lungo-payments.service';
import { checkExpiry, checkExpiryYear } from 'app/interfaces/functions';
import { faUsers, faSave, faTable, faSearch, faSpinner, faCheck, faRemove } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-fallskjerm-obsreg-user',
  templateUrl: './fallskjerm-obsreg-user.component.html',
  styleUrls: ['./fallskjerm-obsreg-user.component.css']
})
export class NlfFallskjermObsregUserComponent implements OnInit {

  person_id: number;
  person: LungoPersonsItem;
  dataReady = false;
  activity = 'fallskjerm';
  reports = [];

  checkExpiry = checkExpiry;
  checkExpiryYear = checkExpiryYear;

  faUsers = faUsers;
  faSave = faSave;
  faTable = faTable;
  faSearch = faSearch;
  faSpinner = faSpinner;
  faCheck = faCheck;
  faRemove = faRemove;


  fallskjermLicenses = [];

  tableConf: Config;
  public columns: Columns[] = [
    { key: 'id', title: 'ID' },
    { key: 'tags', title: 'Tittel' },
    //{ key: 'involved', title: 'Involverte' },
    { key: 'when', title: 'Når' },
    { key: 'location.name', title: 'Sted' },
    { key: 'discipline', title: 'Klubb' },
    { key: 'rating._rating', title: 'Rating' },
  ];

  pagination = {
    limit: 10,
    offset: 0,
    count: null,
  };

  data: ApiObservationsList;

  // Initial table sort
  sort: Array<Object> = [{ when: -1 }];


  constructor(
    private aggService: ApiObservationsAggService,
    private route: ActivatedRoute,
    private personsService: LungoPersonsService,
    private paymentsService: LungoPaymentsService
  ) { }

  ngOnInit(): void {
    this.tableConf = DefaultTableConfig;
    this.tableConf.tableLayout.style = STYLE.TINY;
    this.tableConf.headerEnabled = true;

    this.aggService.setActivity('fallskjerm');

    this.route.params.subscribe(

      params => {
        this.person_id = params['person_id'];
        this.getUser();
        this.getData();
      }
    );
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

  private getLicenseFromPayment(person_id) {

    const options: ApiOptionsInterface = {
      query: {
        where: {
          person_id: person_id,
          product_type_id: 23,
          paid_date: { $gte: (new Date().getFullYear() - 1) + '-11-01T00:00:00.000000Z' }
        },
        //projection: { id: 1, _id: 1, name: 1 },
        max_results: 250,
        sort: [{ name: 1 }]
      }
    };

    this.paymentsService.getPayments(options).subscribe(
      (data) => {
        this.fallskjermLicenses = data._items;

      },
      err => { console.log(err) },
      () => { }
    )

  }

  private getUser() {
    this.personsService.getUser(this.person_id).subscribe(
      data => {
        this.person = data;
        if (this.person.activities.includes(109)) {
          this.getLicenseFromPayment(this.person_id);
        }
      },
      err => console.log(err),
      () => { }
    );

  }

  private getData() {
    const options: ApiOptionsInterface = {
      query: {
        page: this.pagination.offset,
        max_results: this.pagination.limit,
        sort: this.sort,
      },
    };

    this.aggService.getUserReports(this.person_id, options).subscribe(
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
