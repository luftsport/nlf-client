import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiObservationsAggService } from 'app/api/api-observations-agg.service';
import { ApiOptionsInterface, NlfConfigItem } from 'app/api/api.interface';
import { NlfConfigService } from 'app/nlf-config.service';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { forkJoin, pipe, from } from 'rxjs';
import { map, mergeMap, reduce, delay } from 'rxjs/operators';

@Component({
  selector: 'nlf-ors-fallskjerm-dashboard',
  templateUrl: './ors-fallskjerm-dashboard.component.html',
  styleUrls: ['./ors-fallskjerm-dashboard.component.css']
})
export class NlfOrsFallskjermDashboardComponent implements OnInit {

  dataReady = false;
  discipline_id: number;

  pieTypes = [];
  pieTypesReady = false;
  pieTypesLabel = 'behandlede';
  pieStates = [];
  pieStatesReady = false;
  pieStatesLabel = 'opprettede';

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;
  firstDayOfYear: Date;

  current_year; number;
  view: any[] = [700, 300];

  d1: Date;
  d2: Date;
  config;
  dateRangeReady = false;
  dateRange: Date[];

  quarts = [];

  stats = {};
  statsReady = false;

  colorScheme = { // BS light '#f9f9f9',
    domain: ['#5cb85c', '#5bc0de', '#428bca', '#d9534f', '#0c0c0c']
  };
  sub;

  constructor(
    private route: ActivatedRoute,
    private agg: ApiObservationsAggService,
    private configService: NlfConfigService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {


    this.agg.setActivity('fallskjerm');

    this.sub = this.route.params.subscribe(
      params => {
        this.discipline_id = params['id'] ? +params['id'] : -1;

        this.configService.observableConfig.subscribe(
          data => {
            this.config = data;
            const d = new Date();
            this.current_year = d.getFullYear();

            // Calendar
            //this.fromDate = { year: d.getFullYear(), month: 1, day: 1 };

            //this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
            //this.firstDayOfYear= new Date(new Date().getFullYear(), 0, 1);
            this.resetDate();

          }
        );

      });

  }

  ngOnInit() {
    this.setQuarters();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public isDataReady(): boolean {

    if (this.pieStatesReady && this.pieTypesReady) {
      return true;
    }

    return false;
  }

  public resetDate() {
    this.fromDate = { year: 2015, month: 1, day: 1, equals: undefined, after: undefined, before: undefined };
    this.toDate = this.calendar.getToday();
    this.setAsDate();
  }

  private setQuarters() {

    for (let i = 0; i < 6; i++) {
      let _to = moment().subtract(i, 'quarter').endOf('quarter');

      this.quarts.push({ label: _to.year() + '-Q' + (_to.month() + 1) / 3, from: moment().subtract(i + 1, 'quarter').startOf('quarter'), to: _to });
    }

    console.log('Quarts:', this.quarts);


  }

  public setDatesFromQuarter(quarter) {

    this.fromDate = { year: quarter.from.year(), month: quarter.from.month(), day: quarter.from.day(), equals: undefined, after: undefined, before: undefined };
    this.toDate = { year: quarter.to.year(), month: quarter.to.month(), day: quarter.to.day(), equals: undefined, after: undefined, before: undefined };
    this.setAsDate();
  }

  private setAsDate() {
    this.dateRangeReady = false;
    this.d1 = new Date(this.fromDate['year'], this.fromDate['month'], this.fromDate['day']);
    this.d2 = new Date(this.toDate['year'], this.toDate['month'], this.toDate['day']);
    this.dateRange = [this.d1, this.d2];
    this.dateRangeReady = true;
    this.doShit();
  }
  // calendar
  public onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    this.setAsDate();
  }



  public isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  public isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  public isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }


  doShit() {

    forkJoin(
      this._getTypesPie(),
      this._getStatesPie()
    ).subscribe(

      data => {
        console.log('DATA', data);
        this.pieTypes = [];
        //this.pieTypes = data[0]._items.map(el => ({ name: this.config.fallskjerm.observation.types[el._id]['label'], value: el.count, type: el._id }));
        //this.pieTypesReady = true;

        this.pieStates = [];
        //this.pieStates = data[1]._items.map(el => [{ name: this.config.fallskjerm.observation.state[el._id]['label'], value: el.count, state: el._id }));
        //this.pieStatesReady = true;
        this.pieTypes = data[0]._items.map(el => ({ name: this.config.fallskjerm.observation.types[el._id]['label'], value: el.count, type: el._id }));
        this.pieStates = data[1]._items.map(elm => ({ name: this.config.fallskjerm.observation.state[elm._id]['label'], value: elm.count, state: elm._id }));

        const a = this.pieTypes.reduce(
          (accumulator, type) => {
            return accumulator + type.value;
          }, 0);
        const b = this.pieTypes.reduce(
          (accumulator, type) => {
            if (['accident', 'incident'].indexOf(type.type) > -1) {
              console.log('HEI!');
              return accumulator + type.value;
            }
          }, 0);

        const c = this.pieStates.reduce(
          (accumulator, state) => {
            if (['closed', 'withdrawn'].indexOf(state.state) < 0) {
              return accumulator + state.value;
            }
          }, 0);

        this.stats = {
          total_ors: a,
          total_injury: b,
          total_processing: c
        };
        delay(1000);
        this.pieTypesReady = true;
        this.pieStatesReady = true;

        /**
        forkJoin(
          //this.pieTypes,
          //this.pieStates
        _types,
        _states
      ).subscribe(
          data2 => {
            this.pieTypes = data2[0];
            this.pieStates = data2[1];
            this.pieTypesReady = true;
            this.pieStatesReady = true;
            console.log('DADADADA', data2, this.pieTypes, this.pieStates);

            this.stats = {
              total_ors: this.pieTypes.reduce(
                (accumulator, type) => {
                  return accumulator + type.value;
                }, 0),
              total_injury: this.pieTypes.reduce(
                (accumulator, type) => {
                  if (['accident', 'incident'].indexOf(type.type) > -1) {
                    return accumulator + type.value;
                  }
                }, 0),
              total_processing: this.pieStates.reduce(
                (accumulator, state) => {
                  if (['closed', 'withdrawn'].indexOf(state.state) < 0) {
                    return accumulator + state.value;
                  }
                }, 0)
            };

          },
          err => console.log('Piefork ERR', err),
          () => { }
        ) **/
      },
      err => console.log('API piefork ERR', err),
      () => console.log('Done')
    );

  }

