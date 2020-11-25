import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiAircraftsItem } from 'app/api/api.interface';

@Component({
  selector: 'nlf-aircrafts-view',
  templateUrl: './aircrafts-view.component.html',
  styleUrls: ['./aircrafts-view.component.css']
})
export class NlfAircraftsViewComponent implements OnInit {
  public callsign: string;
  constructor(private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.callsign = params['callsign'] ? params['callsign'] : undefined;
    });
   }

  ngOnInit() {
  }

}
