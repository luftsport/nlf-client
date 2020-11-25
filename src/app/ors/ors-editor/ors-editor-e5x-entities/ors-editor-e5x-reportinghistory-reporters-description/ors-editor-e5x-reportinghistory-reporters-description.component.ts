import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { debounce } from 'ts-debounce';

@Component({
  selector: 'nlf-ors-editor-e5x-reportinghistory-reporters-description',
  templateUrl: './ors-editor-e5x-reportinghistory-reporters-description.component.html',
  styleUrls: ['./ors-editor-e5x-reportinghistory-reporters-description.component.css']
})
export class NlfOrsEditorE5xReportinghistoryReportersDescriptionComponent implements OnInit {

  @Input() narrative: any;
  @Output() narrativeChange: EventEmitter<any> = new EventEmitter(true);
  @Input() language: any;
  @Output() languageChange: EventEmitter<any> = new EventEmitter(true);
  @Output() change: EventEmitter<boolean> = new EventEmitter(true);
  @Input() disabled: boolean = false;
  @Input() showLang: boolean = true;
  @Input() capitalize: boolean = false;

  debouncedUpdate = debounce(this.write, 1000);

  constructor() { }

  ngOnInit() {

    if (!this.language) {
      this.language = {value: 43};
      this.update();
    }

    if(!this.language.value || this.language.value<1) {
      this.language['value'] = 43;
    }

    if (!this.narrative) {
      this.narrative = {plainText: ''};
      this.update();
    }

    if (!this.narrative.hasOwnProperty('plainText')) {
      this.narrative['plainText'] = '';
      this.update();
    }


  }
  public write() {
    if (this.capitalize) {
      this.narrative.plainText = this.narrative.plainText.toUpperCase().replace(/!/g,'.');
    }
    this.update();
  }
  public update() {

    this.narrativeChange.emit(this.narrative);
    this.languageChange.emit(this.language);
    this.change.emit(true);

  }
}
