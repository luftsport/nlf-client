import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'nlf-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class NlfDashboardComponent implements OnInit {
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  // Dummy data
  hopptyper = [{ 'name': 'Trening', 'value': 12311 },
  { 'name': 'Demo', 'value': 32 },
  { 'name': 'AFF', 'value': 1455 },
  { 'name': 'Tandem', 'value': 1732 },
  { 'name': 'Konkuranse', 'value': 855 },
  ];
  bar = [{ 'name': 'Voss', 'value': 16311 },
  { 'name': 'Tønsberg', 'value': 14243 },
  { 'name': 'Oslo', 'value': 13477 },
  { 'name': 'NTNU', 'value': 7665 },
  { 'name': 'Bergen', 'value': 1785 },
  ];

  static itemChange(item, itemComponent) {
    console.log('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.log('itemResized', item, itemComponent);
  }

  ngOnInit() {
    this.options = {
      itemChangeCallback: NlfDashboardComponent.itemChange, // callback to call for each item when is changes x, y, rows, cols.
      itemResizeCallback: NlfDashboardComponent.itemResize, // callback to call for each item when width/height changes.

      gridType: 'fit', // 'fit' will fit the items in the container without scroll;
      // 'scrollVertical' will fit on width and height of the items will be the same as the width
      // 'scrollHorizontal' will fit on height and width of the items will be the same as the height
      // 'fixed' will set the rows and columns dimensions based on fixedColWidth and fixedRowHeight options
      // 'verticalFixed' will set the rows to fixedRowHeight and columns width will fit the space available
      // 'horizontalFixed' will set the columns to fixedColWidth and rows height will fit the space available
      compactType: 'none', // compact items: 'none' | 'compactUp' | 'compactLeft' | 'compactUp&Left' | 'compactLeft&Up'
      mobileBreakpoint: 640, // if the screen is not wider that this, remove the grid layout and stack the items
      minCols: 20, // minimum amount of columns in the grid
      maxCols: 100, // maximum amount of columns in the grid
      minRows: 20, // minimum amount of rows in the grid
      maxRows: 100, // maximum amount of rows in the grid
      defaultItemCols: 1, // default width of an item in columns
      defaultItemRows: 1, // default height of an item in rows
      maxItemCols: 50, // max item number of cols
      maxItemRows: 50, // max item number of rows
      minItemCols: 1, // min item number of columns
      minItemRows: 1, // min item number of rows
      minItemArea: 1, // min item area: cols * rows
      maxItemArea: 2500, // max item area: cols * rows
      margin: 10,  // margin between grid items
      outerMargin: true,  // if margins will apply to the sides of the container
      outerMarginTop: null, // override outer margin for grid
      outerMarginRight: null, // override outer margin for grid
      outerMarginBottom: null, // override outer margin for grid
      outerMarginLeft: null, // override outer margin for grid
      scrollSensitivity: 10,  // margin of the dashboard where to start scrolling
      scrollSpeed: 20,  // how much to scroll each mouse move when in the scrollSensitivity zone
      initCallback: undefined, // callback to call after grid has initialized. Arguments: gridsterComponent
      destroyCallback: undefined, // callback to call after grid has destroyed. Arguments: gridsterComponent
      // Arguments: gridsterItem, gridsterItemComponent
      itemInitCallback: undefined,  // callback to call for each item when is initialized and has size > 0.
      // Arguments: gridsterItem, gridsterItemComponent
      itemRemovedCallback: undefined,  // callback to call for each item when is removed.
      // Arguments: gridsterItem, gridsterItemComponent
      enableEmptyCellClick: false, // enable empty cell click events
      enableEmptyCellContextMenu: false, // enable empty cell context menu (right click) events
      enableEmptyCellDrop: false, // enable empty cell drop events
      enableEmptyCellDrag: false, // enable empty cell drag events
      emptyCellClickCallback: undefined, // empty cell click callback
      emptyCellContextMenuCallback: undefined, // empty cell context menu (right click) callback
      emptyCellDropCallback: undefined, // empty cell drag drop callback. HTML5 Drag & Drop
      emptyCellDragCallback: undefined, // empty cell drag and create item like excel cell selection
      // Arguments: event, gridsterItem{x, y, rows: defaultItemRows, cols: defaultItemCols}
      emptyCellDragMaxCols: 50, // limit empty cell drag max cols
      emptyCellDragMaxRows: 50, // limit empty cell drag max rows
      ignoreMarginInRow: false, // ignore the gap between rows for items which span multiple rows (see #162, #224)
      // only for gridType: `fixed` , `verticalFixed`, `horizontalFixed`
      draggable: {
        delayStart: 0, // milliseconds to delay the start of resize, useful for touch interaction
        enabled: true, // enable/disable draggable items
        ignoreContentClass: 'gridster-item-content', // default content class to ignore the drag event from
        ignoreContent: false, // if true drag will start only from elements from `dragHandleClass`
        dragHandleClass: 'drag-handler', // drag event only from this class. If `ignoreContent` is true.
        stop: undefined, // callback when dragging an item stops.  Accepts Promise return to cancel/approve drag.
        start: undefined // callback when dragging an item starts.
        // Arguments: item, gridsterItem, event
      },
      resizable: {
        delayStart: 10, // milliseconds to delay the start of resize, useful for touch interaction
        enabled: true, // enable/disable resizable items
        handles: {
          s: true,
          e: true,
          n: true,
          w: true,
          se: true,
          ne: true,
          sw: true,
          nw: true
        }, // resizable edges of an item
        stop: undefined, // callback when resizing an item stops. Accepts Promise return to cancel/approve resize.
        start: undefined // callback when resizing an item starts.
        // Arguments: item, gridsterItem, event
      },
      swap: true, // allow items to switch position if drop on top of another
      pushItems: false, // push items when resizing and dragging
      disablePushOnDrag: false, // disable push on drag
      disablePushOnResize: false, // disable push on resize
      pushDirections: { north: true, east: true, south: true, west: true }, // control the directions items are pushed
      pushResizeItems: false, // on resize of item will shrink adjacent items
      displayGrid: 'onDrag&Resize', // display background grid of rows and columns. Options: 'always' | 'onDrag&Resize' | 'none'
      disableWindowResize: false, // disable the window on resize listener. This will stop grid to recalculate on window resize.
      disableWarnings: false, // disable console log warnings about misplacement of grid items
      scrollToNewItems: false // scroll to new items placed in a scrollable view
    };

    this.dashboard = [
      { cols: 20, rows: 10, y: 0, x: 0 },
      { cols: 20, rows: 20, y: 0, x: 20 }
    ];
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(event) {
    this.dashboard.splice(this.dashboard.indexOf(event), 1);
  }

  addItem() {
    this.dashboard.push({x: 0, y: 0, cols: 1, rows: 1});
  }

}
