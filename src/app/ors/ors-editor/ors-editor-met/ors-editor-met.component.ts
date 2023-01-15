import { Component, OnInit } from '@angular/core';
import { ApiObservationsItem, ApiObservationWeatherAutoInterface, ApiOptionsInterface } from 'app/api/api.interface';
import { ApiNlfMetService } from 'app/api/api-nlf-met.service';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiAirportsService } from 'app/api/api-airports.service';
import { map } from 'rxjs/operators';
import { Router, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nlf-ors-editor-met',
  templateUrl: './ors-editor-met.component.html',
  styleUrls: ['./ors-editor-met.component.css']
})
export class NlfOrsEditorMetComponent implements OnInit {
  observation: ApiObservationsItem;
  public tafmetar; //: ApiObservationWeatherAutoInterface;
  when;
  icao: string;
  where: number[];
  dataReady = false;
  initObservation = false;

  modalRef;
  modal;

  constructor(
    private subject: NlfOrsEditorService,
    private metService: ApiNlfMetService,
    private airportsService: ApiAirportsService,
    private modalService: NgbModal
  ) {
    this.subject.observableObservation.subscribe(
      observation => {
        let changes = false;
        this.observation = observation;

        try {
          if (!this.observation.weather.hasOwnProperty('auto')) {
            this.observation.weather['auto'] = {};
          }
        } catch (e) { }

        try {
          if (!this.initObservation && !!this.observation.location.geo) {
            this.tafmetar = this.observation.weather.auto;
            this.when = this.observation.when;
            this.where = this.observation.location.geo.coordinates;
            this.initObservation = true;
            changes = false;
          }
        } catch { }
        try {
          if (!this.when || this.when !== this.observation.when) {
            console.log('New date', this.when, 'Old date', this.observation.when);
            this.when = this.observation.when;
            changes = true;
          }
        } catch {

        }

        try {
          if (!this.where || this.where !== this.observation.location.geo.coordinates) {
            this.where = this.observation.location.geo.coordinates;
            changes = true;
          }
        } catch {

        }

        if ((this.initObservation && !this.tafmetar) || changes) {
          if (!!this.where && !!this.when) {
            this.getIcao();
          }
        }
      });
  }

  ngOnInit() {
  }
  private getStringDate(dateObj: Date | string) {
    dateObj = new Date(dateObj);
    const month = ('0' + (dateObj.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getUTCDate()).slice(-2);
    const year = dateObj.getFullYear();

    return year + '-' + month + '-' + day;
  }

  private getStringTime(dateObj: Date | string) {
    dateObj = new Date(dateObj);
    console.log('Time', dateObj, dateObj.getUTCHours(), dateObj.getUTCMinutes());
    const hours = ('0' + (dateObj.getUTCHours())).slice(-2);
    const minutes = ('0' + (dateObj.getUTCMinutes())).slice(-2);

    return hours + ':' + minutes;
  }

  private getIcao() {
    const options: ApiOptionsInterface = {
      query: {
        where: {
          location: {
            $near: {
              $geometry: { type: 'Point', coordinates: [+this.where[1], +this.where[0]] },
              $maxDistance: 500000
            }
          },
          type: { $ne: 'closed' },
          iata_code: { $ne: null },
        },
        max_results: 1,
        projection: { icao: 1 }
      }
    };

    this.airportsService.getAirports(options).subscribe(
      airport => {
        if (airport._items.length === 1) {
          this.icao = airport._items[0].icao;
          this.getTafMetar();
          this.getNearestMetar();
        }
      }
    );

  }

  private getTafMetar() {

    this.metService.getTafMetar(this.icao, this.getStringDate(this.when)).subscribe(
      data => {

        this.tafmetar = data;
        this.observation.weather.auto = data;
        this.subject.update(this.observation);
        this.dataReady = true;

      }
    );
  }

  private getNearestMetar() {
    this.metService.getNearestMetar(this.icao, this.getStringDate(this.when) + 'T' + this.getStringTime(this.when)).subscribe(
      data => {
        this.observation.weather.auto.metar_nearest = data;
      }
    )
  }

  openModal(template, title) {

    this.modal = { title: title, data: this.observation.weather.auto[title] || [] };
    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }

}
