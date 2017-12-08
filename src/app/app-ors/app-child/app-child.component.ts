import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-app-child',
  templateUrl: './app-child.component.html',
  styleUrls: ['./app-child.component.css']
})
export class AppChildComponent {
  @Output() messageEvent = new EventEmitter<string>();

  other: string = 'sattan';

  constructor() { }

  public sendMessage() {
    console.log("Child:" + this.other);
    this.messageEvent.emit(this.other);
  }
}
