import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'nlf-resolve-observation-tags',
  templateUrl: './resolve-observation-tags.component.html',
  styleUrls: ['./resolve-observation-tags.component.css']
})
export class NlfResolveObservationTagsComponent implements OnInit {

  @Input() tags: Array<string>;
  @Input() activity: string;
  @Input() seperator?: string;
  @Input() link?: boolean = true;

  url = '/ors/fallskjerm/search/tag/';
  html = [];

  constructor() { }

  ngOnInit() {


    /**
    if (typeof this.tags !== 'undefined' && this.tags.length > 0) {
      if (typeof this.seperator === 'undefined') {
        this.seperator = ' ';
      }

      for (let t of this.tags) {
        if (!!t && t.trim().length > 0) {

          if (!!this.link) {
            this.html.push('<a [routerLink]="[url,t]"]>' + t + '</a>');
          } else {
            this.html.push(t);
          }
        }
      }
    }*/
  }

  public stringify(text) {
    return JSON.stringify(text);
  }

}
