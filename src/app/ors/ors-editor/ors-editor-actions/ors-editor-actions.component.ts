import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiObservationActionsInterface, ApiObservationsItem } from '../../../api/api.interface';
import { NlfOrsEditorService } from '../ors-editor.service';



@Component({
  selector: 'nlf-ors-editor-actions',
  templateUrl: './ors-editor-actions.component.html',
  styleUrls: ['./ors-editor-actions.component.css']
})
export class NlfOrsEditorActionsComponent implements OnInit {

  //@Input() actions: ApiObservationActionsInterface;
  //@Output() actionsChange: EventEmitter<ApiObservationActionsInterface> = new EventEmitter<ApiObservationActionsInterface>();
  actionCentral = '';
  actionLocal = '';
  dataReady = false;
  observation: ApiObservationsItem;
  /**
  Mentions:
  import { NlfOrsEditorService } from './../ors-editor.service';
  list;
  mconf = { triggerChar: '@', maxItems: 10, labelKey: 'fullname', mentionSelect: this.format };

  private data: NlfOrsEditorService
  this.data.currentArr.subscribe(list => this.list = list);
*/
  constructor(private subject: NlfOrsEditorService) {
    this.subject.observableObservation.subscribe(observation => this.observation = observation);

  }

  ngOnInit() {
    if (typeof this.observation.actions === 'undefined') {
      this.observation.actions = { local: [], central: [] };
    }

    if (typeof this.observation.actions.local === 'undefined') {
      this.observation.actions.local = [];
    }

    if (typeof this.observation.actions.central === 'undefined') {
      this.observation.actions.central = [];
    }

    this.dataReady = true;
  }

  /** Mentions
  format(event) {
    console.log(event);
    return '<macro contenteditable="false" class="badge badge-info" id="' + event.id + '">' + event.fullname + '</macro>';
  }
  **/

  onChange(event) {
    // this.observation.actionsChange.emit(event);
    this.subject.update(this.observation);
  }

  addActionLocal(action) {
    if (action.length > 0) {
      this.observation.actions.local.push(action);
      this.actionLocal = '';
      this.subject.update(this.observation);
      // this.observation.actionsChange.emit(this.observation.actions);
    }
  }

  addActionCentral(action) {
    if (action.length > 0) {
      this.observation.actions.central.push(action);
      this.actionCentral = '';
      this.subject.update(this.observation);
      // this.observation.actionsChange.emit(this.observation.actions);
    }
  }

  removeActionLocal(index) {

    this.observation.actions.local.splice(index, 1);
    this.subject.update(this.observation);
    // this.observation.actionsChange.emit(this.observation.actions);
  }

  removeActionCentral(index) {

    this.observation.actions.central.splice(index, 1);
    this.subject.update(this.observation);
    // this.observation.actionsChange.emit(this.observation.actions);
  }


}
