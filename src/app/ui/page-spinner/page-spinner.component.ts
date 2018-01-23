import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nlf-ui-page-spinner',
  templateUrl: './page-spinner.component.html',
  styleUrls: ['./page-spinner.component.css']
})
export class NlfUiPageSpinnerComponent implements OnInit {

  @Input() size?: number;

  fasize: string;

  constructor() {}

  ngOnInit() {
    if (typeof this.size === 'undefined') {
      this.size = 5; // Largest, it's page loading
    }
    this.fasize = this.size + 'x';
  }


}
