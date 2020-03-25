import { Component, OnInit, Input } from '@angular/core';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiObservationsItem } from 'app/api/api.interface';
import { debounce } from 'ts-debounce';

@Component({
  selector: 'nlf-ors-editor-when',
  templateUrl: './ors-editor-when.component.html',
  styleUrls: ['./ors-editor-when.component.css']
})
export class NlfOrsEditorWhenComponent implements OnInit {

  @Input() tz: string = 'local';

  debouncedUpdate = debounce(this.update, 1000);

  observation: ApiObservationsItem;

  date: { year: number, month: number, day: number };
  time: { hour: number, minute: number, second?: number };
  maxDate: { year: number, month: number, day: number };

  constructor(private observationSubject: NlfOrsEditorService) {
    this.observationSubject.observableObservation.subscribe(observation => this.observation = observation);
  }

  ngOnInit() {

    if (!(this.observation.when instanceof Date)) {
      this.observation.when = new Date(this.observation.when);
    }
    const now: Date = new Date(this.observation._created);
    this.maxDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };

    //LOCAL TZ
    if (this.tz === 'local') {
      this.date = { year: this.observation.when.getFullYear(), month: this.observation.when.getMonth()+1, day: this.observation.when.getDate() };
      this.time = { hour: this.observation.when.getHours(), minute: this.observation.when.getMinutes() };
    } else {
      // UTC TZ
      this.date = { year: this.observation.when.getUTCFullYear(), month: this.observation.when.getUTCMonth()+1, day: this.observation.when.getUTCDate() };
      this.time = { hour: this.observation.when.getUTCHours(), minute: this.observation.when.getUTCMinutes() };
    }

  }

  public update(event) {
    // this.observation.whenChange.emit(this.type);
    console.log('WHEN EVENT', event);
    console.log(this.date);
    console.log(this.time);
    if (this.tz === 'local') {
      this.observation.when = new Date(this.date.year, this.date.month - 1, this.date.day, this.time.hour, this.time.minute, 0, 0);
    } else {
      this.observation.when = new Date(Date.UTC(this.date.year, this.date.month - 1, this.date.day, this.time.hour, this.time.minute, 0, 0));
    }


    console.log('FINAL', this.observation.when);
    this.observationSubject.update(this.observation);
  }
}