  doShitLEGACYWORKS() {

    forkJoin(
      this._getTypesPie(),
      this._getStatesPie()
    ).subscribe(

      data => {

        this.pieTypes = [];
        //this.pieTypes = data[0]._items.map(el => ({ name: this.config.fallskjerm.observation.types[el._id]['label'], value: el.count, type: el._id }));
        //this.pieTypesReady = true;

        this.pieStates = [];
        //this.pieStates = data[1]._items.map(el => [{ name: this.config.fallskjerm.observation.state[el._id]['label'], value: el.count, state: el._id }));
        //this.pieStatesReady = true;

        forkJoin(
          //this.pieTypes,
          //this.pieStates
          this.pieTypes = data[0]._items.map(el => ({ name: this.config.fallskjerm.observation.types[el._id]['label'], value: el.count, type: el._id })),
          this.pieStates = data[1]._items.map(el => ({ name: this.config.fallskjerm.observation.state[el._id]['label'], value: el.count, state: el._id }))
        ).subscribe(
          data2 => {
            //this.pieTypes = data2[0];
            //this.pieStates = data2[1];
            this.pieTypesReady = true;
            this.pieStatesReady = true;
            console.log('DADADADA', data2);
            this.stats = {
              total_ors: this.pieTypes.reduce(
                (accumulator, type) => {
                  return accumulator + type.value;
                }, 0),
              total_injury: this.pieTypes.reduce(
                (accumulator, type) => {
                  if (['accident', 'incident'].indexOf(type.type) > -1) {
                    return accumulator + type.value;
                  }
                }, 0),
              total_processing: this.pieStates.reduce(
                (accumulator, state) => {
                  if (['closed', 'withdrawn'].indexOf(state.state) < 0) {
                    return accumulator + state.value;
                  }
                }, 0)
            };
            /**
            forkJoin(
              this.pieTypes.reduce(
                (accumulator, type) => {
                  return accumulator + type.value;
                }, 0).pipe(),
              this.pieTypes.reduce(
                (accumulator, type) => {
                  if (['accident', 'incident'].indexOf(type.type) > -1) {
                    return accumulator + type.value;
                  }
                }, 0).pipe(),
              this.pieStates.reduce(
                (accumulator, state) => {
                  if (['closed', 'withdrawn'].indexOf(state.state) < 0) {
                    return accumulator + state.value;
                  }
                }, 0).pipe()

            )
              .subscribe(

                data => {
                  this.stats = { total_ors: data[0], total_injury: data[1], total_processing: data[2] };
                },
                err => console.log('Reduce ERR', err),
                () => { }

              );
              **/
          },
          err => console.log('Piefork ERR', err),
          () => { }
        )
      },
      err => console.log('API piefork ERR', err),
      () => console.log('Done')
    );

  }


  _getTypesPie() {
    this.pieTypesReady = false;
    let options: ApiOptionsInterface = {
      query: {
        aggregate: {
          $from: this.d1.toISOString(),
          $to: this.d2.toISOString(),
          $discipline: this.discipline_id,
          $state: 'closed'
        }
      }
    };

    return this.agg.getTypesDiscipline(options);
  }

  _getStatesPie() {
    this.pieStatesReady = false;

    let options: ApiOptionsInterface = {
      query: {
        aggregate: {
          $from: this.d1.toISOString(),
          $to: this.d2.toISOString(),
          $discipline: this.discipline_id
        }
      }
    };

    return this.agg.getStatesDiscipline(options);
  }

  getStatInjuryOrs() {
    const totalORS = this.pieTypes.reduce(
      (accumulator, type) => {
        return accumulator + type.value;
      }, 0);
    const totalInjuryORS = this.pieTypes.reduce(
      (accumulator, type) => {
        if (['accident', 'incident'].indexOf(type.type) > -1) {
          return accumulator + type.value;
        }
      }, 0);

    return Math.round((totalInjuryORS / totalORS) * 100);

  }

  getStatProcessedOrs() {
    const totalORS = this.pieStates.reduce(
      (accumulator, type) => {
        return accumulator + type.value;
      }, 0);
    const val = this.pieStates.reduce(
      (accumulator, state) => {
        if (['closed', 'withdrawn'].indexOf(state.state) < 0) {
          return accumulator + state.value;
        }
      }, 0);

    return Math.round((val / totalORS) * 100);
  }



}
