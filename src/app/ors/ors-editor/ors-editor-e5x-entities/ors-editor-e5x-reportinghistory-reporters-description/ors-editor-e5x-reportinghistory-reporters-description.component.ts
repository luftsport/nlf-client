import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { debounce } from 'ts-debounce';

@Component({
  selector: 'nlf-ors-editor-e5x-reportinghistory-reporters-description',
  templateUrl: './ors-editor-e5x-reportinghistory-reporters-description.component.html',
  styleUrls: ['./ors-editor-e5x-reportinghistory-reporters-description.component.css']
})
export class NlfOrsEditorE5xReportinghistoryReportersDescriptionComponent implements OnInit {

  @Input() reportingHistory: any;
  @Output() reportingHistoryChange: EventEmitter<any> = new EventEmitter(true);
  @Output() change: EventEmitter<boolean> = new EventEmitter(true);
  @Input() disabled: boolean = false;
  @Input() showLang: boolean = true;
  @Input() capitalize: boolean = false;

  debouncedUpdate = debounce(this.write, 1000);

  constructor() { }

  ngOnInit() {

    if (!this.reportingHistory.attributes.hasProperty('reporterSLanguage')) {
      this.reportingHistory.attributes['reporterSLanguage'] = {value: 43};
      this.update();
    }

    if(!this.reportingHistory.attributes.reporterSLanguage.value || this.reportingHistory.attributes.reporterSLanguage.value<1) {
      this.reportingHistory.attributes.reporterSLanguage.value = 43;
    }

    if (!this.reportingHistory.attributes.hasProperty('reporterSDescription')) {
      this.reportingHistory.attributes['reporterSDescription'] = {plainText: ''};
      this.update();
    }


  }
  public write() {
    if (this.capitalize) {
      this.reportingHistory.attributes.reporterSDescription.plainText = this.reportingHistory.attributes.reporterSDescription.plainText.toUpperCase().replace(/!/g,'.');
    }
    this.update();
  }
  public update() {

    this.reportingHistoryChange.emit(this.reportingHistory);
    this.change.emit(true);

  }
}
