import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { E5XSeparationClass } from 'app/interfaces/e5x.interface';

@Component({
  selector: 'nlf-ors-editor-e5x-separation',
  templateUrl: './ors-editor-e5x-separation.component.html',
  styleUrls: ['./ors-editor-e5x-separation.component.css']
})
export class NlfOrsEditorE5xSeparationComponent implements OnInit {
  @Input() separation: any[] = [];
  @Output() separationChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled: boolean = false;
  modalRef;
  modalIdx: number;
  modalValue;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if (!Array.isArray(this.separation)) {
      this.separation = [];
    }
  }

  public add() {
    this.modalIdx = this.separation.length;
  }

  public delete(idx) {
    this.separation.splice(idx, 1);
    this.update();
  }

  public openModal(template, idx) {
    this.modalIdx = idx;
    if (this.modalIdx === this.separation.length) {
      this.modalValue = new E5XSeparationClass().separation;
    } else {
      this.modalValue = this.separation[this.modalIdx];
    }
    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  update() {
    this.separationChange.emit(this.separation);
    this.change.emit(true);
  }
  modalUpdate() {
    if (this.modalIdx === this.separation.length) {
      this.separation.push(this.modalValue);
    } else {
      this.separation[this.modalIdx] = { ...this.modalValue };
    }
    this.update();
    this.modalRef.close();
  }

}
