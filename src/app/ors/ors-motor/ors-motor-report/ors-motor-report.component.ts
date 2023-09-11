import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { ApiOptionsInterface, ApiObservationsMotorflyItem } from 'app/api/api.interface';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { NlfComponent } from 'app/nlf.component';
import { NgStringPipesModule } from 'angular-pipes';
import { ApiEveBaseList } from 'app/api/api-eve.interface';
import { faEdit, faMapMarker, faRandom, faBolt, faPlane, faFile, faStreetView, faCloud, faUsers, faRoad, faExternalLink, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt, faCommenting, faComments } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'nlf-ors-motor-report',
  templateUrl: './ors-motor-report.component.html',
  styleUrls: ['./ors-motor-report.component.css'],
})
export class NlfOrsMotorReportComponent implements OnInit {

  @Input() inputId?: number; // Allows to use seperately

  id: number;
  version: number;
  observation: ApiObservationsMotorflyItem;
  dataDiff: any;
  dataReady = false;
  error;
  spinner = true;
  currentImage: string | ArrayBuffer;
  rating: number;

  // DIFF
  left: string;
  right: string;

  isWorkflowTimelineCollapsed = true;

  faEdit = faEdit;
  faMapMarker = faMapMarker;
  faRandom = faRandom;
  faBolt = faBolt;
  faPlane = faPlane;
  faFile = faFile;
  faStreetView = faStreetView;
  faCloud = faCloud;
  faUsers = faUsers;
  faRoad = faRoad;
  faExternalLink = faExternalLink;
  faDownload = faDownload;
  faFileAlt = faFileAlt;
  faCommenting = faCommenting;
  faComments = faComments;

  constructor(private route: ActivatedRoute,
              private orsService: ApiObservationsService,
              private alertService: NlfAlertService,
              private app: NlfComponent) {

  }

  ngOnInit() {
    this.orsService.setActivity('motorfly');

    if (!!this.inputId && this.inputId > 0) {
      this.id = this.inputId;
      this.getData();

    } else {
      this.route.params.subscribe(params => {
        this.id = params['id'] ? params['id'] : 0;
        this.version = params['version'] ? params['version'] : 0;
        this.app.setTitle('OBSREG Rapport #' + this.id);
        this.getData();
      });
    }



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
      query: { max_results: 1000, version: 'diffs' },
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
        this.observation = data;

        if (this.version > 0 && this.version !== this.observation._latest_version) {
          this.alertService.warning('Utdatert versjon du ser på versjon ' + this.version + ' av dokumentet. Siste versjon er ' + this.observation._latest_version);
        }

        this.getDiffs(this.observation._id);

        // @TODO: Remove since in pipe!
        // Calculate some stupid rating?
        // Normal this.rating =  Math.round( ( ((this.data.rating.actual + Math.pow( this.data.rating.potential,2) /9) - ((1+Math.pow(1,2))/9) )/ ((9+Math.pow(9,2))/9) )*100);
        //this.rating = Math.round((((((this.data.rating.actual + Math.pow(this.data.rating.potential, 2) / 8) - ((1 + Math.pow(1, 2)) / 8)) / ((8 + Math.pow(8, 2)) / 9))) / 1.777777777777778) * 100);


      },
      err => {
        this.alertService.error(err.message);
        this.error = err;
        this.dataReady = false;
      },
      () => this.dataReady = true
    );
  }

}
