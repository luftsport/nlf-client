import { Component, OnInit } from '@angular/core';
import { NlfOrsEditorService } from '../ors-editor.service';
import { ApiObservationsItem } from '../../../api/api.interface';

@Component({
  selector: 'app-ors-editor-location',
  templateUrl: './ors-editor-location.component.html',
  styleUrls: ['./ors-editor-location.component.css']
})
export class OrsEditorLocationComponent implements OnInit {

  observation: ApiObservationsItem;

  constructor(private subject: NlfOrsEditorService) {
    this.subject.observableObservation.subscribe(observation => this.observation = observation);

    // this.subject.update(this.observation);
  }

  ngOnInit() {
  }

}
