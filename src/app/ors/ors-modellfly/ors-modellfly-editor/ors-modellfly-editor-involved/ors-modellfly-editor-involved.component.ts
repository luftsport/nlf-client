import { Component, OnInit, Input } from '@angular/core';
import { ApiObservationsItem, ApiOptionsInterface, ApiObservationModellflyOrganizationInterface, NlfConfigItem } from 'app/api/api.interface';
import { NlfOrsEditorInvolvedService, NlfOrsEditorInvolvedInterface } from 'app/ors/ors-editor/ors-editor-involved.service';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { NgbModal, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { faPencil, faCalendar, faBan, faCheck, faExclamation, faTimes, faEdit, faTruckMedical, faHouseMedicalCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { NlfConfigService } from 'app/nlf-config.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'nlf-ors-modellfly-editor-involved',
  templateUrl: './ors-modellfly-editor-involved.component.html',
  styleUrls: ['./ors-modellfly-editor-involved.component.css']
})
export class NlfOrsModellflyEditorInvolvedComponent implements OnInit {

  observation: ApiObservationsItem;
  involved;
  modalIndex: number;
  modalPerson;
  modalRef;
  today;

  deleteExternal = false;

  public config: NlfConfigItem;

  faCheck = faCheck;
  faExclamation = faExclamation;
  faBan = faBan;
  faTimes = faTimes;
  faEdit = faEdit;
  faCalendar = faCalendar;
  faTruckMedical = faTruckMedical;
  faHouseMedicalCircleExclamation = faHouseMedicalCircleExclamation;
  faPencil = faPencil;
  
  constructor(
    private subject: NlfOrsEditorService,
    private involvedService: NlfOrsEditorInvolvedService,
    private modalService: NgbModal,
    private calendar: NgbCalendar,
    private configService: NlfConfigService) {

    this.today = this.calendar.getToday();

    forkJoin([
      this.configService.observableConfig.subscribe(
        data => {
          this.config = data;
        }
      ),

      this.subject.observableObservation.subscribe(
        (observation) => {
          this.observation = observation;
          if (!this.involved) {
            this.involved = [...this.observation.involved];
            this.involved.forEach(person => {
              this.involvedService.add(person.id, person.full_name || person.tmp_name || undefined);
            });
          }
        })
    ]);
  }


  ngOnInit() {
  }

  onChange(event) {
    /**
    Check if adding or removing - kkeping involved subject updated
    map array of objects to array of id's not in array of ids for the shorter array of objects
    **/
    if (this.observation.involved.length > this.involved.length) { // Remove
      this.involvedService.remove(this.observation.involved.map(item => item.id).filter(x => this.involved.map(i => i.id).indexOf(x) < 0)[0]);
    } else if (this.observation.involved.length < this.involved.length) { // Add
      this.involvedService.add(
        this.involved.map(item => item.id).filter(x => this.observation.involved.map(i => i.id).indexOf(x) < 0)[0],
        this.involved.map(item => item.tmp_name || undefined).filter(x => this.observation.involved.map(i => i.tmp_name || undefined).indexOf(x) < 0)[0]
      );
      if(!this.involved?.data) {
        this.involved['data'] = {};
      }
    }
    //.map(({ id }) => id)

    this.observation.involved = [...this.involved];
    this.observation.involved = this.observation.involved.filter((props) => {
      delete props.full_name;
      return true;
    });
    this.subject.update(this.observation);
  }

  /**
  External Remove
  **/
  onRemove(index) {
    console.log('Removal index', index, this.observation.involved[index]);
    console.log(this.observation.involved.length);
    this.deleteExternal = true; // set external flag
    this.involvedService.remove(this.involved[index]['id']);
    this.involved.splice(index, 1); // delete
    this.involved = [...this.involved]; // trigger change detection
    this.onChange(true);
  }

  public openPersonModal(template, index) {
    this.modalIndex = index;
    this.modalPerson = this.involved[index];
    if (!this.modalPerson.hasOwnProperty('data')) {
      this.modalPerson['data'] = {};
    }
    if (!this.modalPerson.data.hasOwnProperty('gear')) {
      this.modalPerson['data']['gear'] = {};
    }
    this.modalRef = this.modalService.open(template, { size: 'lg' });
  }

  modalInvolvedUpdate(index) {
    this.involved[index] = this.modalPerson;
    this.onChange(true);
    this.modalRef.close();
  }

}
