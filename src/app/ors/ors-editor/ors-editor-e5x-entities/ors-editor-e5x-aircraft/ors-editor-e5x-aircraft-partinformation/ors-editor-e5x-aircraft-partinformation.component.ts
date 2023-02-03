import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { E5XAircraftClass } from 'app/interfaces/e5x.interface';
import { faPlus, faTimes, faCheck, faEdit, faClose } from '@fortawesome/free-solid-svg-icons';import {  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-ors-editor-e5x-aircraft-partinformation',
  templateUrl: './ors-editor-e5x-aircraft-partinformation.component.html',
  styleUrls: ['./ors-editor-e5x-aircraft-partinformation.component.css']
})
export class NlfOrsEditorE5XPartinformationComponent implements OnInit {
  @Input() partinformation: any;
  @Input() callsign: string;
  @Output() partinformationChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled = false;

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
    if (!Array.isArray(this.partinformation)) {
      this.partinformation = [];
    }
  }

  public add() {
    this.modalIdx = this.partinformation.length;
  }

  public delete(idx) {
    this.partinformation.splice(idx, 1);
    this.update();
  }

  public openModal(template, idx) {
    this.modalIdx = idx;
    if (this.modalIdx === this.partinformation.length) {
      this.modalValue = new E5XAircraftClass().partInformation ;
    } else {
      this.modalValue = this.partinformation[this.modalIdx];
    }
    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  update() {
    this.partinformationChange.emit(this.partinformation);
    this.change.emit(true);
  }
  modalUpdate() {
    if (this.modalIdx === this.partinformation.length) {
      this.partinformation.push(this.modalValue);
    } else {
      this.partinformation[this.modalIdx] = {...this.modalValue};
    }
    this.update();
    this.modalRef.close();
  }

}
