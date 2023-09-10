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

  @Input() tz: string = 'utc';


  debouncedUpdate = debounce(this.update, 1000);

  observation: ApiObservationsItem;

  // ng-bootstrap format
  date: { year: number, month: number, day: number };
  time: { hour: number, minute: number, second?: number };
  maxDate: { year: number, month: number, day: number };

  // Observation when!
  curr_when: string;
  when: Date;

  maxDateTime: Date;
  dateError = false;

  // dateErrorFeedback: string;
  dateErrorType: string;

  dataReady = false;
  // Icons
  faCalendar = faCalendar;


  constructor(
    private observationSubject: NlfOrsEditorService,
    private calendar: NgbCalendar
  ) { }

  ngOnInit() {

    console.log('TZ in onInit', this.tz);

    // Initial max date!
    this.maxDateTime = new Date();

    this.observationSubject.observableObservation.subscribe(

      observation => {
        this.observation = observation;
        

        try {

          if (!this.curr_when || (!!this.curr_when && this.curr_when != this.observation.when)) {
            /**
            if (!(this.observation.when instanceof Date)) {
              console.log("WHEN", this.observation.when);
              this.observation.when = new Date(this.observation.when);
              console.log("WHEN", this.observation.when);
            }
            **/

            // Assign current when make sure to be backwards compatible!
            this.curr_when = this.convertJavascriptDateToEve(new Date(this.observation.when));

            this.maxDateTime = new Date(this.observation._created);
            console.log('MAX DATETIME', this.maxDateTime, this.getMaxDate());

            console.log('Subscribe');
            console.log('observation.when', this.observation.when);
            console.log('type o.when', typeof this.observation.when);


            //Make tz aware ng-bootstrap models
            console.log('NG-B timeone is: ', this.tz);

            this.when = new Date(this.curr_when);
            if (this.tz === 'local') {
              console.log('Just local tz normal get stuff');
              this.date = { year: this.when.getFullYear(), month: this.when.getMonth() + 1, day: this.when.getDate() };
              this.time = { hour: this.when.getHours(), minute: this.when.getMinutes() };
            } else {
              // UTC TZ
              console.log('Is UTC get utc stuff');
              this.date = { year: this.when.getUTCFullYear(), month: this.when.getUTCMonth() + 1, day: this.when.getUTCDate() };
              this.time = { hour: this.when.getUTCHours(), minute: this.when.getUTCMinutes() };
            }

            console.log('Local tz-aware when', this.when);

            console.log('NG-B tz-aware date', this.date);
            console.log('NG-B tz-aware time', this.time);
          }

        } catch (e) { }

        this.dataReady = true;
      }
    );
  }

  public isValidDate(_date) {
    if (_date instanceof Date && moment(_date).isValid()) return true;
    return false;
  }


  private getMaxDate() {
    if (this.tz === 'local') {
      return { year: this.maxDateTime.getFullYear(), month: this.maxDateTime.getMonth() + 1, day: this.maxDateTime.getDate() };
    } else {
      return { year: this.maxDateTime.getUTCFullYear(), month: this.maxDateTime.getUTCMonth() + 1, day: this.maxDateTime.getUTCDate() };

    }
  }

  private convertDateToUTC(date) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()));
  }

  private convertJavascriptDateToEve(date) {
    let a = date.toISOString().split('.');
    let b = a[1].split('Z');
    return a[0] + '.' + b[0].padEnd(6,0) + 'Z';
  }

  public update() {
    try {
      // this.observation.whenChange.emit(this.type);

      console.log('UPDATE NG-B date', this.date);
      console.log('UPDATE NG-time', this.time);
      
      let newTime = undefined;
      if (this.tz === 'local') {
        newTime = new Date(this.date.year, this.date.month - 1, this.date.day, this.time.hour, this.time.minute, 0, 0);
      } else {
        newTime = new Date(Date.UTC(this.date.year, this.date.month - 1, this.date.day, this.time.hour, this.time.minute, 0, 0));
      }

      if (this.isValidDate(newTime) && newTime <= this.maxDateTime) {
        this.dateError = false;

        console.log('NEWTIME', newTime);

        console.log('String comp', this.observation.when, this.convertJavascriptDateToEve(newTime));

        //let originalDateTime = new Date(this.observation.when);
        if (this.observation.when != this.convertJavascriptDateToEve(newTime)) {
          console.log('New Time!!!', newTime, 'som blir', this.convertJavascriptDateToEve(newTime) );
          this.observation.when = this.convertJavascriptDateToEve(newTime);
          this.observationSubject.update(this.observation);
        }
      } else {
        this.dateError = true;
        if (this.isValidDate(newTime) && newTime > this.maxDateTime) {
          this.dateErrorType = 'future'; //Du kan ikke sette dato i fremtiden for observasjonen';
        } else if (!this.isValidDate(newTime)) {
          this.dateErrorType = 'format'; //Feil datoformat';
        }
      }

    } catch { }
  }
}
