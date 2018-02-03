import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nlf-ors-editor-when',
  templateUrl: './ors-editor-when.component.html',
  styleUrls: ['./ors-editor-when.component.css']
})
export class NlfOrsEditorWhenComponent implements OnInit {

  @Input() when: Date;
  @Output() whenChange: EventEmitter<Date> = new EventEmitter<Date>();

  date: { year: number, month: number, day: number };
  time: { hour: number, minute: number, second?: number };
  maxDate: { year: number, month: number, day: number };

  constructor() { }

  ngOnInit() {

    if (!(this.when instanceof Date)) {
      this.when = new Date(this.when);
    }
    const now: Date = new Date();
    this.maxDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    this.date = { year: this.when.getFullYear(), month: this.when.getMonth() + 1, day: this.when.getDate() };
    this.time = { hour: this.when.getHours(), minute: this.when.getMinutes() };

  }

  onChange(event): void {
    // this.whenChange.emit(this.type);
    console.log(this.date);
    console.log(this.time);
    this.when = new Date(this.date.year + '-' + this.date.month + '-' + this.date.day + 'T' + this.time.hour + ':' + this.time.minute + ':00.000000Z');
    console.log(this.when);
    this.whenChange.emit(this.when);
  }
}
