import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { E5XReportingHistoryClass} from 'app/interfaces/e5x.interface';
@Component({
  selector: 'nlf-ors-editor-e5x-assessment',
  templateUrl: './ors-editor-e5x-assessment.component.html',
  styleUrls: ['./ors-editor-e5x-assessment.component.css']
})
export class NlfOrsEditorE5xAssessmentComponent implements OnInit {

  @Input() reportingHistory;
  @Output() reportingHistoryChange: EventEmitter<any> = new EventEmitter(true);
  @Output() change: EventEmitter<boolean> = new EventEmitter(true);
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit() {
    console.log('Reporting History', this.reportingHistory);
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
