import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'nlf-ui-component-spinner',
  templateUrl: './component-spinner.component.html',
  styleUrls: ['./component-spinner.component.css']
})
export class NlfUiComponentSpinnerComponent implements OnInit {

  @Input() size?: number = 3;
  fasize: string;

  constructor() {}

  ngOnInit() {
    this.fasize = this.size + 'x';
  }

}
