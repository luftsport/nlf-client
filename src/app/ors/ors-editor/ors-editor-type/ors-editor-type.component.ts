import { Component, OnInit, Inject } from '@angular/core';
import { NLF_CONFIG, NlfConfig } from '../../../nlf-config.module';
import { NlfOrsEditorService } from '../ors-editor.service';
import {  ApiObservationsItem } from '../../../api/api.interface';

@Component({
  selector: 'nlf-ors-editor-type',
  templateUrl: './ors-editor-type.component.html',
  styleUrls: ['./ors-editor-type.component.css']
})
export class NlfOrsEditorTypeComponent implements OnInit {

  observation: ApiObservationsItem;

  constructor(@Inject(NLF_CONFIG) public config: NlfConfig,
              private subject: NlfOrsEditorService) {

    this.subject.observableObservation.subscribe(observation => this.observation = observation);

  }

  onChange(): void {
    this.subject.update(this.observation);
  }

  ngOnInit() {
  }

}
