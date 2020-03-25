import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isObjEmpty } from 'app/interfaces/functions';

@Component({
  selector: 'nlf-ors-editor-e5x-weather',
  templateUrl: './ors-editor-e5x-weather.component.html',
  styleUrls: ['./ors-editor-e5x-weather.component.css']
})
export class NlfOrsEditorE5XWeatherComponent implements OnInit {

  @Input() attr: any; // Occurrence.attributes
  @Input() modal: boolean = false;
  @Input() showOnlyBtn: boolean = true;
  @Output() attrChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled: boolean = false;

  modalRef;
  _isObjectEmpty = isObjEmpty;

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
