import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { E5XEventsClass } from 'app/interfaces/e5x.interface';

@Component({
  selector: 'nlf-ors-editor-e5x-events',
  templateUrl: './ors-editor-e5x-events.component.html',
  styleUrls: ['./ors-editor-e5x-events.component.css']
})
export class NlfOrsEditorE5XEventsComponent implements OnInit {
  @Input() events: any;
  @Output() eventsChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled: boolean = false;
  modalRef;
  modalIdx: number;
  modalValue;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if (!Array.isArray(this.events)) {
      this.events = [];
    }
  }

  public add() {
    this.modalIdx = this.events.length;
  }

  public delete(idx) {
    this.events.splice(idx, 1);
    this.update();
  }

  public openModal(template, idx) {
    this.modalIdx = idx;
    if (this.modalIdx === this.events.length) {
      this.modalValue = new E5XEventsClass().events;
    } else {
      this.modalValue = this.events[this.modalIdx];
    }
    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  update() {
    this.eventsChange.emit(this.events);
    this.change.emit(true);
  }
  modalUpdate() {
    if (this.modalIdx === this.events.length) {
      this.events.push(this.modalValue);
    } else {
      this.events[this.modalIdx] = {...this.modalValue};
    }
    this.update();
    this.modalRef.close();
  }

}
