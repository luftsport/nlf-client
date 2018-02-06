import { Component, OnInit } from '@angular/core';
import { ApiObservationsItem } from '../../../api/api.interface';
import { NlfOrsEditorService } from '../ors-editor.service';

@Component({
  selector: 'nlf-ors-editor-involved',
  templateUrl: './ors-editor-involved.component.html',
  styleUrls: ['./ors-editor-involved.component.css']
})
export class NlfOrsEditorInvolvedComponent implements OnInit {

  observation: ApiObservationsItem;

  constructor(private subject: NlfOrsEditorService) {
    this.subject.observableObservation.subscribe(observation => this.observation = observation);
  }
  // this.subject.update(this.observation);

  ngOnInit() {
  }

}
