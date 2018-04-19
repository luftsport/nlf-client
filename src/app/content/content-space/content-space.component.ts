import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiContentService } from './../../api/api-content.service';
import { ApiContentItem, ApiContentList, ApiOptionsInterface } from './../../api/api.interface';
import { TableConfig, TableEventObject } from './../../interfaces/ngx-easy-table.interface';
import { ConfirmService } from './../../services/confirm/confirm.service';


@Component({
  selector: 'nlf-content-space',
  templateUrl: './content-space.component.html',
  styleUrls: ['./content-space.component.css']
})
export class NlfContentSpaceComponent implements OnInit {

  dataReady = false;
  spacelist: ApiContentItem[];
  space: Object;

  columns = [
    { key: 'title', title: 'Tittel', sort: true },
    { key: '_updated', title: 'Oppdatert', sort: true },
    { key: 'owner', title: 'Av', sort: true },
    {title: 'Operations'}
  ];

  pagination = {
    limit: 10,
    offset: 0,
    count: null,
  };

  sort: Array<Object> = [{ 'id': -1 }];

  tableSpaces: TableConfig = {
    searchEnabled: false,
    headerEnabled: true,
    orderEnabled: true,
    globalSearchEnabled: false,
    paginationEnabled: true,
    exportEnabled: true,
    clickEvent: false,
    selectRow: true,
    selectCol: false,
    selectCell: false,
    rows: 10,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: false,
    groupRows: false,
    paginationRangeEnabled: true
  };

  constructor(private apiContent: ApiContentService,
              private confirmService: ConfirmService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.getSpace(params['space_key']);
      });

  }

  private getSpace(space_key: string) {

    const options: ApiOptionsInterface = {
      query: {
        where: { space_key: space_key}
      },
    };
    this.apiContent.getContentList(options).subscribe(
      data => {
        this.spacelist = data._items;

        this.space = this.spacelist.filter( (item: ApiContentItem) => {
          if (!item.parent) {
            return item;
          }
        })[0];
        console.log('Item', this.space);
      },
      err => console.log(err),
      () => this.dataReady = true
    );

  }

}
