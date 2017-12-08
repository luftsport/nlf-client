import { Component, OnInit } from '@angular/core';
import {OrsModel} from './ors-model';
import { DataService } from "./data.service";

@Component({
  selector: 'app-app-ors',
  templateUrl: './app-ors.component.html',
  styleUrls: ['./app-ors.component.css'],
  
})
export class AppOrsComponent implements OnInit {

  model = new OrsModel(18, 'Brekt bein');
  message: string;
  submitted = false;
  constructor(private data: DataService) { }

  ngOnInit() {
      this.data.currentMessage.subscribe(message => this.message = message)
  }

  onSubmit() {
    this.submitted = true;
  }

  get diagnostic() { return JSON.stringify(this.model); }

}
