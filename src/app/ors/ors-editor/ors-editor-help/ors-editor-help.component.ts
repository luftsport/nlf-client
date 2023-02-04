import { Component } from '@angular/core';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiObservationsItem } from 'app/api/api.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faSave, faHistory, faFile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-ors-editor-help',
  templateUrl: './ors-editor-help.component.html',
  styleUrls: ['./ors-editor-help.component.css']
})
export class NlfOrsEditorHelpComponent {

  public changes = false;
  public observation: ApiObservationsItem;

  faSave = faSave;
  faHistory = faHistory;
  faFile = faFile;

  constructor(private subject: NlfOrsEditorService,
    public activeModal: NgbActiveModal) {

    this.subject.observableObservation.subscribe(observation => {
      if (!!this.observation && this.observation !== observation) {
        this.changes = true;
      }
      this.observation = observation;
    });
  }
}

