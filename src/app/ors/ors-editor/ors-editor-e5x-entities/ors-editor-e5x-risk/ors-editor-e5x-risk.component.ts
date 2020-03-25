import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { E5XRiskAssessmentClass } from 'app/interfaces/e5x.interface';
@Component({
  selector: 'nlf-ors-editor-e5x-risk',
  templateUrl: './ors-editor-e5x-risk.component.html',
  styleUrls: ['./ors-editor-e5x-risk.component.css']
})
export class NlfOrsEditorE5xRiskComponent implements OnInit {
  @Input() riskAssessment;
  @Output() riskAssessmentChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled: boolean = false;
  constructor() { }

  ngOnInit() {
    if(this.riskAssessment.length === 0) {
      this.riskAssessment.push(new E5XRiskAssessmentClass().riskAssessment);
      this.update();
    }
  }

  public update() {

    this.riskAssessmentChange.emit(this.riskAssessment);
    this.change.emit(true);

  }

}
