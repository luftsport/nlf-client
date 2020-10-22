import { Component, OnInit } from '@angular/core';

import { NlfComponent } from 'app/nlf.component';

@Component({
  selector: 'nlf-ors-motor',
  templateUrl: './ors-motor.component.html',
  styleUrls: ['./ors-motor.component.css']
})
export class NlfOrsMotorComponent implements OnInit {

  constructor(private app: NlfComponent) { }

  ngOnInit() {
    this.app.setTitle('OBSREG Oversikt');
  }

}
