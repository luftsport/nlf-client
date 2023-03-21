import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounce } from 'ts-debounce';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';import {  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-ors-editor-e5x-classification',
  templateUrl: './ors-editor-e5x-classification.component.html',
  styleUrls: ['./ors-editor-e5x-classification.component.css']
})
export class NlfOrsEditorE5XClassificationComponent implements OnInit {
  @Input() attr: any;
  @Input() modal: boolean = true;
  @Output() attrChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled: boolean = false;

  modalRef;
  debouncedUpdate = debounce(this.update, 500);

  faTimes = faTimes;
  faCheck = faCheck;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }

  update() {
    this.attrChange.emit(this.attr);
    this.change.emit(true);
  }

  public openModal(template) {

    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false});
  }

  modalUpdate() {
    this.update();
    this.modalRef.close();
  }

}
