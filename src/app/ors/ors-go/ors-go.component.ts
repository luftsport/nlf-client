import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nlf-ors-go',
  templateUrl: './ors-go.component.html',
  styleUrls: ['./ors-go.component.css']
})
export class NlfOrsGoComponent implements OnInit {

  @Input() activity: string;
  ors_id;

  constructor(private router: Router) { }


  ngOnInit() {
  }

  public orsGOTO() {
    try {
      let _id = parseInt(this.ors_id);
      if (_id > 0) {
        this.router.navigate(['/ors', this.activity, 'report', _id]);
      } else {
        this.ors_id = undefined;
      }
    } catch (e) {
      this.ors_id = undefined;
      console.log(e);
    }
  }

}
