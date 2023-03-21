import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isObjEmpty } from 'app/interfaces/functions';
import { E5XPrecipitationAndOtherWeatherPhenomenaClass } from 'app/interfaces/e5x.interface';
import { faPlus, faTimes, faCheck, faEdit, faClose } from '@fortawesome/free-solid-svg-icons';import {  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-ors-editor-e5x-wxphenomena',
  templateUrl: './ors-editor-e5x-wxphenomena.component.html',
  styleUrls: ['./ors-editor-e5x-wxphenomena.component.css']
})
export class NlfOrsEditorE5xWxphenomenaComponent implements OnInit {
  @Input() wxPhenomena: any;
  @Output() wxPhenomenaChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled: boolean = false;
  modalRef;
  modalIdx: number;
  modalValue;
  _isObjEmpty = isObjEmpty;

  faPlus = faPlus;
  faTimes = faTimes;
  faCheck = faCheck;
  faEdit = faEdit;
  faClose = faClose;


  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if (!Array.isArray(this.wxPhenomena)) {
      this.wxPhenomena = [];
    }
  }

  public add() {
    this.modalIdx = this.wxPhenomena.length;
  }

  public delete(idx) {
    this.wxPhenomena.splice(idx, 1);
    this.update();
  }

  public openModal(template, idx) {
    this.modalIdx = idx;
    if (this.modalIdx === this.wxPhenomena.length) {
      this.modalValue = new E5XPrecipitationAndOtherWeatherPhenomenaClass().precipitationAndOtherWeatherPhenomena;
    } else {
      this.modalValue = this.wxPhenomena[this.modalIdx];
    }
    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  update() {
    this.wxPhenomenaChange.emit(this.wxPhenomena);
    this.change.emit(true);
  }
  modalUpdate() {
    if (this.modalIdx === this.wxPhenomena.length) {
      this.wxPhenomena.push(this.modalValue);
    } else {
      this.wxPhenomena[this.modalIdx] = {...this.modalValue};
    }
    this.update();
    this.modalRef.close();
  }

}
