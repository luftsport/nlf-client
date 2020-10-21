import { Component } from '@angular/core';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiObservationsItem } from 'app/api/api.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nlf-ors-editor-debug',
  templateUrl: './ors-editor-debug.component.html',
  styleUrls: ['./ors-editor-debug.component.css']
})
export class NlfOrsEditorDebugComponent {

  public observation: ApiObservationsItem;

  constructor(
    private subject: NlfOrsEditorService,
    public activeModal: NgbActiveModal
  ) {

    this.subject.observableObservation.subscribe(observation => {

      this.observation = observation;
    });
  }
}
