import { Component, OnInit } from '@angular/core';
import { OrsModel } from './ors-model';
import { DataService } from "./data.service";
import { NlfApp } from "../app-routing.module"
import { Routes } from '@angular/router';
import { AppChildComponent } from "./app-child/app-child.component";

@Component({
  selector: 'app-app-ors',
  templateUrl: './app-ors.component.html',
  styleUrls: ['./app-ors.component.css'],

})
export class AppOrsComponent implements OnInit, NlfApp {

  model = new OrsModel(18, 'Brekt bein');
  message: string;
  submitted = false;
  constructor(private data: DataService) { }

  ngOnInit() {
      this.data.currentMessage.subscribe(message => this.model.other = message)
  }
  onSubmit() {
    this.submitted = true;
  }

  get diagnostic() { return JSON.stringify(this.model); }

  public routes : Routes = [{ path: 'ors/child', component: AppChildComponent }];

}


