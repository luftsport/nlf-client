import { Component, OnInit } from '@angular/core';
import { NlfOrsEditorService } from '../ors-editor.service';
import { ApiObservationsItem } from '../../../api/api.interface';

@Component({
  selector: 'nlf-ors-editor-when',
  templateUrl: './ors-editor-when.component.html',
  styleUrls: ['./ors-editor-when.component.css']
})
export class NlfOrsEditorWhenComponent implements OnInit {

  observation: ApiObservationsItem;

  date: { year: number, month: number, day: number };
  time: { hour: number, minute: number, second?: number };
  maxDate: { year: number, month: number, day: number };

  constructor(private subject: NlfOrsEditorService) {
    this.subject.observableObservation.subscribe(observation => this.observation = observation);
  }

  ngOnInit() {

    if (!(this.observation.when instanceof Date)) {
      this.observation.when = new Date(this.observation.when);
    }
    const now: Date = new Date();
    this.maxDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    this.date = { year: this.observation.when.getFullYear(), month: this.observation.when.getMonth() + 1, day: this.observation.when.getDate() };
    this.time = { hour: this.observation.when.getHours(), minute: this.observation.when.getMinutes() };

  }

  onChange(event): void {
    // this.observation.whenChange.emit(this.type);
    console.log(this.date);
    console.log(this.time);
    this.observation.when = new Date(this.date.year + '-' + this.date.month + '-' + this.date.day + 'T' + this.time.hour + ':' + this.time.minute + ':00.000000Z');
    console.log(this.observation.when);
    this.subject.update(this.observation);
  }
}
