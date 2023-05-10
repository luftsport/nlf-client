import { Component, OnInit, Input } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-ui-component-spinner',
  templateUrl: './component-spinner.component.html',
  styleUrls: ['./component-spinner.component.css']
})
export class NlfUiComponentSpinnerComponent implements OnInit {

  @Input() size?: number = 3;
  @Input() inline?: boolean = false;
  fasize: string;
  faSpinner = faSpinner;

  
  constructor() {}

  ngOnInit() {
    this.fasize = this.size + 'x';
  }

}
