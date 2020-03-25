import { Component, Input } from '@angular/core';

@Component({
  selector: 'nlf-ors-error',
  templateUrl: './ors-error.component.html',
  styleUrls: ['./ors-error.component.css']
})
export class NlfOrsErrorComponent {

  @Input() id?: number;
  @Input() error?: any;
  @Input() activity: string;

  constructor() { }
}
