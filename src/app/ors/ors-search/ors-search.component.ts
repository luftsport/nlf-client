import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { ApiObservationsItem, ApiObservationsList, ApiOptionsInterface } from 'app/api/api.interface';
import { ApiEveQueryInterface } from 'app/api/api-eve.interface';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { debounce } from 'ts-debounce';
import { cleanObject } from 'app/interfaces/functions';
import { isEmpty } from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from "file-saver";
import { faDownload, faFilter, faLongArrowRight, faPlane, faSave, faPlus, faEdit, faClose, faRemove, faCalendar, faFolderOpen, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Columns, Config, STYLE } from 'ngx-easy-table';
import { DefaultTableConfig, TableEventObject } from 'app/interfaces/ngx-easy-table.interface';
import { QueryBuilderConfig, QueryBuilderClassNames } from 'ngx-angular-query-builder';
import { ApiDistinctService } from 'app/api/api-distinct.service';
import { ApiSearchService } from 'app/api/api-search.service';
import { concatMap } from 'rxjs-compat/operator/concatMap';
import { isEqual as _isEqual, isEmpty as _isEmpty } from 'lodash';
import { ConfirmService } from 'app/services/confirm/confirm.service';
import { SafePipe } from 'app/pipes/safe.pipe';
import { title } from 'process';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { NlfAlertService } from 'app/services/alert/alert.service';

/**
Save search is simple - save who and search query!
Run query as that person, save last run as list of id's!
On completed run check if any new ones not in list - voila!
sort: [{id:-1}]
**/
@Component({
  selector: 'nlf-ors-search',
  templateUrl: './ors-search.component.html',
  styleUrls: ['./ors-search.component.css']
})
export class NlfOrsSearchComponent implements OnInit {

  faSave = faSave;
  faFilter = faFilter;
  faDownload = faDownload;
  faPlane = faPlane;
  faLongArrowRight = faLongArrowRight;
  faPlus = faPlus;
  faEdit = faEdit;
  faClose = faClose;
  faRemove = faRemove;
  faCalendar = faCalendar;
  faFolderOpen = faFolderOpen;
  faSearch = faSearch;

  dataReady = false;
  err = false;
  searching = false;
  public query: ApiEveQueryInterface = { where: {} };
  public activity: string;
  public text: string;
  public result: ApiObservationsList; //ApiObservationsItem[];

  exportData: any;

  public filterUseOr = false;

  tableConf: Config;
  public columns: Columns[] = [
    { key: 'value', title: 'Value Title' },
  ];

  // Pagination settings
  pagination = {
    limit: 10,
    offset: 0,
    count: null,
  };

  // Initial table sort
  sort: Array<Object> = [{ 'id': -1 }];
  sortAlternatives: Object = {
    '&#8595; id': [{ 'id': -1 }],
    '&#8593; id': [{ 'id': 1 }],
    '&#8595; når': [{ 'when': -1 }],
    '&#8593; når': [{ 'when': 1 }],
    '&#8595; alvorlighetsgrad': [{ 'rating._rating': -1 }],
    '&#8593; alvorlighetsgrad': [{ 'rating._rating': 1 }]
  };
  modalRef;
  previewModalIndex;

  /*public filter = {
    callsign: { value: undefined, path: "aircrafts.aircraft.callsign" },
  };*/
  public filter: any;


  public filterTableConfig = {
    "id": undefined
  }
  public filterOperator = '$or';

  // Holder oversikten i menyen
  public filterSections: Array<Object>;
  // holder array of filter configs fra modalFilterConfig
  public filterConfig: any; //Array<object>;
  public filterRules = {
    condition: 'and',
    sections: {}
  };

  // Loaded search from api
  public loadedApiSearchItem: any;
  public loadedApiSearchList: any;

  public newFilter = {
    title: undefined,
    notifications: true
  }

  // Modal
  public modalFilterRef;
  public modalFilterSection: string;
  public modalFilterConfig: QueryBuilderConfig;
  public modalFilterRules = {
    condition: 'and',
    rules: []
  }

  _query = {
    condition: 'and',
    stuff: true,
    rules: [
      //{ field: 'age', operator: '>', mapping: { mapOperator: 'age2date', mapTo: 'involved.data.birth_date' } },
      //{ field: 'involved.data.birth_date'},
      { field: "involved.data.competences.type_id", operator: 'in' },
      { field: 'type', operator: '=', value: 'incident' },
      //{ field: 'injury', operator: '=' }
    ]
  };

