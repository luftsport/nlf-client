import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isObjEmpty } from 'app/interfaces/functions';

@Component({
  selector: 'nlf-ors-editor-e5x-ac-injuries',
  templateUrl: './ors-editor-e5x-ac-injuries.component.html',
  styleUrls: ['./ors-editor-e5x-ac-injuries.component.css']
})
export class NlfOrsEditorE5XAcInjuriesComponent implements OnInit {
  @Input() attr: any;
  @Input() callsign: string;
  @Output() attrChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled: boolean = false;
  modalRef;
  _isObjEmpty = isObjEmpty;

  faCheck = faCheck;
  faTimes = faTimes;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }

  public openModal(template) {

    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  modalUpdate() {

    this.attrChange.emit(this.attr);
    this.change.emit(true);
    this.modalRef.close();
  }

}
