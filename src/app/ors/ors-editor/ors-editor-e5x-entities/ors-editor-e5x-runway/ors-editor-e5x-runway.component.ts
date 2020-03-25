import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { E5XRunwayIncursionClass } from 'app/interfaces/e5x.interface';

@Component({
  selector: 'nlf-ors-editor-e5x-runway',
  templateUrl: './ors-editor-e5x-runway.component.html',
  styleUrls: ['./ors-editor-e5x-runway.component.css']
})
export class NlfOrsEditorE5XRunwayComponent implements OnInit {
  @Input() runway: any;
  @Output() runwayChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled: boolean = false;
  modalRef;
  modalIdx: number;
  modalValue;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if (!Array.isArray(this.runway)) {
      this.runway = [];
    }
  }

  public add() {
    this.modalIdx = this.runway.length;
  }

  public delete(idx) {
    this.runway.splice(idx, 1);
    this.update();
  }

  public openModal(template, idx) {
    this.modalIdx = idx;
    if (this.modalIdx === this.runway.length) {
      this.modalValue = new E5XRunwayIncursionClass().runwayIncursion;
    } else {
      this.modalValue = this.runway[this.modalIdx];
    }
    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  update() {
    this.runwayChange.emit(this.runway);
    this.change.emit(true);
  }
  modalUpdate() {
    if (this.modalIdx === this.runway.length) {
      this.runway.push(this.modalValue);
    } else {
      this.runway[this.modalIdx] = {...this.modalValue};
    }
    this.update();
    this.modalRef.close();
  }

}
