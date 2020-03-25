import { Component, OnInit, Inject } from '@angular/core';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { NlfConfigService } from 'app/nlf-config.service';
import { ApiObservationsItem, NlfConfigItem } from 'app/api/api.interface';


@Component({
  selector: 'nlf-ors-editor-operational',
  templateUrl: './ors-editor-operational.component.html',
  styleUrls: ['./ors-editor-operational.component.css']
})
export class NlfOrsEditorOperationalComponent implements OnInit {

  observation: ApiObservationsItem;
  public config: NlfConfigItem;


  constructor(
    private configService: NlfConfigService,
    private subject: NlfOrsEditorService) {

    this.subject.observableObservation.subscribe(observation => this.observation = observation);
    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
      }
    );
  }

  ngOnInit() {
    if (!this.observation.hasOwnProperty('operational')) {
      this.observation['operational'] = { club: true, op: true, jumping: true };
    }
  }

  onChange(event) {
    this.subject.update(this.observation);
  }

}
