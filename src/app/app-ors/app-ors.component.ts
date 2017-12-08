import { Component, OnInit } from '@angular/core';
import {OrsModel} from './ors-model';
@Component({
  selector: 'app-app-ors',
  templateUrl: './app-ors.component.html',
  styleUrls: ['./app-ors.component.css']
})
export class AppOrsComponent implements OnInit {

  model = new OrsModel(18, 'Brekt bein');

  submitted = false;

  onSubmit() { this.submitted = true; }

  get diagnostic() { return JSON.stringify(this.model); }

  receiveMessage($event) {
    console.log("Parent: " + $event);
    this.model.other = $event;
  }
  ngOnInit() {
  }

}
