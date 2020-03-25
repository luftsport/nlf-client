import { Component, OnInit, Input } from '@angular/core';
import { ApiObservationsItem, ApiOptionsInterface, ApiObservationFallskjermOrganizationInterface } from 'app/api/api.interface';
import { NlfOrsEditorInvolvedService, NlfOrsEditorInvolvedInterface } from 'app/ors/ors-editor/ors-editor-involved.service';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'nlf-ors-fallskjerm-editor-involved',
  templateUrl: './ors-fallskjerm-editor-involved.component.html',
  styleUrls: ['./ors-fallskjerm-editor-involved.component.css']
})
export class NlfOrsFallskjermEditorInvolvedComponent implements OnInit {

  observation: ApiObservationsItem;
  involved;
  modalIndex: number;
  modalPerson;
  modalRef;

  deleteExternal = false;

  smokeMyAss = false;

  constructor(
    private subject: NlfOrsEditorService,
    private modalService: NgbModal) {

    this.subject.observableObservation.subscribe(
      (observation) => {
        this.observation = observation;
        if(!this.involved) {
          this.involved = [...this.observation.involved];
          this.smokeMyAss = true;
        }
      });
  }

  ngOnInit() {
  }

  onChange(event) {
    console.log('On change Inv', this.involved);
    this.observation.involved = [...this.involved];
    this.subject.update(this.observation);
  }

  onRemove(index) {
    this.smokeMyAss = false;
    console.log('Removal index', index, this.observation.involved[index]);
    console.log(this.observation.involved.length);
    this.deleteExternal = true; // set external flag
    this.involved.splice(index,1); // delete
    this.involved = [...this.involved]; // trigger change detection
    this.smokeMyAss = true;
    this.onChange(true);
  }

  public openPersonModal(template, index) {
    this.modalIndex = index;
    this.modalPerson = this.involved[index];
    if (!this.modalPerson.hasOwnProperty('data')) {
      this.modalPerson['data'] = {};
    }
    if (!this.modalPerson.data.hasOwnProperty('gear')) {
      this.modalPerson.data['gear'] = {};
    }
    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }

  modalInvolvedUpdate(index) {
    this.involved[index] = this.modalPerson;
    this.onChange(true);
    this.modalRef.close();
  }

}
