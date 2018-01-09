import { Component, OnInit } from '@angular/core';
import { NlfComponent } from '../../nlf.component';

@Component({
  selector: 'nlf-ui-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class NlfUiDummyComponent implements OnInit {


  constructor(private app: NlfComponent) {
    app.setTitle('Dummy home component');
  }

  ngOnInit() {
  }

}
