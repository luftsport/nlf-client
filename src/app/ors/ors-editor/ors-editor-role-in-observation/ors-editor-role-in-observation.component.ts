import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiOptionsInterface, ApiObservationsItem, NlfConfigItem } from 'app/api/api.interface';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';

@Component({
  selector: 'nlf-ors-editor-role-in-observation',
  templateUrl: './ors-editor-role-in-observation.component.html',
  styleUrls: ['./ors-editor-role-in-observation.component.css']
})
export class NlfOrsEditorRoleInObservationComponent implements OnInit {

  @Input() activity: string;
  @Input() role: string;
  @Input() disable: boolean = false;
  @Output() roleChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  public config: NlfConfigItem;
  public observation: ApiObservationsItem;
  //public activity_config;

  constructor(
    private subject: NlfOrsEditorService,
    private configService: NlfConfigService
  ) {

   /** this.subject.observableObservation.subscribe(
      observation => {
        this.observation = observation;
      });
 */
    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
        //this.activity_config = this.config[this.activity]
      }
    );
  }

  update(event) {
    // this.subject.update(this.observation);
    this.roleChange.emit(this.role);
    this.change.emit(true);
  }

  ngOnInit(): void {
  }

}
