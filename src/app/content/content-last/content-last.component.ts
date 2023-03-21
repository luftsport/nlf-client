import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ApiContentService } from 'app/api/api-content.service';
import { Router } from '@angular/router';
import { ApiOptionsInterface, ApiContentItem } from 'app/api/api.interface';

@Component({
  selector: 'nlf-content-last',
  templateUrl: './content-last.component.html',
  styleUrls: ['./content-last.component.css']
})
export class NlfContentLastComponent implements OnInit {

  @Input() space_key: string;
  @Input() number?: number;

  public data: Array<any> = [];

  public showColumnControls = false;
  public selectedRows = 0;


  last: ApiContentItem[] = [];
  dataReady = false;

  constructor(private apiContent: ApiContentService,
    private router: Router) {


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
