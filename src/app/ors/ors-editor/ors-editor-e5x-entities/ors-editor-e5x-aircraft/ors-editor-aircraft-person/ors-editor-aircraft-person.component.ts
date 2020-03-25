import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiPersonInterface } from 'app/api/api.interface';
import { E5XAircraftClass } from 'app/interfaces/e5x.interface';
import { NlfOrsEditorInvolvedService, NlfOrsEditorInvolvedInterface } from 'app/ors/ors-editor/ors-editor-involved.service';


@Component({
  selector: 'nlf-ors-editor-aircraft-person',
  templateUrl: './ors-editor-aircraft-person.component.html',
  styleUrls: ['./ors-editor-aircraft-person.component.css']
})
export class NlfOrsEditorAircraftPersonComponent implements OnInit {

  @Input() crew;
  @Input() callsign;
  @Output() crewChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Input() disabled = false;

  modalRef;
  modalIdx: number;
  modalValue;

  anon;
  involved: NlfOrsEditorInvolvedInterface[];
  selectedPerson: NlfOrsEditorInvolvedInterface;

  constructor(
    private involvedSubject: NlfOrsEditorInvolvedService,
    private modalService: NgbModal) {

    // Subscribe to involved:
    this.involvedSubject.currentArr.subscribe(list => this.involved = list);
  }


  ngOnInit() {
    if (!Array.isArray(this.crew)) {
      this.crew = [];
    }
    this.updateInvolved();
  }

  public add() {
    this.modalIdx = this.crew.length;
  }

  public delete(idx) {
    this.crew.splice(idx, 1);
    this.update();
  }

  public setAnon() {
    if (!!this.modalValue) {
      this.anon = true;
      this.modalValue.person = { id: -1 * Math.floor(Math.random() * 100000), tmp_name: 'Anonymisert person' };
    }
  }

  public unsetAnon() {
    this.modalValue.person = { id: undefined, tmp_name: undefined, full_name: undefined };
    this.anon = false;
  }

  public addLicense() {
    this.modalValue.flightCrewMember.entities.flightCrewLicenses.push(new E5XAircraftClass().flightCrewLicenses);
  }

  public deleteLicense(idx) {
    this.modalValue.flightCrewMember.entities.flightCrewLicenses.splice(idx, 1);
  }

  public addIncapacitation() {
    this.modalValue.incapacitation.push(new E5XAircraftClass().incapacitation);
  }
  public deleteIncapacitation(idx) {
    this.modalValue.incapacitation.splice(idx, 1);
  }

  public addHumanFactors() {
    this.modalValue.humanFactors = { sleep: undefined, stress: undefined, pressure: undefined };
  }
  public deleteHumanFactors(idx) {
    this.modalValue.humanFactors = undefined;
  }

  public openModal(template, idx) {
    this.modalIdx = idx;
    if (this.modalIdx === this.crew.length) {
      this.modalValue = {
        person: { id: undefined, tmp_name: undefined, full_name: undefined },
        humanFactors: undefined,
        currency: { h90d: undefined, h365d: undefined },
        flightCrewMember: new E5XAircraftClass().flightCrewMember,
        incapacitation: []
      }

    } else {
      this.modalValue = this.crew[this.modalIdx];
    }
    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  updateInvolved() {
    for (let crew of this.crew) {
      if (crew.person.id < 0) {
        this.involvedSubject.add(crew.person.id, crew.person.tmp_name);
      } else {
        this.involvedSubject.add(crew.person.id, undefined);
      }
    }
  }

  update() {
    this.crewChange.emit(this.crew);
    this.change.emit(true);
  }

  modalUpdate() {
    if (this.modalIdx === this.crew.length) {

      this.involvedSubject.add(this.modalValue.person.id, this.modalValue.person.tmp_name || false );
      this.crew.push(this.modalValue);
    } else {
      this.crew[this.modalIdx] = { ...this.modalValue };
    }
    this.update();
    this.modalRef.close();
  }

}

/**

  ngOnInit() {
    if (typeof this.crew === 'undefined') {
      this.crew = { snapshot: {}, person: { id: undefined }, notes: undefined };
    }


    if (!this.crew.hasOwnProperty('e5x')) {
      this.crew.e5x = { FlightCrewLicenses: {}, FlightCrewMember: {}, Incapacitation: {} };

    }
    // Set pilot in command!
    if(!this.crew.e5x.FlightCrewMember.Category) {
      this.crew.e5x.FlightCrewMember.Category = 4; //PIC
    }
  }

  public onChange() {
    this.crewChange.emit(this.crew);
    this.change.emit(true);
  }

  public openPersonModal(template) {
    if (!!this.crew.person['id']) {
      this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
    }
  }

  public modalPersonUpdate() {
    this.crewChange.emit(this.crew);
    this.change.emit(true);
    this.modalRef.close();
  }
}
**/
