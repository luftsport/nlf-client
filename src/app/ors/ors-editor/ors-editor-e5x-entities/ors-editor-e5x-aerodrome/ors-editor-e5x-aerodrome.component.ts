import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { E5XAerodromeGeneralClass } from 'app/interfaces/e5x.interface';

@Component({
  selector: 'nlf-ors-editor-e5x-aerodrome',
  templateUrl: './ors-editor-e5x-aerodrome.component.html',
  styleUrls: ['./ors-editor-e5x-aerodrome.component.css']
})

export class NlfOrsEditorE5XAerodromeComponent implements OnInit {
  @Input() aerodrome: any;
  @Output() aerodromeChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled: boolean = false;
  modalRef;
  modalIdx: number;
  modalValue;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if (!Array.isArray(this.aerodrome)) {
      this.aerodrome = [];
    }
  }

  public add() {
    this.modalIdx = this.aerodrome.length;
  }

  public delete(idx) {
    this.aerodrome.splice(idx, 1);
    this.update();
  }


  public addRunway() {
    this.modalValue.entities.runway.push(new E5XAerodromeGeneralClass().runway);
  }

  public deleteRunway(idx) {
    this.modalValue.entities.runway.splice(idx, 1);
  }

  public addVehicle() {
    this.modalValue.entities.vehicle.push(new E5XAerodromeGeneralClass().vehicle);
  }
  public deleteVehicle(idx) {
    this.modalValue.entities.vehicle.splice(idx, 1);
  }

  public addNarrative() {
    if(this.modalValue.entities.narrative.length === 0) {
      this.modalValue.entities.narrative.push(new E5XAerodromeGeneralClass().narrative);
    }
  }
  public deleteNarrative(idx) {
    this.modalValue.entities.narrative.splice(idx, 1);
  }
  public openModal(template, idx) {
    this.modalIdx = idx;
    if (this.modalIdx === this.aerodrome.length) {
      this.modalValue = new E5XAerodromeGeneralClass().aerodromeGeneral;
    } else {
      this.modalValue = this.aerodrome[this.modalIdx];
    }
    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  update() {
    this.aerodromeChange.emit(this.aerodrome);
    this.change.emit(true);
  }
  modalUpdate() {
    if (this.modalIdx === this.aerodrome.length) {
      this.aerodrome.push(this.modalValue);
    } else {
      this.aerodrome[this.modalIdx] = { ...this.modalValue };
    }
    this.update();
    this.modalRef.close();
  }

}
