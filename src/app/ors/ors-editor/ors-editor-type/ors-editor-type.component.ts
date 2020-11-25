import { Component, OnInit, Inject, Input } from '@angular/core';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiObservationsItem, NlfConfigItem } from 'app/api/api.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'nlf-ors-editor-type',
  templateUrl: './ors-editor-type.component.html',
  styleUrls: ['./ors-editor-type.component.css']
})
export class NlfOrsEditorTypeComponent implements OnInit {

  observation: ApiObservationsItem;

  /**
  For config:
  "unsafe_act" : {
      "label" : "Utrygg adferd",
      "badge" : "secondary",
      "title" : "Utrygge eller farlige forhold"
  },
  "unsafe_condition" : {
      "label" : "Utrygge forhold",
      "badge" : "secondary",
      "title" : "Utrygg eller farlig adferd"
  },

  "unsafe_act",
  "unsafe_condition", 
  **/

  @Input() title: boolean = false;
  public config: NlfConfigItem;

  constructor(
    private configService: NlfConfigService,
    private subject: NlfOrsEditorService) {

    forkJoin([
      this.subject.observableObservation.subscribe(
        observation => {
          this.observation = observation
        }
      ),

      this.configService.observableConfig.subscribe(
        data => {
          this.config = data;
        }
      )
    ]);

  }

  onChange(): void {
    this.subject.update(this.observation);
  }

  ngOnInit() {
  }

}
