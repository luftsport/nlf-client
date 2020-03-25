import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { debounce } from 'ts-debounce';
import { E5XNarrativeClass } from 'app/interfaces/e5x.interface';

export interface Narrative {
  narrativeText: {value: string};
  narrativeLanguage: {value: Number};
}

@Component({
  selector: 'nlf-ors-editor-e5x-narrative',
  templateUrl: './ors-editor-e5x-narrative.component.html',
  styleUrls: ['./ors-editor-e5x-narrative.component.css']
})
export class NlfOrsEditorE5XNarrativeComponent implements OnInit {

  @Input() narrative: any;
  @Output() narrativeChange: EventEmitter<any> = new EventEmitter(true);
  @Output() change: EventEmitter<boolean> = new EventEmitter(true);
  @Input() disabled: boolean = false;
  @Input() showLang: boolean = true;
  @Input() capitalize: boolean = false;

  debouncedUpdate = debounce(this.write, 1000);
  constructor() { }

  ngOnInit() {

    if (this.narrative.length === 0) {
      this.narrative.push(new E5XNarrativeClass().narrative);
      this.narrative[0].attributes.narrativeLanguage.value = 43;
      this.update();
    }

    if(!this.narrative[0].attributes.narrativeLanguage.value) {
      this.narrative[0].attributes.narrativeLanguage.value = 43;
    }


  }
  public write() {
    if (this.capitalize) {
      this.narrative[0].attributes.narrativeText.plainText = this.narrative[0].attributes.narrativeText.plainText.toUpperCase().replace(/!/g,'.');
    }
    this.update();
  }
  public update() {

    this.narrativeChange.emit(this.narrative);
    this.change.emit(true);

  }
}
