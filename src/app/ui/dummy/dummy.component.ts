import { Component, OnInit, TemplateRef, Inject } from '@angular/core';
import { NlfComponent } from 'app/nlf.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiObservationsAggService } from 'app/api/api-observations-agg.service';
import { ApiOptionsInterface, NlfConfigItem } from 'app/api/api.interface';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfUserSubjectService } from 'app/user/user-subject.service';

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
                data => {
                  data._items.forEach(el => {
                    try {
                      this.pie.push({ 'name': this.config[this.config.inv_mapping[this.default_activity]].observation.types[el._id]['label'], 'value': el.count });
                    } catch (e) {
                      console.log("Error assigning types", e);
                      //this.pie.push({ 'name': this.config.fallskjerm.observation.types[el._id]['label'], 'value': el.count });
                    }

                  });
                  this.dataReady = true;
                  console.log(data);

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
