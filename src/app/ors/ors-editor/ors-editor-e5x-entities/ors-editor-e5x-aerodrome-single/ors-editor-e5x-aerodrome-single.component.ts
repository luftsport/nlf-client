import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { E5XAerodromeGeneralClass } from 'app/interfaces/e5x.interface';
import { faPlane, faPlus, faTimes, faCheck, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-ors-editor-e5x-aerodrome-single',
  templateUrl: './ors-editor-e5x-aerodrome-single.component.html',
  styleUrls: ['./ors-editor-e5x-aerodrome-single.component.css']
})
export class NlfOrsEditorE5XAerodromeSingleComponent implements OnInit {

  faPlane = faPlane;
  faPlus = faPlus;
  faTimes = faTimes;
  faCheck = faCheck;
  faClose = faClose;

  @Input() aerodrome: any;
  @Output() aerodromeChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled: boolean = false;
  modalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if (!this.aerodrome) {
      this.aerodrome = new E5XAerodromeGeneralClass().aerodromeGeneral;
    }
  }

  public addRunway() {
    this.aerodrome.entities.runway.push(new E5XAerodromeGeneralClass().runway);
  }

  public deleteRunway(idx) {
    this.aerodrome.entities.runway.splice(idx, 1);
  }

  public addVehicle() {
    this.aerodrome.entities.vehicle.push(new E5XAerodromeGeneralClass().vehicle);
  }

  public deleteVehicle(idx) {
    this.aerodrome.entities.vehicle.splice(idx, 1);
  }

  public addNarrative() {
    if (this.aerodrome.entities.narrative.length === 0) {
      this.aerodrome.entities.narrative.push(new E5XAerodromeGeneralClass().narrative);
    }
  }
  public deleteNarrative(idx) {
    this.aerodrome.entities.narrative.splice(idx, 1);
  }

  public openModal(template) {

    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

  update() {

    this.aerodromeChange.emit(this.aerodrome);
    this.change.emit(true);
  }
  modalUpdate() {
    console.log('Aerodrome update', this.aerodrome);
    this.update();
    this.modalRef.close();
  }

}
