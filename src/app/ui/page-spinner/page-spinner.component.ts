import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nlf-ui-page-spinner',
  templateUrl: './page-spinner.component.html',
  styleUrls: ['./page-spinner.component.css']
})
export class NlfUiPageSpinnerComponent implements OnInit {

  @Input() size?: number = 5;

  fasize: string;

  constructor() {}

  ngOnInit() {
    this.fasize = this.size + 'x';
  }


}
