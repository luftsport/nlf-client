import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { E5XReportingHistoryClass } from 'app/interfaces/e5x.interface';

@Component({
  selector: 'nlf-ors-editor-e5x-reportinghistory',
  templateUrl: './ors-editor-e5x-reportinghistory.component.html',
  styleUrls: ['./ors-editor-e5x-reportinghistory.component.css']
})
export class NlfOrsEditorE5xReportinghistoryComponent implements OnInit {

  @Input() reportingHistory: any;
  @Output() reportingHistoryChange: EventEmitter<any> = new EventEmitter(true);
  @Output() change: EventEmitter<boolean> = new EventEmitter(true);
  @Input() disabled: boolean = false;
  constructor() { }

  ngOnInit() {
    if (this.reportingHistory.length === 0) {
      this.reportingHistory.push(new E5XReportingHistoryClass().reportingHistory);
      this.update();
    }
  }

  public update() {

    this.reportingHistoryChange.emit(this.reportingHistory);
    this.change.emit(true);

  }

}
