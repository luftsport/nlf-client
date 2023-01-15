import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ApiContentService } from 'app/api/api-content.service';
import { Router } from '@angular/router';
import { ApiOptionsInterface, ApiContentItem } from 'app/api/api.interface';


/**
  export interface RowData extends GtRow {
  id: string;
  title: string;
  slug: string;
  space_key: string;
  parent: string;
}
*/

@Component({
  selector: 'nlf-content-last',
  templateUrl: './content-last.component.html',
  styleUrls: ['./content-last.component.css']
})
export class NlfContentLastComponent implements OnInit {

  @Input() space_key: string;
  @Input() number?: number;

  public data: Array<any> = [];


  //@Output() data = new EventEmitter();

  // @ViewChild(GenericTableComponent)
  // private myTable: GenericTableComponent<>; //<RowData, CustomRowComponent>;
  public showColumnControls = false;
  public selectedRows = 0;


  last: ApiContentItem[] = [];
  dataReady = false;

  constructor(private apiContent: ApiContentService,
    private router: Router) {

    /** 
    this.configObject = {
      settings: [
        {objectKey: 'title', visible: true, sort: 'enable',columnOrder: 0,enabled: true},
        {objectKey: 'slug', visible: true, sort: 'enable',columnOrder: 1,enabled: true},
        {objectKey: 'space_key', visible: true, sort: 'desc',columnOrder: 2,enabled: true},
        {objectKey: 'parent', visible: true, sort: 'enable',columnOrder: 3,enabled: true},
      ],
      fields: [
        {name: 'Id', objectKey: 'title', columnClass: 'sort-string'},
        {name: 'Slug', objectKey: 'slug', columnClass: 'sort-string'},
        {name: 'Space', objectKey: 'space_key', columnClass: 'sort-string'},
        {name: 'Parent', objectKey: 'parent', columnClass: 'sort-string'},
      ],
      data: []
              }
              **/
  }


  ngOnInit() {

    if (!!this.number) {
      this.number = 5;
    }

    const options: ApiOptionsInterface = {
      query: {
        where: { space_key: this.space_key },
        projection: { _id: 1, title: 1, slug: 1, space_key: 1, parent: 1 },
        sort: [{ _updated: -1 }],
        max_results: this.number,
      },
    };
    this.apiContent.getContentList(options).subscribe(
      data => {
        //this.configObject.data = data._items;
        this.last = data._items;
      },
      err => console.log(err),
      () => this.dataReady = true
    );
  }

}
