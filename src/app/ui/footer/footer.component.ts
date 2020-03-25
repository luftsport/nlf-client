import { Component, OnInit } from '@angular/core';
import { VERSION } from 'environments/version';
import { environment } from 'environments/environment';
@Component({
  selector: 'nlf-ui-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class NlfUiFooterComponent implements OnInit {
  version = VERSION;
  ENV = environment;
  date = new Date();
  constructor() { }

  ngOnInit() {
  }

}
