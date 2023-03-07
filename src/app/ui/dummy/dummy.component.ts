import { Component, OnInit, TemplateRef, Inject } from '@angular/core';
import { NlfComponent } from 'app/nlf.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiObservationsAggService } from 'app/api/api-observations-agg.service';
import { ApiOptionsInterface, NlfConfigItem } from 'app/api/api.interface';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfUserSubjectService } from 'app/user/user-subject.service';
import { EChartsOption } from 'echarts';
import { forkJoin } from 'rxjs';

//import { Moment } from 'moment';
@Component({
  selector: 'nlf-ui-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class NlfUiDummyComponent implements OnInit {
  dataReady = false;
  activities;
  default_activity;
  default_activity_obsreg = false;
  pie = [];
  public config: NlfConfigItem;



  view: any[] = [700, 300];
  label = 'totalt behandlede observasjoner';


  colorScheme = { // BS light '#f9f9f9',
    domain: ['#5cb85c', '#5bc0de', '#428bca', '#d9534f', '#0c0c0c']
  };

  //Pie
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
  pieTypes = [];

  modalRef;

  constructor(private app: NlfComponent,
    private modalService: NgbModal,
    private agg: ApiObservationsAggService,
    private userSubject: NlfUserSubjectService,
    private configService: NlfConfigService) {

    app.setTitle('Forside');

  }

  ngOnInit() {

    // User settings
    this.userSubject.observable.subscribe(
      userData => {
        this.activities = userData.activities;
        this.default_activity = userData.settings.default_activity;


        // App settings
        this.configService.observableConfig.subscribe(
          data => {
            this.config = data;

            // IF activate OBSREG
            if ([109, 111, 237, 238].indexOf(this.default_activity) > -1) {

              this.default_activity_obsreg = true;
              // Aggregation for pie data
              try {
                this.agg.setActivity(this.config.inv_mapping[this.default_activity]);
              } catch {
                this.agg.setActivity('fallskjerm');
              }

              let d1 = new Date('2014-01-01');
              let d2 = new Date('2030-01-01');
              let options: ApiOptionsInterface = {
                query: {
                  aggregate: {
                    $from: d1.toISOString(),
                    $to: d2.toISOString(),
                    $state: 'closed'
                  }
                }
              };

              this.agg.getTypes(options).subscribe(
                pie_data => {
                  this.pieTypes = [];

                  pie_data._items.forEach(el => {
                    try {
                      this.pieTypes.push({ 'name': this.config[this.config.inv_mapping[this.default_activity]].observation.types[el._id]['label'], 'value': el.count, itemStyle: { color: this.typesChartOptionColors[el._id] } });
                    } catch (e) {
                      //console.log("Error assigning types", e);
                      //this.pie.push({ 'name': this.config.fallskjerm.observation.types[el._id]['label'], 'value': el.count });
                    }

                  });

                  this.typesChartOption.series[0].data = this.pieTypes;


                  this.dataReady = true;
                  console.log('CHART', this.typesChartOption);

                },
                err => console.log(err),
                () => console.log('Done')
              );
            } else {
              this.default_activity_obsreg = false;
            }

          }
        );
      },
      err => console.log('Error getting user acitivites: ', err)
    );

  }

  getTypeLabel(key) {

    return this.config[this.config.inv_mapping[this.default_activity]].observation.types[key]['label'] || key;
  }
  getTypesTotalValue() {
    return this.pieTypes.reduce((accumulated, obj) => { return accumulated + obj.value }, 0);
  }

  getDefaultActivity() {
    return this.config.inv_mapping[this.default_activity] || '';
  }



  /**
   * Ngx-chart
   */
  onSelect(event) {
    console.log(event);
  }

  /**
   * Modal
   */
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }

}
