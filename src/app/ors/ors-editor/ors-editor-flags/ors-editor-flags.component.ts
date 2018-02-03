import { ApiObservationFlagsInterface } from './../../../api/api.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'nlf-ors-editor-flags',
  templateUrl: './ors-editor-flags.component.html',
  styleUrls: ['./ors-editor-flags.component.css']
})
export class NlfOrsEditorFlagsComponent implements OnInit {
  @Input() flags: ApiObservationFlagsInterface;
  @Output() flagsChange = new EventEmitter<ApiObservationFlagsInterface>(true);
  
  constructor() { }

  ngOnInit() {
  }

  onChange(event) {
    this.flagsChange.emit(this.flags);
  }

}
