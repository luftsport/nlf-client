import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import {  NlfConfigService } from 'app/nlf-config.service';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiAirportsService } from 'app/api/api-airports.service';
import { ApiOptionsInterface, ApiObservationsItem, ApiAirport, ApiAirports, ApiObservationAircraftsItem, NlfConfigItem } from 'app/api/api.interface';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, map } from 'rxjs/operators';
import { Subject, Observable, of, concat } from 'rxjs';
import { GeoLocationService } from 'app/services/geo/geo-location.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { ApiCacheService } from 'app/api/api-cache.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService } from 'app/services/confirm/confirm.service';
import { ApiE5xService } from 'app/api/api-e5x.service';
import { ApiFilesService } from 'app/api/api-files.service';
import { NlfAuthSubjectService } from 'app/services/auth/auth-subject.service';
import { get, cleanE5XObject, deepCopy, pad } from 'app/interfaces/functions';
import { environment } from 'environments/environment';

import {
  E5XClass,
  E5XAircraftClass,
} from 'app/interfaces/e5x.interface';

@Component({
  selector: 'nlf-ors-e5x',
  templateUrl: './ors-e5x.component.html',
  styleUrls: ['./ors-e5x.component.css']
})
export class NlfOrsE5xComponent implements OnInit {

  @Input() e5x;
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  modalRef;
  observation: ApiObservationsItem;
  e5xobservation;
  generating = false;
  token: string;
  e5xFile = false;
  e5xResult;

  e5x_enabled = false;

  ENV = environment;
  public config: NlfConfigItem;


  allowedReportStatus = [2, 3]; // 2=open, 3=closed

  /**
  report_status = [
    { id: 5, label: 'Initial notification', descr: 'Initial notification' },
    { id: 2, label: 'Open', descr: 'The report is still open. Only initial information has been received. More may follow' },
    { id: 1, label: 'Preliminary', descr: 'The document is a preliminary report' },
    { id: 6, label: 'Factual', descr: 'Factual - ready for coding: The handling of the occurrence by the competent authority has not yet been completed, but there is sufficient information at hand to analyse and code the occurrence' },
    { id: 3, label: 'Closed', descr: 'The report is closed' },
    { id: 4, label: 'Data', descr: 'Data Report' }
  ]
  **/


  constructor(
    private modalService: NgbModal,
    private subject: NlfOrsEditorService,
    private confirmService: ConfirmService,
    private e5xService: ApiE5xService,
    public authSubject: NlfAuthSubjectService,
    private apiFile: ApiFilesService,
    private configService: NlfConfigService
  ) {

    this.authSubject.observableAuthData.subscribe(
      data => {
        console.log('Auth subject', data);
        this.token = data.token;
      }
    );

    this.subject.observableObservation.subscribe(
      data => {
        this.observation = data;
        this.configService.observableConfig.subscribe(
          data => {
            this.config = data;
            this.e5x_enabled = this.config[this.observation._model.type]['observation']['e5x']['enabled'];
            if (!this.observation.hasOwnProperty('e5x')) {
              this.observation['e5x'] = {};
              this.observation.e5x._status = 2; //2=open, 3=closed
              if (!this.observation.e5x.hasOwnProperty('audit')) {
                this.observation.e5x['audit'] = [];
              }
            }
          }
        );

      }
    );
  }

  ngOnInit() {
  }

  private _send() {

    this.generateE5X();
    this.generating = true;
    this.e5xResult = undefined;

    this.e5xService.generate(
      this.observation._id,
      this.observation._etag,
      this.e5xobservation,
      this.config[this.observation._model.type]['observation']['e5x']['rit_version']
    ).subscribe(
      data => {
        console.log('DATA E5X', data);
        this.e5xResult = data;
        this.change.emit(true);
      },
      err => console.log('E5X ERR', err),
      () => { this.generating = false; }
    );
  }

  public send() {
    if (this.observation.acl_user.x && this.observation.workflow.state === 'pending_review_ors') {
      const confirmMsg = {
        title: 'Please confirm',
        message: 'Er du sikker på du vil sende rapport til LT?',
        yes: 'Ja, send inn',
        no: 'Nei'
      };
      this.confirmService.confirm(confirmMsg).then(
        () => this._send(),
        () => { }
      );
    }

  }

