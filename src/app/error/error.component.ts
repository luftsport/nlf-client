import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class NlfErrorComponent implements OnInit {

  error: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.error = this.route.snapshot.data['error'];
    this.route.data.subscribe(
      (data: Data) => {
        this.error = data['error'];
      }
    );
  }
}
