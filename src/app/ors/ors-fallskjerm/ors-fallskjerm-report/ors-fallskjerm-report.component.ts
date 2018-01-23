import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { ApiObservationsService } from '../../../api/api-observations.service';
import { ApiOptionsInterface, ApiObservationsItem } from '../../../api/api.interface';
import { NlfAlertService } from '../../../services/alert/alert.service';
import { NlfComponent } from '../../../nlf.component';
import { NgStringPipesModule } from 'angular-pipes';
import { ApiEveBaseList } from '../../../api/api-eve.interface';


@Component({
  selector: 'nlf-ors-fallskjerm-report',
  templateUrl: './ors-fallskjerm-report.component.html',
  styleUrls: ['./ors-fallskjerm-report.component.css'],
})
export class NlfOrsFallskjermReportComponent implements OnInit {

  id: number;
  version: number;
  data: ApiObservationsItem;
  dataDiff: any;
  dataReady = false;
  spinner = true;
  currentImage: string;
  rating: number;

  // DIFF
  left: string;
  right: string;

  isWorkflowTimelineCollapsed = true;

  constructor(private route: ActivatedRoute,
    private orsService: ApiObservationsService,
    private alertService: NlfAlertService,
    private app: NlfComponent) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'] ? params['id'] : 0;
      this.version = params['version'] ? params['version'] : 0;
      this.app.setTitle('NLF - ORS Rapport #' + this.id);
      this.getData();

     
    });



  }

  public toFloat(val) {
    if (typeof val === 'number') { return val; }

    return parseFloat(val);
  }



  /**
   * Handle files to base64 string
   */
  public onUpload(event) {
    let reader = new FileReader();
    reader.addEventListener('load', (ev) => {
      this.currentImage = ev.target['result'];
    });
    reader.readAsDataURL(event.target.files[0]);
  }

  public getDiffs(_id) {

    let options: ApiOptionsInterface = {};
    options = {
      query: { version: 'diffs' },
    };


    this.orsService.getObservation(_id, options).subscribe(
      data => {
        this.dataDiff = data;
        console.log('In DIFFS');
        console.log(data);

        this.left = "Tester om dette fungerer eller ikke"; //this.dataDiff._items[0].ask.draft;
        this.right = "Tester vel om dette fungerer kanskje ikke enn så lenge"; // this.dataDiff._items[1].ask.pending_review_hi;
      },
      err => console.log(err),
    );

  }

  public getData() {
    this.dataReady = false;

    let options: ApiOptionsInterface = {};
    if (this.version > 0) {
      options = {
        query: { version: this.version },
      };

    }


    this.orsService.getObservation(this.id, options).subscribe(
      data => {
        this.data = data;

        if (this.version > 0 && this.version !== this.data._latest_version) {
          this.alertService.warning('Utdatert versjon du ser på versjon ' + this.version + ' av dokumentet. Siste versjon er ' + this.data._latest_version);
        }

        this.getDiffs(data._id);

        // @TODO: Remove since in pipe!
        // Calculate some stupid rating?
        // Normal this.rating =  Math.round( ( ((this.data.rating.actual + Math.pow( this.data.rating.potential,2) /9) - ((1+Math.pow(1,2))/9) )/ ((9+Math.pow(9,2))/9) )*100);
        //this.rating = Math.round((((((this.data.rating.actual + Math.pow(this.data.rating.potential, 2) / 8) - ((1 + Math.pow(1, 2)) / 8)) / ((8 + Math.pow(8, 2)) / 9))) / 1.777777777777778) * 100);


      },
      err => {
        this.alertService.error(err.message);
      },
      () => this.dataReady = true
    );
  }

}
