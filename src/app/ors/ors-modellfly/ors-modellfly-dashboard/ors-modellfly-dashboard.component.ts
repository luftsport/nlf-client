import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiObservationsAggService } from 'app/api/api-observations-agg.service';
import { ApiOptionsInterface, NlfConfigItem } from 'app/api/api.interface';
import { NlfConfigService } from 'app/nlf-config.service';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { forkJoin, pipe, from } from 'rxjs';
import { map, mergeMap, reduce, delay } from 'rxjs/operators';
import { EChartsOption } from 'echarts';
import { faCalendar, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-ors-modellfly-dashboard',
  templateUrl: './ors-modellfly-dashboard.component.html',
  styleUrls: ['./ors-modellfly-dashboard.component.css']
})
export class NlfOrsModellflyDashboardComponent implements OnInit {

  faSave = faSave;
  faCalendar = faCalendar;

  activity = 'modellfly';

  dataReady = false;
  discipline_id: number;

  //Legacy
  pieTypes = [];
  pieTypesReady = false;
  pieTypesLabel = 'behandlede';
  pieStates = [];
  pieStatesReady = false;
  pieStatesLabel = 'opprettede';

  // Echarts
  typesChartOption: EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'behandlede',
        type: 'pie',
        radius: ['50%', '70%'],
        tooltip: {
          show: false
        },
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: undefined
      }
    ]
  };
  typesChartOptionColors = {
    unwanted_act: '#0dcaf0',
    sharing: '#198754',
    near_miss: '#fd7e14',
    incident: '#dc3545',
    accident: '#000'
  };

  // States (trukket, draft etc)
  statesChartOption: EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'opprettede',
        type: 'pie',
        radius: ['50%', '70%'],
        tooltip: {
          show: false
        },
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: undefined
      }
    ]
  };
  statesChartOptionColors = {
    closed: '#198754',
    draft: '#0dcaf0',
    withdrawn: '#ced4da',
    unknown: '#dc3545',
    pending_review_hi: '#495057',
    pending_review_fs: '#20c997',
    pending_review_su: '#fd7e14',
    pending_review_su_aff: '#d63384',
    pending_review_su_leder: '#6f42c1',
    pending_review_su_materiell: '#6610f2',
    pending_review_su_skjerm: '#0d6efd',
    pending_review_su_tandem: '#ced4da'
  };



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
    private router: Router,
    private agg: ApiObservationsAggService,
    private configService: NlfConfigService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {


    this.agg.setActivity(this.activity);

    this.sub = this.route.params.subscribe(
      params => {
        this.dataReady = false;
        this.discipline_id = params['id'] ? +params['id'] : -1;

        if (!this.config) {
          this.configService.observableConfig.subscribe(
            data => {
              this.config = data;
              console.log('CONFIG', data);
              const d = new Date();
              this.current_year = d.getFullYear();

              // Calendar
              //this.fromDate = { year: d.getFullYear(), month: 1, day: 1 };

              //this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
              //this.firstDayOfYear= new Date(new Date().getFullYear(), 0, 1);
              this.resetDate();

            }
          );

        } else {
          this.updateDashboard();
        }
      }
    );

  }

  ngOnInit() {
    this.setQuarters();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public onOrgChange(event) {
    if (this.isDataReady()) {
      //this.router.navigate(['/ors', this.activity, 'dashboard', this.discipline_id]);
      this.updateDashboard();
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: {},
        });
    }
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

      //console.log(i, moment().subtract(i + 1, 'quarter').startOf('quarter')._d, _to._d);
    }

    console.log('Quarts:', this.quarts);


  }

  public setDatesFromQuarter(quarter) {
    console.log('From quarter', quarter.from._d, quarter.to._d);
    this.fromDate = { year: quarter.from.year(), month: quarter.from.month(), day: quarter.from.day(), equals: undefined, after: undefined, before: undefined };
    this.toDate = { year: quarter.to.year(), month: quarter.to.month(), day: quarter.to.day(), equals: undefined, after: undefined, before: undefined };
    this.setAsDate();
  }

  private setAsDate() {
    this.dateRangeReady = false;
    this.d1 = new Date(this.fromDate['year'], this.fromDate['month'], this.fromDate['day']);
    this.d2 = new Date(this.toDate['year'], this.toDate['month'], this.toDate['day']);
    this.dateRange = [new Date(this.fromDate['year'], this.fromDate['month'] + 1, this.fromDate['day']), new Date(this.toDate['year'], this.toDate['month'] + 1, this.toDate['day'])];
    this.dateRangeReady = true;
    this.updateDashboard();
  }
  // calendar
  public onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.fromDate['month'] = this.fromDate['month'] - 1;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.toDate['month'] = this.toDate['month'] - 1;
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.fromDate['month'] = this.fromDate['month'] - 1;
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


  updateDashboard() {

    forkJoin(
      this._getTypesPie(),
      this._getStatesPie(),
      this._getAvgRatingsDiscipline(),
      this._getAvgRatings()
    ).subscribe(

      data => {
        console.log('DATA', data);
        this.pieStates = [];
        //this.pieTypes = data[0]._items.map(el => ({ name: this.config.modellfly.observation.types[el._id]['label'], value: el.count, type: el._id }));
        //this.pieTypesReady = true;

        this.pieTypes = [];
        //this.pieStates = data[1]._items.map(el => [{ name: this.config.modellfly.observation.state[el._id]['label'], value: el.count, state: el._id }));
        //this.pieStatesReady = true;
        try {
          this.pieTypes = data[0]._items.map(el => ({ name: this.config.modellfly.observation.types[el._id]['label'], value: el.count, type: el._id, itemStyle: { color: this.typesChartOptionColors[el._id] } }), err => { console.log('ERR', err) });
        } catch (e) {
          console.log('ERR pie', e);
          console.log(data[0]._items);
        }

        try {
          this.pieStates = data[1]._items.map(elm => ({ name: this.config.modellfly.observation.state[elm._id]['label'], value: elm.count, itemStyle: { color: this.statesChartOptionColors[elm._id] } }), err => { console.log('ERR', err) });
        } catch (e) {
          console.log('ERR pie', e);
          console.log(data[1]._items);
        }



        const a = this.pieTypes.reduce(
          (accumulator, ors_type) => {
            return accumulator + ors_type.value;
          }, 0);

        const b = this.pieTypes.reduce(
          (accumulator, ors_type) => {
            if (['accident', 'incident'].indexOf(ors_type.type) > -1) {
              return accumulator + ors_type.value;
            } else {
              return accumulator
            }
          }, 0);

        const c = this.pieStates.reduce(
          (accumulator, ors_state) => {
            if (['closed', 'withdrawn'].indexOf(ors_state.state) < 0) {
              return accumulator + ors_state.value;
            } else {
              return accumulator
            }
          }, 0);

        this.stats = {
          total_ors: a,
          total_injury: b,
          total_processing: c,
        };

        console.log('PIESTATES', this.pieStates);
        this.typesChartOption.series[0].data = this.pieTypes;

        console.log('PIESTYPES', this.pieTypes);
        this.statesChartOption.series[0].data = this.pieStates;

        this.pieTypesReady = true;
        this.pieStatesReady = true;


        try {
          this.stats['avg_ratings_discipline'] = data[2]['_items'][0]['avg'];

        } catch (e) {
          console.log('AVG Err discipline', e);
          this.stats['avg_ratings_discipline'] = 'NA';
        }

        try {
          // const tmp = data[3]['_items'].reduce((total, next) => (total + next.avg, 0)) / data[3]['_items'].length;
          // this.stats['avg_ratings'] = tmp;
          let sum = 0;
          for (let i = 0; i < data[3]['_items'].length; i++) {
            sum += data[3]['_items'][i]['avg'];
          }
          this.stats['avg_ratings'] = sum / data[3]['_items'].length;
        } catch (e) {
          console.log('AVG Err ratings', e);
        }


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
        console.log('STATS', this.stats);
      },
      err => console.log('API piefork ERR', err),
      () => console.log('Done')
    );

  }

  getStatesTotalValue() {
    return this.statesChartOption.series[0].data.reduce((accumulated, obj) => { return accumulated + obj.value }, 0);
  }
  getTypesTotalValue() {
    return this.typesChartOption.series[0].data.reduce((accumulated, obj) => { return accumulated + obj.value }, 0);
  }

  updateDashboardLEGACYWORKS() {

    forkJoin(
      this._getTypesPie(),
      this._getStatesPie()
    ).subscribe(

      data => {

        this.pieTypes = [];
        //this.pieTypes = data[0]._items.map(el => ({ name: this.config.modellfly.observation.types[el._id]['label'], value: el.count, type: el._id }));
        //this.pieTypesReady = true;

        this.pieStates = [];
        //this.pieStates = data[1]._items.map(el => [{ name: this.config.modellfly.observation.state[el._id]['label'], value: el.count, state: el._id }));
        //this.pieStatesReady = true;

        forkJoin(
          //this.pieTypes,
          //this.pieStates
          this.pieTypes = data[0]._items.map(el => ({ name: this.config.modellfly.observation.types[el._id]['label'], value: el.count, type: el._id })),
          this.pieStates = data[1]._items.map(el => ({ name: this.config.modellfly.observation.state[el._id]['label'], value: el.count, state: el._id }))
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

  _getAvgRatingsDiscipline() {
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
    return this.agg.getAvgRatingsDiscipline(options);
  }

  _getAvgRatings() {
    this.pieStatesReady = false;

    let options: ApiOptionsInterface = {
      query: {
        aggregate: {
          $from: this.d1.toISOString(),
          $to: this.d2.toISOString(),
        }
      }
    };
    return this.agg.getAvgRatings(options);
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
