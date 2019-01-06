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
}

export interface TableEventObject {
    event: string;
    value?: any;
}
