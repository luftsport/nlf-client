import { ApiOptionsInterface, ApiObservationsItem, ApiTagList } from 'app/api/api.interface';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ApiTagsService } from 'app/api/api-tags.service';
import { Observable } from 'rxjs';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { debounce } from 'ts-debounce';

@Component({
  selector: 'nlf-ors-editor-title',
  templateUrl: './ors-editor-title.component.html',
  styleUrls: ['./ors-editor-title.component.css']
})
export class NlfOrsEditorTitleComponent implements OnInit {
  
  onChangeDebounced = debounce(this.onChange, 700);
  observation: ApiObservationsItem;


  constructor(private subject: NlfOrsEditorService) {

      this.subject.observableObservation.subscribe(observation => this.observation = observation);
  }

  ngOnInit() {

  }

  toUpper(value): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }


  onChange(): void {
    this.observation.title = this.toUpper(this.observation.title);
    this.subject.update(this.observation);
  }



}
