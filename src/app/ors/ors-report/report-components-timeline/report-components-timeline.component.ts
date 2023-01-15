import { Component, Input, OnInit } from '@angular/core';
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

  public componentCollapsed = false;

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
