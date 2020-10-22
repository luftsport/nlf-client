import { ApiObservationFlagsInterface, ApiObservationsItem, NlfConfigItem } from 'app/api/api.interface';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { NlfConfigService } from 'app/nlf-config.service';

@Component({
  selector: 'nlf-ors-editor-flags',
  templateUrl: './ors-editor-flags.component.html',
  styleUrls: ['./ors-editor-flags.component.css']
})
export class NlfOrsEditorFlagsComponent implements OnInit {

  observation: ApiObservationsItem;
  public config: NlfConfigItem;

  constructor(
    private configService: NlfConfigService,
    private subject: NlfOrsEditorService) {

    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
      }
    );
    this.subject.observableObservation.subscribe(observation => this.observation = observation);
  }

  ngOnInit() {
    if (!this.observation.hasOwnProperty('flags')) {
      this.observation['flags'] = {};
    }
  }

  onChange(event, flag) {
    console.log('Event', event, flag);
    this.subject.update(this.observation);
  }

}
