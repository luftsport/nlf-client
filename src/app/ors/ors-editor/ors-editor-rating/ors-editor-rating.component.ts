import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { ApiObservationRatingInterface, ApiObservationsItem } from 'app/api/api.interface';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';

@Component({
  selector: 'nlf-ors-editor-rating',
  templateUrl: './ors-editor-rating.component.html',
  styleUrls: ['./ors-editor-rating.component.css']
})
export class NlfOrsEditorRatingComponent implements OnInit {

  observation: ApiObservationsItem;

  modalRef;

  constructor(private subject: NlfOrsEditorService) {
    this.subject.observableObservation.subscribe(observation => this.observation = observation);
  }

  ngOnInit() {
  }

  onChange() {
    console.log('Rating updating now oboy');
    this.subject.update(this.observation);
  }

}
