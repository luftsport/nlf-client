import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'nlf-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class NlfUserComponent implements OnInit {

  person_id: number;

  dataReady = false;
  error = false;

  sub;

  constructor(
    private route: ActivatedRoute,
    private _location: Location) {

    this.sub = this.route.params.subscribe(
      params => {
        this.person_id = params['person_id'] ? +params['person_id'] : -1;
        this.dataReady = true;
      });
  }

  public goBack() {
    this._location.back();
  }
  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
