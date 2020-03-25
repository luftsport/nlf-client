import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { E5XAirNavigationServiceClass } from 'app/interfaces/e5x.interface';

@Component({
  selector: 'nlf-ors-editor-e5x-atm',
  templateUrl: './ors-editor-e5x-atm.component.html',
  styleUrls: ['./ors-editor-e5x-atm.component.css']
})
export class NlfOrsEditorE5XAtmComponent implements OnInit {
  @Input() atm: any;
  @Output() atmChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled: boolean = false;
  modalRef;
  modalIdx: number;
  modalValue;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if (!Array.isArray(this.atm)) {
      this.atm = [];
    }
  }

  public add() {
    this.modalIdx = this.atm.length;
  }

  public delete(idx) {
    this.atm.splice(idx, 1);
    this.update();
  }

  public openModal(template, idx) {
    this.modalIdx = idx;
    if (this.modalIdx === this.atm.length) {
      this.modalValue = new E5XAirNavigationServiceClass().airNavigationService ;
    } else {
      this.modalValue = this.atm[this.modalIdx];
    }
    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  update() {
    this.atmChange.emit(this.atm);
    this.change.emit(true);
  }
  modalUpdate() {
    if (this.modalIdx === this.atm.length) {
      this.atm.push(this.modalValue);
    } else {
      this.atm[this.modalIdx] = {...this.modalValue};
    }
    this.update();
    this.modalRef.close();
  }

}
