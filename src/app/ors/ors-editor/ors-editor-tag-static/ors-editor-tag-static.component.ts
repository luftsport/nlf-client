import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface TagInterface {
  id: number;
  label: string;
  descr?: string;
  expl?: string;
}

@Component({
  selector: 'nlf-ors-editor-tag-static',
  templateUrl: './ors-editor-tag-static.component.html',
  styleUrls: ['./ors-editor-tag-static.component.css']
})
export class NlfOrsEditorTagStaticComponent implements OnInit {

  @Input() items: any; //numbernumber[] = [];
  @Input() tags: TagInterface[] = [];

  @Output() itemsChange: EventEmitter<number[]> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  @Input() classes: string = '';
  @Input() multiple: boolean = false;
  @Input() max: number = undefined;
  @Input() description: boolean = true;
  @Input() explanation: boolean = false;
  @Input() disable: boolean = false;
  @Input() element_id: string = '';

  selectedTags: any; //[];

  constructor() { }

  ngOnInit() {

    // Rebuild
    if (this.multiple) {
      this.selectedTags = [];
      if (!this.items || typeof this.items === undefined) {
        this.items = [];
      }
    }

    try {
      this.tags.forEach(tag => {
        if (this.multiple && !!~this.items.indexOf(tag.id)) {
          this.selectedTags.push(tag);
        } else if (+tag.id === +this.items) {
          this.selectedTags = tag;
        }
      });
    } catch(e) { console.log('ERR',e); }

    if (typeof this.items === 'string' || typeof this.items === 'number') {
      //this.items = [this.this.items];
    }

  }

  public onChange(event) {
    if (this.multiple) {
      let tmp = [];
      this.selectedTags.forEach(tag => {
        tmp.push(tag.id);
      });
      this.itemsChange.emit(tmp);
    } else if (!!event && event.hasOwnProperty('id')) {
      this.itemsChange.emit(event.id);
    } else {
      this.itemsChange.emit(undefined);
    }
    this.change.emit(true);
  }

}
