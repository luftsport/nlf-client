import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiContentService } from 'app/api/api-content.service';
import { ApiContentItem, ApiContentList, ApiOptionsInterface } from 'app/api/api.interface';
import { TableConfig, TableEventObject } from 'app/interfaces/ngx-easy-table.interface';
import { ConfirmService } from 'app/services/confirm/confirm.service';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { faSitemap, faFile, faClose, faEdit, faPlus, faBan, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-content-space',
  templateUrl: './content-space.component.html',
  styleUrls: ['./content-space.component.css']
})
export class NlfContentSpaceComponent implements OnInit {

  faSitemap = faSitemap;
  faFile = faFile;
  faClose = faClose;
  faEdit = faEdit;
  faPlus = faPlus;
  faBan = faBan;
  faCheck = faCheck;

  dataReady = false;
  error = false;
  spacelist: ApiContentItem[];
  space: Object;
  space_key: string;

  columns = [
    { key: 'title', title: 'Tittel', sort: true },
    { key: '_updated', title: 'Oppdatert', sort: true },
    { key: 'owner', title: 'Av', sort: true },
    { title: 'Operations' }
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
    paginationRangeEnabled: true,
    tableLayout: {
      style: 'normal', // or big or tiny
      theme: 'normal', // or dark
      border: true,
      hover: true,
      striped: false,
    }
  };

  constructor(private apiContent: ApiContentService,
    private confirmService: ConfirmService,
    private route: ActivatedRoute,
    private alertService: NlfAlertService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.space_key = params['space_key'];
        this.getSpace();
      });

  }

  private getSpace() {
    this.dataReady = false;
    const options: ApiOptionsInterface = {
      query: {
        where: { space_key: this.space_key }
      },
    };
    this.apiContent.getContentList(options).subscribe(
      data => {
        this.spacelist = data._items;

        this.space = this.spacelist.filter((item: ApiContentItem) => {
          if (!item.parent) {
            return item;
          }
        })[0];
        console.log('Item', this.space);
        this.dataReady = true
      },
      err => {
        console.log(err);
        this.alertService.error('Error message: ' + err.error._error.code + ': ' + err.error._error.message);
        this.error = true;
      },
      () => { }
    );

  }

  public delete(row) {
    this.apiContent.remove(row['_id'], row['_etag']).subscribe(
      data => {
        this.getSpace();
      },
      err => {
        this.alertService.error('Error message: ' + err.error._error.code + ': ' + err.error._error.message);
      }
    )
  }

  public unpublish(_id: string) {
    this.apiContent.unpublish(_id).subscribe(
      data => {
        this.getSpace();
      },
      err => {
        console.log(err);
        this.alertService.error('Error message: ' + err.error._error.code + ': ' + err.error._error.message);
      }
    )
  }

  public publish(_id: string) {
    this.apiContent.publish(_id).subscribe(
      data => {
        this.getSpace();
      },
      err => {
        this.alertService.error('Error message: ' + err.error._error.code + ': ' + err.error._error.message);
      }
    )
  }

  public eventEmitted(event) {
    console.log(event);
  }

}
