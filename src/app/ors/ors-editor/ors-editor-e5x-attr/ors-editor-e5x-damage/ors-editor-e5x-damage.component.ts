import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nlf-ors-editor-e5x-damage',
  templateUrl: './ors-editor-e5x-damage.component.html',
  styleUrls: ['./ors-editor-e5x-damage.component.css']
})
export class NlfOrsEditorE5XDamageComponent implements OnInit {
  @Input() attr: any;
  @Input() showModal: boolean = false;
  @Input() showOnlyBtn: boolean = true;
  @Output() attrChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled: boolean = false;
  modalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }

  public openModal(template) {

    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  update() {

    if(!this.attr.damageNotToAC.value || [97, 99].indexOf(this.attr.damageNotToAC.value) > -1) {
      this.attr.objectDamaged.value = undefined;
      this.attr.thirdPartyDamage.value = undefined;
    }

    this.attrChange.emit(this.attr);
    this.change.emit(true);

  }

  modalUpdate() {

    this.update();
    this.modalRef.close();
  }

}