  public generateE5X() {

    //DEFAULTS
    // Title
    this.observation.occurrence.attributes.headline = this.observation.tags.join(' ') || '';
    if(ENV._name!='prod') {
      this.observation.occurrence.attributes.headline = this.observation.occurrence.attributes.headline + ' TEST [' + ENV._name + ']';
    }

    if(this.config

    // Times this.currentWhen.toISOString().substr(0,10)
    let t = new Date(this.observation.when);
    this.observation.occurrence.attributes.uTCDate.value = [t.getUTCFullYear(), pad(t.getUTCMonth() + 1), pad(t.getUTCDate())].join('-');
    this.observation.occurrence.attributes.uTCTime.value = [pad(t.getUTCHours()), pad(t.getUTCMinutes()), pad(t.getUTCSeconds())].join(':');
    this.observation.occurrence.attributes.localDate.value = [t.getFullYear(), pad(t.getMonth() + 1), pad(t.getDate())].join('-');
    this.observation.occurrence.attributes.localTime.value = [pad(t.getHours()), pad(t.getMinutes()), pad(t.getSeconds())].join(':');

    /**
     * "100271"	"Norway - Other - Production organisation"
        "100479"	"Norway - Other - Flight Crew Training organisation"
        "100687"	"Norway - Other - Flight Information Service Provider"
        "100895"	"Norway - Other - Continuous airworthiness monitoring organisation"
        "101103"	"Norway - Other - Ground handling organisation"
        "101311"	"Norway - Other - Individuals"
        "7133"	"Norway - Other - Design organisation"
        "10133"	"Norway - Other - Aerodrome operator"
        "11133"	"Norway - Other - ATM equipment maintenance organisation"
        "9133"	"Norway - Other - Air Navigation Service Provider"
        "12133"	"Norway - Other - Apron Management Service Provider"
        "8133"	"Norway - Other - Maintenance organisation"
        "6133"	"Norway - Other - Aircraft operator"
     */


    // Reporting history - to be moved to ....
    if (this.observation.occurrence.entities.reportingHistory.length > 0) {
      // this.observation.occurrence.entities.reportingHistory[0].attributes.reportingEntity.value = 101311;
      // moved to flags!
      let rdate = new Date();
      //this.e5xobservation.entities.reportingHistory[0].attributes.reportingDate.value = [rdate.getFullYear(), pad(rdate.getMonth() + 1), pad(rdate.getDate())].join('-'); //+ ' ' + [rdate.getHours(), rdate.getMinutes(), rdate.getSeconds()].join(':');
      this.observation.occurrence.entities.reportingHistory[0].attributes.reportVersion.value = this.observation._version;
      this.observation.occurrence.entities.reportingHistory[0].attributes.reportIdentification.value = 'nlf_motorfly_' + + this.observation.id + '_v' + this.observation._version;

      this.observation.occurrence.entities.reportingHistory[0].attributes.reportingFormType.value = 9823;

      if (!!this.observation.actions) {
        let lokale = '';
        let sentrale = '';
        if (this.observation.actions.local.length > 0) {
          '\nLokale:\n' + this.observation.actions.local.join('\n');
        }
        if (this.observation.actions.central.length > 0) {
          '\nSentrale:\n' + this.observation.actions.central.join('\n');
        }
        //'Lokale:\n' + this.observation.actions.local.join('\n') + '\n\nSentrale\n' + this.observation.actions.central.join('\n');

        this.observation.occurrence.entities.reportingHistory[0].attributes.correctiveActions.plainText = lokale + sentrale;
      }
    }

    this.observation.occurrence.attributes.responsibleEntity.value = 2133; // CAA Norway

    /** Files
    if (this.observation.files.length > 0) {
      try {
        this.observation.occurrence.entities.reportingHistory[0].attributes['report'] = { attributes: { resourceLocator: this.addFiles() } };

      } catch (e) {
        console.log('Error adding files', e);
      }
    }
    **/

    this.e5xobservation = new E5XClass().occurrence;
    console.log('E5X vanilla obj ', this.e5xobservation);

    this.e5xobservation.attributes = { ...this.e5xobservation.attributes, ...cleanE5XObject(deepCopy(this.observation.occurrence.attributes)) };
    this.e5xobservation.entities = { ...this.e5xobservation.entities, ...cleanE5XObject(deepCopy(this.observation.occurrence.entities)) };
    console.log('E5X ORS', this.e5xobservation);



    // Merge AIRCRAFTS
    this.observation.aircrafts.forEach((element, idx) => {
      //for (let element of this.observation.aircrafts; let idx = index) {

      this.e5xobservation.entities.aircraft[idx] = new E5XAircraftClass().aircraft;

      // AIRCRAFT.AIRCRAFT
      if (element.hasOwnProperty('aircraft')) {

        // IF NOT E5X do this anyway!
        if (!!element.aircraft.callsign) {
          this.e5xobservation.entities.aircraft[idx].attributes.callSign.value = element.aircraft.callsign;
          this.e5xobservation.entities.aircraft[idx].attributes.aircraftRegistration.value = element.aircraft.callsign;
        }

        if (element.aircraft.hasOwnProperty('e5x')) {
          // add e5x attributes
          this.e5xobservation.entities.aircraft[idx].attributes = {
            ...this.e5xobservation.entities.aircraft[idx].attributes,
            ...cleanE5XObject(deepCopy(element.aircraft.e5x.attributes))
          };
          this.e5xobservation.entities.aircraft[idx].entities = {
            ...this.e5xobservation.entities.aircraft[idx].entities,
            ...cleanE5XObject(deepCopy(element.aircraft.e5x.entities))
          };
          //{ ...this.e5xobservation.entities.aircraft[idx], ...cleanE5XObject(element.aircraft.e5x) };

          // CREW
          for (let crew of element.crew) {
            try {
              this.e5xobservation.entities.aircraft[idx].entities.flightCrewMember.push(crew.flightCrewMember);
            } catch (e) { console.log('CREW', e); }
            try {
              this.e5xobservation.entities.aircraft[idx].entities.incapacitation.concat(crew.incapacitation);
            } catch (e) { console.log('CREW INCAP', e); }
          }

          /** LINKS
          links: {
            airSpace: { ref: undefined },
            events: [],
            runway: { ref: undefined },
            sector: { ref: undefined },
            dagerousGoods: [],
          },
          **/
          if (!!element.airspace) {
            this.e5xobservation.entities.aircraft[idx].links.airSpace.ref = element.airspace.id;
            this.e5xobservation.entities.airSpace.push(element.airspace);
          }
          if (!!element.aerodrome) {
            // Only link is runway!
            //this.e5xobservation.entities.aircraft[idx].links.aerodrome.ref = element.aerodrome.id;
            if (!!element.aerodrome.entities.runway && element.aerodrome.entities.runway.length > 0) {
              this.e5xobservation.entities.aircraft[idx].links.runway.ref = element.aerodrome.entities.runway[0].id;
            }
            this.e5xobservation.entities.aerodromeGeneral.push(element.aerodrome);
          }
        }
      }

      // AIRCRAFT.OCCURRENCE
      if (element.hasOwnProperty('occurrence')) {
        console.log('Occurrence');
        try {
          this.e5xobservation.entities.aircraft[idx].attributes = {
            ...this.e5xobservation.entities.aircraft[idx].attributes,
            ...cleanE5XObject(deepCopy(element.occurrence))
          };
        } catch (e) { }
      }

      /**
      WX occurrence.entities.aerodromeWeatherReports[].attributes.wxReport
      **/
      if (element.hasOwnProperty('wx')) {

        for (let icao in element.wx) {
          if (element.wx[icao].hasOwnProperty('metar')) {
            for (let metar of element.wx[icao].metar) {
              //E5XAerodromeWeatherReportsClass().aerodromeWeatherReports
              this.e5xobservation.entities.aerodromeWeatherReports.push({ attributes: { wxReport: { plainText: metar } } });
            }
          }
        }
      }

    });
  }



  public openModal(template) {
    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  public closeModal(index) {
    this.subject.update(this.observation);
    this.modalRef.close();
  }

  private async getFile(file) {
    const options: ApiOptionsInterface = {
      query: { projection: { file: 0 } }
    };
    return await this.apiFile.getFile(file, options).toPromise();
  }

  private addFiles() {
    // Do not download files
    let resourceLocator = [];


    this.observation.files.forEach(
      (file) => {
        let resp = this.getFile(file.f);
        resourceLocator.push({ fileName: resp['name'], description: '' });
        /**
       await this.apiFile.getFile(file.f, options).subscribe(
         data => {
           data['r'] = file.r;

           //this.e5xobservation.entities.reportingHistory.attributes.report[0].
           resourceLocator.push({fileName: data['name'], description: ''});

           if (data.content_type.match(/image/g) != null) {
           } else {
           }
           **/
      }
    );

    return resourceLocator;
  }


}
