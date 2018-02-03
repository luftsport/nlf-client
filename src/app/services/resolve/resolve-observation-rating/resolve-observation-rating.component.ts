import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nlf-resolve-observation-rating',
  templateUrl: './resolve-observation-rating.component.html',
  styleUrls: ['./resolve-observation-rating.component.css']
})
export class NlfResolveObservationRatingComponent implements OnInit {

  @Input() rating;

  constructor() { }


  ngOnInit() {
  }

}
