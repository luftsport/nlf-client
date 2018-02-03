import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiObservationActionsInterface } from '../../../api/api.interface';

@Component({
  selector: 'nlf-ors-editor-actions',
  templateUrl: './ors-editor-actions.component.html',
  styleUrls: ['./ors-editor-actions.component.css']
})
export class NlfOrsEditorActionsComponent implements OnInit {

  @Input() actions: ApiObservationActionsInterface;
  @Output() actionsChange: EventEmitter<ApiObservationActionsInterface> = new EventEmitter<ApiObservationActionsInterface>();
  actionCentral = '';
  actionLocal = '';
  dataReady = false;

  constructor() { }

  ngOnInit() {
    if (typeof this.actions === 'undefined') {
      this.actions = {local: [], central: []};
    }

    if (typeof this.actions.local === 'undefined') {
      this.actions.local = [];
    }

    if (typeof this.actions.central === 'undefined') {
      this.actions.central = [];
    }

    this.dataReady = true;
  }

  onChange(event) {
    this.actionsChange.emit(event);
  }

  addActionLocal(action) {

    this.actions.local.push(action);
    this.actionLocal = '';
    this.actionsChange.emit(this.actions);
  }

  addActionCentral(action) {

    this.actions.central.push(action);
    this.actionCentral = '';
    this.actionsChange.emit(this.actions);
  }

  removeActionLocal(index) {

    this.actions.local.splice(index, 1);
    this.actionsChange.emit(this.actions);
  }

  removeActionCentral(index) {

    this.actions.central.splice(index, 1);
    this.actionsChange.emit(this.actions);
  }


}
