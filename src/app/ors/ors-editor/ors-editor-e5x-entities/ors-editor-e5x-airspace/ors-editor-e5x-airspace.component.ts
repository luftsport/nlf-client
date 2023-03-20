import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { E5XAirspaceClass} from 'app/interfaces/e5x.interface';
import { faPlus, faTimes, faCheck, faEdit, faClose } from '@fortawesome/free-solid-svg-icons';import {  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-ors-editor-e5x-airspace',
  templateUrl: './ors-editor-e5x-airspace.component.html',
  styleUrls: ['./ors-editor-e5x-airspace.component.css']
})
export class NlfOrsEditorE5xAirspaceComponent implements OnInit {

  @Input() airspace;
  @Output() airspaceChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled: boolean = false;

  modalRef;
  modalIdx: number;
  modalValue;

  faPlus = faPlus;
  faTimes = faTimes;
  faCheck = faCheck;
  faEdit = faEdit;
  faClose = faClose;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if (!Array.isArray(this.airspace)) {
      this.airspace = [];
    }
  }

  public add() {
    this.modalIdx = this.airspace.length;
  }

  public delete(idx) {
    this.airspace.splice(idx, 1);
    this.update();
  }

  public openModal(template, idx) {
    this.modalIdx = idx;
    if (this.modalIdx === this.airspace.length) {
      this.modalValue = new E5XAirspaceClass().airSpace;
    } else {
      this.modalValue = this.airspace[this.modalIdx];
    }
    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  update() {
    this.airspaceChange.emit(this.airspace);
    this.change.emit(true);
  }
  modalUpdate() {
    if (this.modalIdx === this.airspace.length) {
      this.airspace.push(this.modalValue);
    } else {
      this.airspace[this.modalIdx] = {...this.modalValue};
    }
    this.update();
    this.modalRef.close();
  }

}
