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

/**
Save search is simple - save who and search query!
Run query as that person, save last run as list of id's!
On completed run check if any new ones not in list - voila!
**/
@Component({
  selector: 'nlf-ors-sportsfly-search',
  templateUrl: './ors-sportsfly-search.component.html',
  styleUrls: ['./ors-sportsfly-search.component.css']
})
export class NlfOrsSportsflySearchComponent implements OnInit {

  dataReady = false;
  searching = false;
  public query: ApiEveQueryInterface = { where: {} };
  public activity = 'sportsfly';
  public text: string;
  public result: ApiObservationsList; //ApiObservationsItem[];

  modalRef;
  /*public filter = {
    callsign: { value: undefined, path: "aircrafts.aircraft.callsign" },
  };*/
  public filter = {
    "aircrafts.aircraft.callsign": undefined,
    "aircrafts.flight.from.icao": undefined,
    "aircrafts.flight.to.icao": undefined
  }
  public filterOperator = '$or';


  debouncedUpdate = debounce(this.update, 1000);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orsService: ApiObservationsService,
    private modalService: NgbModal
  ) {
    this.orsService.setActivity(this.activity);

    this.route.queryParams.subscribe(
      params => {
        // console.log('Params', params);
        // console.log('Were', params['where']);
        if (isEmpty(this.query.where) && !!params['where']) {
          this.query.where = JSON.parse(params['where']);  //JSON.parse('"[' + params['where'] + ']"');

          for (let key in this.query.where) {
            if (key === '$text') {
              this.text = this.query.where['$text']['$search'];
              console.log('Text', this.text);
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

          this.update();
        }
        //this.query = queryParams; //JSON.parse(queryParams);
      });
  }
  ngOnInit() {
    this.update();
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
    for (let key in this.filter) {
      this.filter[key] = undefined;
    }
    for (let key in this.query) {
      this.query[key] = {};
    }
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {},
      });
    this.update();
  }


  private update() {
    this.searching = true;
    let options: ApiOptionsInterface = {
      query: {
        where: {},
      }
    }


    if (!!this.text && this.text.replace(/\W/g, "") != "") {
      options.query.where = { ...options.query.where, ...this.query.where, ...{ $text: { $search: this.text } } };
    } else if (!!this.query.where && this.query.where.hasOwnProperty('$text')) {
      delete this.query.where['$text'];
      options.query.where = { ...options.query.where, ...this.query.where };
    }

    this.filter['aircrafts.flight.to.icao'] = this.filter['aircrafts.flight.from.icao'];
    options.query.where['$or'] = [];
    for (let key in this.filter) {
      //options.query.where[this.filter[key]['path']] = this.filter[key]['value'];
      if (!!this.filter[key] && this.filter[key].length > 0) {
        if (this.filter[key].lastIndexOf('+', 0) === 0) {
          options.query.where[key] = this.filter[key].slice(1);
        } else if (this.filter[key].length > 0) {
          options.query.where['$or'].push({ [key]: this.filter[key] });
        }
      }
    }

    this.query = cleanObject(options.query, true);
    console.log('Cleaned before', cleanObject(options.query, true));

    this.orsService.getObservations(cleanObject(options)).subscribe(
      data => {
        this.result = data;
      },
      err => { },
      () => {
        this.dataReady = true;
        // Set url
        this.router.navigate(
          [],
          {
            relativeTo: this.route,
            queryParams: this.getQuery(),
            //queryParamsHandling: "merge"
          });
        this.searching = false;
      }
    );
  }
  public exportTojson() {
    let exportData = this.result || []; // or only ._items?
    // exportData is your array which you want to dowanload as json and sample.json is your file name, customize the below lines as per your need.
    return saveAs(
      new Blob([JSON.stringify(exportData, null, 2)], { type: 'JSON' }),
      'query.json'
    );
  }
  openModal(template) {

    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }


}