  config: QueryBuilderConfig = {
    /** How to??
    calculateFieldChangeValue: (a,b,c) => {
      console.log('Calculate', a, b, c);
    }, */
    fields: {
      "involved.data.birth_date": {
        name: 'Fødselsdato',
        type: 'date'
      },
      //age: { name: 'Age', type: 'number' },
      "involved.data.competences.type_id": {
        name: 'Kompetanser',
        type: 'category',
        options: [
        ]
      },
      type: {
        name: 'Type',
        type: 'category',
        options: [
          { name: 'Erfaringsdeling', value: 'sharing' },
          { name: 'Uønsket', value: 'unwanted_act' },
          { name: 'Næruhell', value: 'near_miss' },
          { name: 'Uhell', value: 'incident' },
          { name: 'Ulykke', value: 'accident' },
        ]
      },
      //injury: {
      //  name: 'Personskade',
      //  type: 'boolean'
      //}
    }
  }

  converter = {
    '=': '$eq',
    '!=': '$ne',
    '>': '$gt',
    '>=': '$gte',
    '<': '$lt',
    '<=': '$lte',
    'in': '$in',
    'not in': '$nin',
    'or': '$or',
    'and': '$and'
  }

  inverseOperators = {
    '$ne': '$eq',
    '$eq': '$ne',
    '$lt': '$gt',
    '$lte': '$gte',
    '$gt': '$lt',
    '$gte': '$lte',
    '$nin': '$in',
    '$in': '$nin',
    '$and': '$or',
    '$or': '$and'
  }

  classNames: QueryBuilderClassNames = {
    removeIcon: "fa fa-minus",
    addIcon: "fa fa-plus",
    arrowIcon: "fa fa-chevron-right px-2",
    button: "btn",
    buttonGroup: "btn-group",
    rightAlign: "order-12 ml-auto",
    switchRow: "d-flex px-2",
    switchGroup: "d-flex align-items-center",
    switchRadio: "custom-control-input",
    switchLabel: "custom-control-label",
    switchControl: "custom-control custom-radio custom-control-inline",
    row: "row p-2 m-1",
    rule: "border",
    ruleSet: "border",
    invalidRuleSet: "alert alert-danger",
    emptyWarning: "text-danger mx-auto",
    operatorControl: "form-control",
    operatorControlSize: "col-auto pr-0",
    fieldControl: "form-control",
    fieldControlSize: "col-auto pr-0",
    entityControl: "form-control",
    entityControlSize: "col-auto pr-0",
    inputControl: "form-control",
    inputControlSize: "col-auto"
  };

  /**
   *   public defaultOperatorMap: { [key: string]: string[] } = {
    string: ['=', '!=', 'contains', 'like'],
    number: ['=', '!=', '>', '>=', '<', '<='],
    time: ['=', '!=', '>', '>=', '<', '<='],
    date: ['=', '!=', '>', '>=', '<', '<='],
    category: ['=', '!=', 'in', 'not in'],
    boolean: ['=']
  };
   */


  debouncedUpdate = debounce(this.update, 1000);

  constructor(
    // private fieldDistinctValues: ApiDistinctService,
    private searchApi: ApiSearchService,
    private route: ActivatedRoute,
    private router: Router,
    private orsService: ApiObservationsService,
    private modalService: NgbModal,
    private confirmService: ConfirmService,
    private alertService: NlfAlertService
  ) {



  }
  ngOnInit() {
    this.tableConf = DefaultTableConfig;
    this.tableConf.tableLayout.style = STYLE.TINY;
    this.tableConf.headerEnabled = false;

    // Get filter definitions for collection
    this.searchApi.getFilterSections('fallskjerm_observations').subscribe(
      data => {
        this.filterSections = data['_items'];
      },
      err => console.log('[ERR] could not get config'),
      () => { }
    );

    // Get activity from url router rule
    this.route.params.subscribe(params => {
      if (!this.activity) {
        if (params.hasOwnProperty('activity') && params['activity'] != "undefined") {
          this.activity = params['activity'] ? params['activity'] : 'fallskjerm';
          this.orsService.setActivity(this.activity);
        }
      }

      // Get ruleset from url
      // @TODO: rewrite to rule based
      this.route.queryParams.subscribe(
        params => {
          // console.log('Params', params);
          // console.log('Were', params['where']);
          if (isEmpty(this.query.where) && !!params['where']) {
            this.query.where = JSON.parse(params['where']);  //JSON.parse('"[' + params['where'] + ']"');

            for (let key in this.query.where) {
              if (key === '$text') {
                this.text = this.query.where['$text']['$search'];
              }
              else if (key === '$or' || key === '$and') {
                for (let seg of this.query.where[key]) {
                  for (let k in seg) {
                    this.filter[k] = seg[k];
                  }
                }
              }
              else {
                this.filter[key] = this.query.where[key];
              }
            }

            this.debouncedUpdate();
          }


          //this.query = queryParams; //JSON.parse(queryParams);
        });
    }
    );

    this.debouncedUpdate();
  }

