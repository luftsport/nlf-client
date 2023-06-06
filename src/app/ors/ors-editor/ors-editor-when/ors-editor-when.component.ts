import { Component, OnInit, Input } from '@angular/core';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiObservationsItem } from 'app/api/api.interface';
import { debounce } from 'ts-debounce';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

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
  maxDate;
  dateError = false;
  dateErrorFeedback: string;

  dataReady = false;
  // Icons
  faCalendar = faCalendar;


  constructor(
    private observationSubject: NlfOrsEditorService,
    private calendar: NgbCalendar
  ) {

    this.maxDate = this.calendar.getToday();

    this.observationSubject.observableObservation.subscribe(
      observation => {
        this.observation = observation;
        this.dataReady = true;

        try {
          if (!(this.observation.when instanceof Date)) {
            this.observation.when = new Date(this.observation.when);
          }
          const now: Date = new Date(this.observation._created);
          this.maxDate = NgbDate.from({ year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() });

          //LOCAL TZ
          if (this.tz === 'local') {
            this.date = { year: this.observation.when.getFullYear(), month: this.observation.when.getMonth() + 1, day: this.observation.when.getDate() };
            this.time = { hour: this.observation.when.getHours(), minute: this.observation.when.getMinutes() };
          } else {
            // UTC TZ
            this.date = { year: this.observation.when.getUTCFullYear(), month: this.observation.when.getUTCMonth() + 1, day: this.observation.when.getUTCDate() };
            this.time = { hour: this.observation.when.getUTCHours(), minute: this.observation.when.getUTCMinutes() };
          }

        } catch (e) { }

      }
    );
  }

  ngOnInit() { }

  public isValidDate(_date) {
    if (_date instanceof Date && moment(_date).isValid()) return true;
    return false;
  }


  private getMaxDate() {
    //return NgbDate.from(this.maxDate);
    if (this.tz === 'local') {
      return new Date(this.maxDate.year, this.maxDate.month - 1, this.maxDate.day);
    }

    return new Date(Date.UTC(this.maxDate.year, this.maxDate.month - 1, this.maxDate.day));
  }

  public update(event) {
    try {
      // this.observation.whenChange.emit(this.type);
      let newTime = undefined;
      if (this.tz === 'local') {
        newTime = new Date(this.date.year, this.date.month - 1, this.date.day, this.time.hour, this.time.minute, 0, 0);
      } else {
        newTime = new Date(Date.UTC(this.date.year, this.date.month - 1, this.date.day, this.time.hour, this.time.minute, 0, 0));
      }

      if (this.isValidDate(newTime) && newTime <= this.getMaxDate()) {
        this.dateError = false;
        this.observation.when = newTime;
        this.observationSubject.update(this.observation);

      } else {
        this.dateError = true;
        if (this.isValidDate(newTime) && newTime > this.getMaxDate()) {
          this.dateErrorFeedback = 'Du kan ikke sette dato i fremtiden for observasjonen';
        } else if (!this.isValidDate(newTime)) {
          this.dateErrorFeedback = 'Feil datoformat';
        }
      }

    } catch { }
  }
}
