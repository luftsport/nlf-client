import { Injectable } from '@angular/core';
import { Config, STYLE, THEME } from 'ngx-easy-table';

export const DefaultTableConfig = {
  additionalActions: false,
  checkboxes: false,
  clickEvent: true,
  collapseAllRows: false,
  detailsTemplate: false,
  draggable: false,
  exportEnabled: false,
  fixedColumnWidth: false,
  groupRows: false,
  headerEnabled: true,
  horizontalScroll: false,
  isLoading: false,
  logger: false,
  orderEnabled: true,
  orderEventOnly: false,
  paginationEnabled: true,
  paginationMaxSize: 5,
  paginationRangeEnabled: true,
  persistState: true,
  resizeColumn: false,
  rows: 10,
  searchEnabled: false,
  selectCell: false,
  selectCol: false,
  selectRow: false,
  serverPagination: false,
  showContextMenu: false,
  showDetailsArrow: false,
  threeWaySort: false,
  tableLayout: {
    borderless: false,
    hover: true,
    striped: true,
    style: "tiny",
    theme: "bootstrap"
  }

}

export interface TableConfig {
  searchEnabled?: boolean;
  headerEnabled?: boolean;
  orderEnabled?: boolean;
  globalSearchEnabled?: boolean;
  paginationEnabled?: boolean;
  exportEnabled?: boolean;
  clickEvent?: boolean;
  selectRow?: boolean;
  selectCol?: boolean;
  selectCell?: boolean;
  rows?: number;
  additionalActions?: boolean;
  serverPagination?: boolean;
  isLoading?: boolean;
  detailsTemplate?: boolean;
  groupRows?: boolean;
  paginationRangeEnabled?: boolean;
  collapseAllRows?: boolean;
  checkboxes?: boolean;
  resizeColumn?: boolean;
  fixedColumnWidth?: boolean;
  horizontalScroll?: boolean;
  draggable?: boolean;
  logger?: boolean;
  showDetailsArrow?: boolean;
  showContextMenu?: boolean;
  persistState?: boolean;
  paginationMaxSize?: number;
  tableLayout?: any;
  threeWaySort?: boolean;
}

export interface TableEventObject {
  event: string;
  value?: any;
}
