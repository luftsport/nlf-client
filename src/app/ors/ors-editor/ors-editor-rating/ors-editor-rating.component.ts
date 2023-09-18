import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { ApiObservationRatingInterface, ApiObservationsItem } from 'app/api/api.interface';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { calculateRating } from 'app/interfaces/functions';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'nlf-ors-editor-rating',
  templateUrl: './ors-editor-rating.component.html',
  styleUrls: ['./ors-editor-rating.component.css']
})
export class NlfOrsEditorRatingComponent implements OnInit {

  observation: ApiObservationsItem;

  modalRef;
  hover_potential;
  hover_actual;

  faExclamationTriangle = faExclamationTriangle;

  constructor(private subject: NlfOrsEditorService) {
    this.subject.observableObservation.subscribe(observation => this.observation = observation);
  }

  onHoverPotential(rating) {
    this.hover_potential = rating;
  }
  onHoverActual(rating) {
    this.hover_actual = rating;
  }

  onHoverLeave() {
    this.hover_potential = undefined;
    this.hover_actual = undefined;
  }

  ngOnInit() {
  }

  onChange() {
    console.log('Rating updating now oboy');
    this.observation.rating['_rating'] = calculateRating(this.observation.rating['actual'], this.observation.rating['potential']);
    this.subject.update(this.observation);
  }

}
