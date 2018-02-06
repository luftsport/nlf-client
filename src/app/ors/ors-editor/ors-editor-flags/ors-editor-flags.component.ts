import { ApiObservationFlagsInterface, ApiObservationsItem } from './../../../api/api.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NlfOrsEditorService } from '../ors-editor.service';

@Component({
  selector: 'nlf-ors-editor-flags',
  templateUrl: './ors-editor-flags.component.html',
  styleUrls: ['./ors-editor-flags.component.css']
})
export class NlfOrsEditorFlagsComponent implements OnInit {

  observation: ApiObservationsItem;

  constructor(private subject: NlfOrsEditorService) {
    this.subject.observableObservation.subscribe(observation => this.observation = observation);
  }

  ngOnInit() {
  }

  onChange(event) {
    this.subject.update(this.observation);
  }

}
