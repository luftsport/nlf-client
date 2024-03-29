import { Component, OnInit, Input } from '@angular/core';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { ApiObservationsModellflyItem, ApiOptionsInterface, ApiObservationModellflyOrganizationInterface } from 'app/api/api.interface';
import { NlfOrsEditorInvolvedService, NlfOrsEditorInvolvedInterface } from 'app/ors/ors-editor/ors-editor-involved.service';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';

@Component({
  selector: 'nlf-ors-modellfly-editor-organization',
  templateUrl: './ors-modellfly-editor-organization.component.html',
  styleUrls: ['./ors-modellfly-editor-organization.component.css']
})
export class NlfOrsModellflyEditorOrganizationComponent implements OnInit {

  observation: ApiObservationsModellflyItem;
  involved;
  devDebug: boolean = false;

  faExclamation = faExclamation;

  constructor(
    private subject: NlfOrsEditorService,
    private involvedSubject: NlfOrsEditorInvolvedService
  ) {

    // Subscribe to involved:
    this.involvedSubject.currentArr.subscribe(
      (list) => {
        this.involved = list;
      },
    );

    // Subscribe to observation
    this.subject.observableObservation.subscribe(
      (observation) => {
        this.observation = observation;
        try {
          this.updateInvolved();
        } catch (e) {}
      });
  }

  ngOnInit() {


  }

  private updateInvolved() {
    Object.keys(this.observation.organization).forEach(
      (key) => {
        console.log('KEY', key);
        if (!!this.observation.organization[key]) {

          this.observation.organization[key].forEach(
            (person) => {
              if (Number.isInteger(person)) {
                this.involvedSubject.add(person);
              } else {
                this.involvedSubject.add(person['id'], person['full_name'] || person['tmp_name'] || undefined); //, person['full_name'] || person['tmp_name'] || undefined); // || person['tmp_name'] || undefined);
              }
            }
          );
        }
      }
    );
  }

  public update(event) {
    this.updateInvolved();
    this.subject.update(this.observation);
  }

  public add(event) {
    console.log('Adding', event);
  }

}
