import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isObjEmpty } from 'app/interfaces/functions';

@Component({
  selector: 'nlf-ors-editor-e5x-injuries',
  templateUrl: './ors-editor-e5x-injuries.component.html',
  styleUrls: ['./ors-editor-e5x-injuries.component.css']
})
export class NlfOrsEditorE5XInjuriesComponent implements OnInit {
  @Input() attr: any;
  @Input() showModal: boolean = false;
  @Input() showOnlyBtn: boolean = true;
  @Output() attrChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled: boolean = false;
  modalRef;
  _isObjEmpty = isObjEmpty;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }

  public openModal(template) {

    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  update() {
    this.attrChange.emit(this.attr);
    this.change.emit(true);
  }

  modalUpdate() {

    this.update();
    this.modalRef.close();
  }

}
