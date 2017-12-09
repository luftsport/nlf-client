import { Component, OnInit } from '@angular/core';
import {OrsModel} from './ors-model';
import { DataService } from "./data.service";

// Imports the application wide object
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-app-ors',
  templateUrl: './app-ors.component.html',
  styleUrls: ['./app-ors.component.css'],

})
export class AppOrsComponent implements OnInit {


  model = new OrsModel(18, 'Brekt bein');
  message: string;
  submitted = false;
  constructor(private data: DataService, private app:AppComponent) {
    app.setTitle("ORS");
  }

  ngOnInit() {
      this.data.currentMessage.subscribe(message => this.model.other = message)
  }

  onSubmit() {
    this.submitted = true;
  }

  get diagnostic() { return JSON.stringify(this.model); }

}
