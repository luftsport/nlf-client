import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'nlf-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class NlfUiDatepickerComponent implements OnInit {

  @Input() date: string;
  @Input() disabled = false;
  @Output() dateChange: EventEmitter<string> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  _date;
  model: NgbDateStruct;
  faCalendar = faCalendar;

  constructor() {
    if (!!this.date && this.date != '') {
     this.parseInputDate();
    } else {
      
    }
  }



  ngOnInit(): void {
  }

  parseInputDate() {
    this._date = Date.parse(this.date);
    this.model = { year: this._date.getUTCFullYear(), month: this._date.getUTCMonth(), day: this._date.getUTCDay() };
  }

  onUpdate() {
    this.date = `${this.model.year}-${this.model.month}-${this.model.day}T00:00:00.00000Z`;
    this.dateChange.emit(this.date);
    this.change.emit(true);
  }

}
