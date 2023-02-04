import { E5XAircraft } from 'app/interfaces/e5x.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { ApiAircraftsService } from 'app/api/api-aircrafts.service';
import { ApiOptionsInterface, ApiAircraftsItem } from 'app/api/api.interface';
import { E5XAircraftClass } from 'app/interfaces/e5x.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmService } from 'app/services/confirm/confirm.service';
import { faClose, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-aircrafts-edit',
  templateUrl: './aircrafts-edit.component.html',
  styleUrls: ['./aircrafts-edit.component.css']
})
export class NlfAircraftsEditComponent implements OnInit {
  @Input() callsign: string;
  @Output() callsignChange: EventEmitter<string> = new EventEmitter();
  @Input() showSave: boolean = true;
  @Input() showImage: boolean = true;
  @Input() e5x: any;
  @Output() e5xChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled: boolean = false;

  dataReady = false;
  aircraft: ApiAircraftsItem;
  changes = false;
  changed_image = false;
  thumbnail: string;
  current_image;

  faClose = faClose;
  faPlus = faPlus;
  faSave = faSave;

  constructor(
    private alertService: NlfAlertService,
    private aircraftsService: ApiAircraftsService,
    public domSanitizer: DomSanitizer,
    private confirmService: ConfirmService) {

  }

  ngOnInit() {


    // this.e5x = {...this.e5x, ...this.e5x};
    this.getAircraft();

  }

  updateAircraft(change = false) {
    this.e5xChange.emit(this.e5x);

    if (change) {
      this.change.emit(true);
    }
  }

  onChange(event) {
    this.changes = true;
  }

  addEngine() {
    this.e5x.entities.engine.push(new E5XAircraftClass().engine);
  }

  delEngine(idx) {
    const confirmMsg = { title: 'Please confirm',
                         message: 'Are you sure you want to delete engine #' + (+idx+1) + '?',
                         yes: 'Delete',
                         no: 'Cancel'};
    this.confirmService.confirm(confirmMsg).then(
        () => { // Yes
          this.e5x.entities.engine.splice(idx, 1);
        },
        () => {}
    );

  }
  addPropeller() {
    this.e5x.entities.propeller.push(new E5XAircraftClass().propeller);
  }
  delPropeller(idx) {
    const confirmMsg = { title: 'Please confirm',
                         message: 'Are you sure you want to delete propeller #' + (+idx+1) + '?',
                         yes: 'Delete',
                         no: 'Cancel'};
    this.confirmService.confirm(confirmMsg).then(
        () => { // Yes
          this.e5x.entities.propeller.splice(idx, 1);
        },
        () => {}
    );

  }

  getAircraft() {
    this.aircraftsService.getAircraft(this.callsign).subscribe(
      data => {
        this.aircraft  = data;
        // Change call sign if _id
        if (data._id === this.callsign) {
          this.callsign = data.callsign;
          this.callsignChange.emit(this.callsign);
        }

        if (!this.aircraft.hasOwnProperty('e5x')) {
          this.e5x = new E5XAircraftClass().aircraft;
          console.log('Making new aircraft class...');
        } else {
          // Make sure id etc gets with it!
          //this.e5x = {...new E5XAircraftClass().aircraft, ...data.e5x}; // || new E5XAircraftClass().aircraft;
          this.e5x = data.e5x;
        }

          /** Init e5x!!!
          if (this.aircraft.hasOwnProperty('e5x') && !!data.e5x) {
          console.log('Spread operator');
            this.e5x = { ...this.e5x, ...data.e5x };
          } else if ((!this.aircraft.hasOwnProperty('e5x') || this.e5x.length === 0) && !!data.e5x) {
            this.e5x = data.e5x;
          } else {
            this.e5x = this.e5x.aircraft;
          } */

        // Defaults
        if (!this.e5x.attributes.aircraftRegistration.value) {
          this.e5x.attributes.aircraftRegistration.value = this.aircraft.callsign;
        }
        if (!this.e5x.attributes.serialNumber.value) {
          this.e5x.attributes.serialNumber.value = this.aircraft.msn;
        }
        if (!this.e5x.attributes.stateOfRegistry.value && this.aircraft.callsign.startsWith('LN-')) {
          this.e5x.attributes.stateOfRegistry.value = 179; // Norway
        }
        if (!this.e5x.attributes.propulsionType.value) {
          // this.e5x.attributes.propulsionType.value = 1; // Reciprocating
        }
        if (!this.e5x.attributes.aircraftCategory.value) {
          // 10 - micro LN-Y
          if (this.aircraft.callsign.startsWith('LN-Y')) {
            this.e5x.attributes.aircraftCategory.value = 10;
          } else if (this.aircraft.callsign.startsWith('LN-O')) {
            this.e5x.attributes.aircraftCategory.value = 31;
          } else if (this.aircraft.callsign.startsWith('LN-G')) {
            this.e5x.attributes.aircraftCategory.value = 20;
          } else if (this.aircraft.callsign.startsWith('LN-C')) {
            this.e5x.attributes.aircraftCategory.value = 42;
          } else {
            // this.e5x.attributes.aircraftCategory.value = 16; // fixed - aeroplane - small
          }
        }
        this.updateAircraft();
      },
      err => { },
      () => this.dataReady = true
    )
  }

  public saveAircraft() {
    let payload = { e5x: this.e5x };
    if (this.changed_image) {
      payload['image'] = this.thumbnail;
    }

    console.log('PAYLOAD', payload);
    this.aircraftsService.save(this.aircraft._id, payload, this.aircraft._etag).subscribe(
      data => {
        this.aircraft._etag = data._etag;
        this.aircraft._updated = data._updated;
        this.changes = false;
        this.changed_image = false;
        this.alertService.success('Endringer for ' + this.aircraft.callsign + ' ble lagret', false, true, 15);
        this.updateAircraft(true);
      },
      err => console.log('Error saving aircraft', err),
      () => { }
    )
  }

  onUploadChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      this.changed_image = true;
      this.changes = true;
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.thumbnail = 'data:image/png;base64,' + btoa(e.target.result); //
  }
}
