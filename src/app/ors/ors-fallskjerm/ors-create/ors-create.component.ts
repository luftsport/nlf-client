import { Component, Input, OnInit } from '@angular/core';
import { NlfLocalStorageService } from '../../../services/storage/local-storage.service';

@Component({
  selector: 'nlf-ors-create',
  templateUrl: './ors-create.component.html',
  styleUrls: ['./ors-create.component.css']
})
export class NlfOrsCreateComponent implements OnInit {

  @Input() layout: string; // inline, short, datetimepicker, calendar etc

  userid: number;
  bsValue: Date = new Date();
  ismeridian: boolean = false;
  mytime: Date = new Date();
  public selectedMoment = new Date();

  constructor(private storage: NlfLocalStorageService) { }

  ngOnInit() {
    this.userid = this.storage.getId();

  }

}
