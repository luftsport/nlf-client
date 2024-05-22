import { Component, Input, OnInit } from '@angular/core';
import { faAmbulance, faGavel, faMinusSquare, faPlusSquare, faRandom } from '@fortawesome/free-solid-svg-icons';
import { ApiObservationComponentInterface } from 'app/api/api.interface';
import { isEmpty } from 'lodash';


@Component({
  selector: 'nlf-report-components-timeline',
  templateUrl: './report-components-timeline.component.html',
  styleUrls: ['./report-components-timeline.component.css']
})
export class NlfOrsReportComponentsTimelineComponent implements OnInit {

  @Input() components: ApiObservationComponentInterface[];
  @Input() activity: string;
  @Input() componentCollapsed = false;

  faRandom = faRandom;
  faAmbulance = faAmbulance;
  faGavel = faGavel;
  faPlusSquare = faPlusSquare;
  faMinusSquare = faMinusSquare;

  constructor() { }

  ngOnInit() {
  }

  private _isEmpty(component) {
    if (
      (component.what == '' || !component.what)
      &&
      (component.how == '' || !component.how)
      &&
      (component.involved.length == 0)
      &&
      (isEmpty(component.attributes))
      &&
      (isEmpty(component.flags))
      &&
      (isEmpty(component.where))
    ) {
      return true;
    }

    return false;
  }

  public filter_empty(components) {
    return this.components.filter(x => !this._isEmpty(x));
  }

}
