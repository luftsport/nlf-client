import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiObservationsItem, ApiObservationWeatherInterface } from 'app/api/api.interface';
import { debounce } from 'ts-debounce';
import { faCheck, faClose, faCloud } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-ors-editor-weather',
  templateUrl: './ors-editor-weather.component.html',
  styleUrls: ['./ors-editor-weather.component.css']
})
export class NlfOrsEditorWeatherComponent implements OnInit {

  @Input() activity: string;

  observation: ApiObservationsItem;
  modalRef;
  wx;

  debouncedUpdate = debounce(this.update, 1000);

  faCloud = faCloud;
  faClose = faClose;
  faCheck = faCheck;

  constructor(
    private subject: NlfOrsEditorService,
    private modalService: NgbModal) {

    this.subject.observableObservation.subscribe(
      observation => {
        this.observation = observation;
        try {
          if (!this.observation.hasOwnProperty('weather')) {
            this.observation['weather'] = { manual: {}, auto: {} };
          }
          if (!this.observation.weather.hasOwnProperty('manual')) {
            this.observation.weather['manual'] = {};
          }
          if (!this.observation.weather.hasOwnProperty('auto')) {
            this.observation.weather['auto'] = {};
          }
          this.wx = this.get(['weather', 'manual'], this.observation);
          this.initWx();
        } catch (e) { }
      });
  }


  ngOnInit() {
    console.error(this.activity);
    if(!this.activity) {
      this.activity = 'fallskjerm';
    }

  }

  private get(p, o) {
    return p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : {}, o);
  }

  initWx() {
    if (!this.wx.hasOwnProperty('clouds')) {
      this.wx['clouds'] = { base: null, fog: false, hail: false, rain: false, snow: false, thunder: false };
    }
    if (!this.wx.hasOwnProperty('temp')) {
      this.wx['temp'] = { altitude: null, ground: null };
    }
    if (!this.wx.hasOwnProperty('wind')) {
      this.wx['wind'] = { avg: null, dir: null, max: null, min: null, turbulence: false, gusting: false };
    }
    if (!this.wx.hasOwnProperty('description')) {
      this.wx['description'] = '';
    }
  }

  update() {
    this.subject.update(this.observation);
  }

  openModal(template) {
    this.initWx();
    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }

  modalToggle(group, key) {
    this.wx['group']['key'] = !this.wx['group']['key'];
  }

  closeModal() {
    Object.keys(this.wx).forEach((key) => (this.wx[key] == null) && delete this.wx[key]);
    this.observation.weather.manual = this.wx;
    this.subject.update(this.observation);
    this.modalRef.close();

  }

}

/**
manual	{…}
clouds	{…}
  base	2333
  fog	true
  hail	true
  raining	true
  snow	true
  thunder	true
description	Forbanne drittvær burde ikke hoppet
gusting	true
temp	{…}
  altitude	145
  ground	12
turbulence	true
wind	{…}
  avg	11
  dir	WSW
  max	14
  min	1
 */
