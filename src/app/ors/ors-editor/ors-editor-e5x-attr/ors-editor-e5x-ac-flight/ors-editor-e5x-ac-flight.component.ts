import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isObjEmpty } from 'app/interfaces/functions';
import { E5XAircraftClass } from 'app/interfaces/e5x.interface';

@Component({
  selector: 'nlf-ors-editor-e5x-ac-flight',
  templateUrl: './ors-editor-e5x-ac-flight.component.html',
  styleUrls: ['./ors-editor-e5x-ac-flight.component.css']
})
export class NlfOrsEditorE5XAcFlightComponent implements OnInit {
  @Input() attr: any;
  @Input() callsign: string;
  @Input() showOnlyBtn: boolean = true;
  @Input() modal: boolean = true;
  @Output() attrChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled: boolean = false;
  modalRef;
  _isObjectEmpty = isObjEmpty;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if(!this.attr) {
      this.attr = new E5XAircraftClass().aircraft.attributes;
    }
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
