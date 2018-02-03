import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { ApiObservationRatingInterface } from '../../../api/api.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nlf-ors-editor-rating',
  templateUrl: './ors-editor-rating.component.html',
  styleUrls: ['./ors-editor-rating.component.css']
})
export class NlfOrsEditorRatingComponent implements OnInit {

  @Input() rating: ApiObservationRatingInterface;
  @Output() ratingChange: EventEmitter<ApiObservationRatingInterface> = new EventEmitter<ApiObservationRatingInterface>();

  otherRating: ApiObservationRatingInterface;

  modalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.otherRating = Object.assign({}, this.rating);
  }

  onChange(event) {
    this.otherRating = Object.assign({}, this.rating);

    this.ratingChange.emit(this.rating);

  }

  openModal(template: TemplateRef<any>) {
   this.modalRef = this.modalService.open(template, {size: 'lg'});
  }
}
