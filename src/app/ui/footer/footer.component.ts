import { Component, OnInit } from '@angular/core';
import { VERSION } from 'environments/version';
import { environment } from 'environments/environment';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'nlf-ui-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class NlfUiFooterComponent implements OnInit {
  version = VERSION;
  ENV = environment;
  date = new Date();
  faGithub = faGithub;

  constructor() { }

  ngOnInit() {
  }

}
