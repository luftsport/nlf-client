import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NLF_CONFIG, NlfConfig } from '../../../nlf-config.module';

@Component({
  selector: 'nlf-ors-editor-type',
  templateUrl: './ors-editor-type.component.html',
  styleUrls: ['./ors-editor-type.component.css']
})
export class NlfOrsEditorTypeComponent implements OnInit {

  @Input() type: string;
  @Output() typeChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject(NLF_CONFIG) private config: NlfConfig) {}

  onChange(): void {
    this.typeChange.emit(this.type);
  }

  ngOnInit() {
  }

}
