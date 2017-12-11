import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-app-child',
  templateUrl: './app-child.component.html',
  styleUrls: ['./app-child.component.css'],

})
export class AppChildComponent {

  id: number;
  message: string = '';

  /**
  Example getting route parameters.
  Should reference the current parent's id so the url always will resolve
  rx will keep the data in sync
  **/
  constructor(private data: DataService, private route: ActivatedRoute) {
    this.id = +route.snapshot.paramMap.get('id'); //unary or Number()
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
  }

  newMessage() {
    this.data.changeMessage(this.message)
  }
}