  public fieldChange(event) {
    console.log(event);
  }

  public getQuery() {
    let tmp = {};
    for (let key in this.query) {
      tmp[key] = JSON.stringify(this.query[key]);
    }
    return tmp;
  }

  public reset() {
    this.text = undefined;
    this.loadedApiSearchItem = undefined;
    for (let key in this.filter) {
      this.filter[key] = undefined;
    }
    for (let key in this.query) {
      this.query[key] = {};
    }

    // Remove all values for every section
    Object.keys(this.filterRules.sections).forEach((section) => {
      this.filterRules.sections[section].rules = this.filterRules.sections[section].rules.map(o => ({ ...o, value: undefined }));
    });

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {},
      });
    this.update();
  }

  private getModalSectionFilterDefinition(section) {

    this.searchApi.getFilterDefinition('fallskjerm_observations', section).subscribe(
      data => {
        this.modalFilterConfig = data['definition']; //.get('_items', data)
        if (this.filterRules.sections.hasOwnProperty(this.modalFilterSection)) {
          this.modalFilterRules = this.filterRules.sections[this.modalFilterSection];
        } else {
          this.modalFilterRules = data['default'];
        }
      },
      err => console.log('[ERR] could not get config'),
      () => { }
    );
  }
  public getNumFilters(section) {
    //console.log('LENGTH!!!!', this._query.rules.filter((obj) => !!obj.value).length);
    try {
      return this.filterRules.sections[section].rules.filter((obj) => !!obj.value).length;
    } catch { }
    return 0
  }

  /**
   * CRUD filter rules:
   * Load saved search, edit and save or create new
   * close loaded search - also on 
   */
  public create() {
    let rules = this.cleanFilterSectionRules(this.filterRules);
    /**
     * 'title': {'type': 'string'},
           'query': {'type': 'dict'}, #where sort page
           'meta': {'type': 'dict'},
           'owner': {'type': 'int'},
           'acl': acl_item_schema,
     */
    const payload = {
      title: this.newFilter?.title || this.text,
      notifications: this.newFilter?.notifications || false,
      rules: this.cleanFilterSectionRules(this.filterRules),
      text: this.text,
      options: {
        page: this.pagination.offset,
        max_results: this.pagination.limit,
        sort: this.sort,
        //version: this.query?.version
        /**
         *          page: this.pagination.offset,
        max_results: this.pagination.limit,
        sort: this.sort,*/
      },
      collection: 'fallskjerm_observations',
      meta: {
        results: {
          when: new Date(),
          num: this.result?._meta.total || 0,
          ids: []
        }
      }
    }
    // can also store empty rule sets to use other search infrastructure 
    this.searchApi.create(payload).subscribe(
      data => {
        // console.log('Created', data);
        this.loadedApiSearchItem = { ...payload, ...data };
        this.alertService.success('Søket ble opprettet og lagret', false, true, 10);
        this.modalRef.close();
      },
      err => {
        console.log('[ERR] could not create search');
        this.alertService.error('Kunne ikke opprette og lagre søket: ' + err);
      },
      () => { }
    );
  }

  public save() {
    this.loadedApiSearchItem['rules'] = this.cleanFilterSectionRules(this.filterRules);

    const payload = {
      title: this.newFilter?.title || this.text,
      rules: this.cleanFilterSectionRules(this.loadedApiSearchItem['rules']),
      text: this.text,
      options: {
        page: this.pagination.offset,
        max_results: this.pagination.limit,
        sort: this.sort,
      },
      meta: {
        results: {
          when: new Date(),
          num: this.result?._meta.total || 0,
          ids: []
        }
      }
    }

    this.searchApi.save(this.loadedApiSearchItem['_id'], payload, this.loadedApiSearchItem['_etag']).subscribe(
      data => {
        // console.log('Saved', data);
        this.loadedApiSearchItem = { ...payload, ...data };
        this.alertService.success('Søket ble lagret', false, true, 10);
      },
      err => {
        console.log('[ERR] could not save search');
        this.alertService.error('Kunne ikke lagre søket: ' + err);
      },
      () => { }
    );

  }

  public delete(_id, title, _etag) {
    const confirmMsg = {
      title: 'Please confirm',
      message: 'Are you sure you want to delete ' + title + ' ?',
      yes: 'Delete',
      no: 'Cancel'
    };
    this.confirmService.confirm(confirmMsg).then(
      () => { // Yes
        this.searchApi.remove(_id, _etag).subscribe(
          data => {
            //console.log('DELETED', data);
            try {
              if (_id == this.loadedApiSearchItem._id) {
                this.loadedApiSearchItem = undefined;
              }
            } catch (e) { }
            this.alertService.success('Søket ble slettet', false, true, 10);
            this.getSearches();
          },
          err => {
            console.log('[ERR] could not save search');
            this.alertService.error('Kunne ikke slette søket: ' + err);
          },
          () => { }
        )
      },
      () => { // No
        // Do nothing?
      }
    );
  }

  public loadSavedSearch(search) {
    try {
      this.loadedApiSearchItem = search;
      this.alertService.success('Lagret søk ' + search['title'] + ' ble lastet inn', false, true, 10);
    } catch (err) {
      this.loadedApiSearchItem = undefined;
      this.alertService.error('Lagret søk feilet under innlasting: ' + err);
    }
  }

  public getSearches() {

    let options: ApiOptionsInterface = {
      query: {
        where: {collection: 'fallskjerm_observations'},
        //page: this.pagination.offset,
        //max_results: this.pagination.limit,
        sort: [{ _updated: -1 }]
      }
    }
    this.searchApi.getSearches(options).subscribe(
      data => {
        //console.log('Searches', data);
        this.loadedApiSearchList = data;
      },
      err => console.log('[ERR] could not get list of searches'),
      () => { }
    );
  }

  public getIncident(components) {
    return components.find(component => component.flags.incident === true) || '?';
  }

  public onChange(event) {

    let t = {};
    this._query.rules.forEach(ele => {
      //let t = {ele.field: {converter[ele.operator]: ele.value}};
      if (!!ele.value) {
        t[ele.field] = {};
        t[ele.field][this.converter[ele.operator]] = ele.value;
        //this.query.where = {...this.query.where, ...t};
      }
    });
    this.query.where = { ...this.query.where, ...t };
    this.debouncedUpdate();
  }

  private _calculateAge(years, today = new Date()) {
    return new Date(today.getFullYear() - years, today.getMonth(), today.getDay());
  }

  public useOr(event) {
    this.filterUseOr = !this.filterUseOr;
    if (this.filterUseOr === true) {
      this.filterRules.condition = '$or';
    } else {
      this.filterRules.condition = '$and';
    }
    this.update();
  }

  public isSort(value) {

    if (JSON.stringify(this.sort) === JSON.stringify(value)) {
      return true;
    }

    return false;
  }

  private update(template = false) {
    // console.log(JSON.stringify(this.sort), this.sort.toString());
    // console.log("my object: %o", this.sort);
    // console.log(Object.keys(this.sort));
    this._buildQuery();
    this.searching = true;
    let options: ApiOptionsInterface = {
      query: {
        where: {},
        page: this.pagination.offset,
        max_results: this.pagination.limit,
        sort: this.sort,
      }
    }

    options.query.where = this.query.where; //this.getQueryObject();

    if (!!this.text && this.text.replace(/\W/g, "") != "") {
      options.query.where['$text'] = { $search: this.text };

    }

    this.result = undefined;
    this.dataReady = false;
    this.orsService.getObservations(options).subscribe(
      data => {
        this.err = false;
        this.result = data;
        this.pagination.count = data._meta.total; // this is for pagination
        this.pagination = { ...this.pagination }; // Need to create new object to make change-detection work
      },
      err => {
        this.err = true;
      },
      () => {
        this.dataReady = true;
        // Set url
        /** this.router.navigate(
           [],
           {
             relativeTo: this.route,
             queryParams: this.getQuery(),
             skipLocationChange: false
             //queryParamsHandling: "merge"
           });*/
        this.searching = false;

        if (!!template) {
          this.openPreviewModal(template, 0);
        }
      }
    );
  }

  public nextPage(page) {
    let obj: TableEventObject = {
      value: {
        limit: this.pagination.limit,
        page: page
      },
      event: 'onPagination'
    };

    this.parseEvent(obj);
  }

  public parseEvent(obj: TableEventObject) {

    if (obj.event === 'onPagination') {
      this.pagination.limit = obj.value.limit ? obj.value.limit : this.pagination.limit;
      this.pagination.offset = obj.value.page ? obj.value.page : this.pagination.offset;
      this.pagination = { ...this.pagination };
      this.update();
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
      this.update();
    }

  }

  openPreviewModal(template, index) {
    this.previewModalIndex = index;
    this.openModal(template);
  }


  public cleanFilterSectionRules(filter) {

    Object.keys(filter.sections).forEach((section) => {
      filter.sections[section].rules = filter.sections[section].rules.filter((o) => !!o.value);
    });

    return filter;

  }

  openModal(template) {

    this.modalRef = this.modalService.open(template, { size: 'xl', fullscreen: 'xl' });
  }

  public getFilterSectionLabel(section) {
    try {
      return this.filterSections.find(obj => obj['section'] === section)['label'];
    }
    catch (e) {
      return 'Ukjent'
    }

  }

  public openFilterModal(template, section) {
    this.modalFilterSection = section;
    this.getModalSectionFilterDefinition(section);
    this.modalFilterRef = this.modalService.open(template, { size: 'xl', fullscreen: 'xl' });
  }

  public closeFilterModal() {
    this.modalFilterSection = undefined;
    //this.modalFilterRules = undefined;
    this.modalFilterConfig = undefined;
    this.modalFilterRef.close();
    //this.debouncedUpdate();
  }



  private _buildQuery() {
    let __query = [];

    Object.keys(this.filterRules.sections).forEach((section, i1) => {
      if (this.filterRules.sections[section]?.rules.length > 0) {
        let t = {};
        this.filterRules.sections[section].rules.forEach((rule, i2) => {
          if (!!rule.value) { //

            if (!t.hasOwnProperty(rule.field)) {

              t[rule.field] = {};
            }
            // console.log('RULE', rule);

            // ngbDate
            if (['when'].indexOf(rule.field) > -1) {
              if (Object.keys(t[rule.field]).length > 0) {
                // console.log('When MULTI', this.converter[rule.operator], rule.value);
                let tmp1 = {};
                tmp1 = rule.value.year + '-' + String(rule.value.month).padStart(2, '0') + '-' + String(rule.value.day).padStart(2, '0') + 'T00:00:00.00000Z';
                t[rule.field][this.converter[rule.operator]] = { ...t[rule.field][this.converter[rule.operator]], ...tmp1 };
              } else {
                // console.log('When first', this.converter[rule.operator], rule.value);
                t[rule.field][this.converter[rule.operator]] = rule.value.year + '-' + String(rule.value.month).padStart(2, '0') + '-' + String(rule.value.day).padStart(2, '0') + 'T00:00:00.00000Z';
              }
            } else {
              if (Object.keys(t[rule.field]).length > 0) {
                // console.log('Ordinary multiple fields', rule.field);
                let tmp2 = {};
                tmp2 = rule.value;
                t[rule.field][this.converter[rule.operator]] = { ...t[rule.field][this.converter[rule.operator]], ...tmp2 };
              } else {
                // console.log('RULE IN and t is before', t)
                t[rule.field][this.converter[rule.operator]] = rule.value;
              }
            }

            //this.query.where = {...this.query.where, ...t};
          }
        });

        // If OR
        if (this.filterRules.sections[section].condition == 'or') {
          //t = {'$or': [t]};
          let t2 = [];
          Object.entries(t).forEach((key) => {
            // console.log('t2', key);
            //t2.push({})
            let tmp = {};
            tmp[key[0]] = key[1];
            if (!_isEmpty(tmp)) {
              t2.push(tmp);
            }
          })
          __query.push({ '$or': t2 });
        } else if (!_isEmpty(t)) {
          __query.push(t);
        }
      }
    });

    // console.log('QUERY:', __query);
    // console.log('Filter done:', this.filterRules);
    if (!_isEmpty(__query)) {
      if (this.filterRules.condition === '$or') {
        this.query.where = { '$or': __query };
      } else {
        this.query.where = { '$and': __query };
      }
    } else {
      this.query.where = {};
    }

  }

  public export(format) {
    this._buildQuery();
    let options: ApiOptionsInterface = {
      query: {
        where: {},
        max_results: 50000,
        sort: this.sort,
        export: 'csv'
      }
    }

    options.query.where = this.query.where; //this.getQueryObject();

    // ...this.query.where, 
    if (!!this.text && this.text.replace(/\W/g, "") != "") {
      options.query.where['$text'] = { $search: this.text };
    }

    this.orsService.getObservations(options).subscribe(
      data => {
        // console.log(data['_export']);
        return saveAs(new Blob([data['_export']], { type: 'text/plain;charset=utf-8' }), 'results.csv');
      },
      err => { },
      () => { }
    );
  }

  public onModalFilterChange() {

    this.filterRules.sections[this.modalFilterSection] = this.modalFilterRules;

    this.debouncedUpdate();

    // Iterate all sections and then if and or or it in the end!!
  }


}
