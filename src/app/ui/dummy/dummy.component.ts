import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit {


  constructor(private app:AppComponent) {
    app.setTitle("Dummy home component");
  }

  ngOnInit() {
  }

}
