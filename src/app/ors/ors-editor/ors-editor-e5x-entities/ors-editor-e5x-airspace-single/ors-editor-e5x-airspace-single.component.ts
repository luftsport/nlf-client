import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { E5XAirspaceClass} from 'app/interfaces/e5x.interface';
import { isEmpty } from 'lodash';

@Component({
  selector: 'nlf-ors-editor-e5x-airspace-single',
  templateUrl: './ors-editor-e5x-airspace-single.component.html',
  styleUrls: ['./ors-editor-e5x-airspace-single.component.css']
})
export class NlfOrsEditorE5xAirspaceSingleComponent implements OnInit {

  @Input() airspace;
  @Output() airspaceChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled: boolean = false;

  modalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if (isEmpty(this.airspace)) {
      this.airspace = new E5XAirspaceClass().airSpace;
    }
  }

  public openModal(template) {

    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  update() {
    this.airspaceChange.emit(this.airspace);
    this.change.emit(true);
  }

  modalUpdate() {
    this.update();
    this.modalRef.close();
  }

}
