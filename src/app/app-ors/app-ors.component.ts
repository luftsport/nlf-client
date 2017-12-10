import { Component, OnInit } from '@angular/core';
import { OrsModel } from './ors-model';
import { DataService } from "./data.service";
import { Routes } from '@angular/router';
import { AppChildComponent } from "./app-child/app-child.component";


// Imports the application wide object
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-app-ors',
  templateUrl: './app-ors.component.html',
  styleUrls: ['./app-ors.component.css'],

})
export class AppOrsComponent implements OnInit {

<<<<<<< HEAD
=======
  public static routes:Routes = [{ path: 'ors/child', component: AppChildComponent }];
>>>>>>> c8b0b8407cac6b25e1e5ca37e0602bf5462f4249

  model = new OrsModel(18, 'Brekt bein');
  message: string;
  submitted = false;
<<<<<<< HEAD
  constructor(private data: DataService, private app:AppComponent) {
    app.setTitle("ORS");
=======
  constructor(private data: DataService) {

>>>>>>> c8b0b8407cac6b25e1e5ca37e0602bf5462f4249
  }

  ngOnInit() {
      this.data.currentMessage.subscribe(message => this.model.other = message)
  }
  onSubmit() {
    this.submitted = true;
  }

  get diagnostic() { return JSON.stringify(this.model); }


}


