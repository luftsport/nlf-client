import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-app-child',
  templateUrl: './app-child.component.html',
  styleUrls: ['./app-child.component.css'],

})
export class AppChildComponent {


  message: string = 'jteirooter';

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
  }

  newMessage() {
    //message is html instance, compiler complains thinks this must be this.message???
    this.data.changeMessage(message.value)
  }
}
