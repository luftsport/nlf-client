import { Component, OnInit, Inject } from '@angular/core';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import {  NlfConfigService } from 'app/nlf-config.service';
import { ApiObservationsItem, NlfConfigItem } from 'app/api/api.interface';
import { debounce } from 'ts-debounce';

@Component({
  selector: 'nlf-ors-editor-categories',
  templateUrl: './ors-editor-categories.component.html',
  styleUrls: ['./ors-editor-categories.component.css']
})
export class NlfOrsEditorCategoriesComponent implements OnInit {
  observation: ApiObservationsItem;
  debouncedUpdate = debounce(this.update, 600);
  public config: NlfConfigItem;


  constructor(private configService: NlfConfigService,
    private subject: NlfOrsEditorService) {
    this.subject.observableObservation.subscribe(observation => this.observation = observation);
    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
      }
    );
  }

  ngOnInit() {
    if (!this.observation.hasOwnProperty('categories')) {
      this.observation['categories'] = [];
    }
  }

  update() {
    this.subject.update(this.observation);
  }

  hasCat(cat) {
    if (this.observation['categories'].indexOf(cat) > -1) {
      return true;
    }
    return false;
  }

  toggle(cat) {

    if (this.observation['categories'].indexOf(cat) === -1) {
      this.observation['categories'].push(cat);
      this.debouncedUpdate();
    } else if (this.observation['categories'].indexOf(cat) > -1) {
      this.observation['categories'].splice(this.observation['categories'].indexOf(cat), 1);
      this.debouncedUpdate();
    }

  }

}
