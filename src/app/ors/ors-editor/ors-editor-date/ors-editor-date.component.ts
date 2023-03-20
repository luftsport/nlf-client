import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { NgbCalendar, NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { debounce } from 'ts-debounce';

@Component({
  selector: 'nlf-ors-editor-date',
  templateUrl: './ors-editor-date.component.html',
  styleUrls: ['./ors-editor-date.component.css']
})
export class NlfOrsEditorDateComponent implements OnInit {

  @Input() date: string;
  @Input() disabled = false;
  @Output() dateChange: EventEmitter<string> = new EventEmitter();

  debouncedEmit = debounce(this.onDateSelection, 900);
  model: NgbDateStruct;
  today = this.calendar.getToday();

  faCalendar = faCalendar;

  constructor(private calendar: NgbCalendar) { }

  ngOnInit() {
    if (!!this.date) {
      let tmp = new Date(this.date);
      this.model = { year: tmp.getFullYear(), month: tmp.getMonth(), day: tmp.getDay() };
    }
  }

  public onDateSelection(event: NgbDate) {
    console.log('Selected Date', event);
    console.log('Modal', this.model);
    //this.dateChange.emit(date.year + '-' + date.month + '-' + date.day);
    this.dateChange.emit(this.model.year + '-' + this.model.month + '-' + this.model.day)
  }


}
