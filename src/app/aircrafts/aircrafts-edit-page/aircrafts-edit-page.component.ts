import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiAircraftsItem } from 'app/api/api.interface';
import { faPlane } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'nlf-aircrafts-edit-page',
  templateUrl: './aircrafts-edit-page.component.html',
  styleUrls: ['./aircrafts-edit-page.component.css']
})
export class NlfAircraftsEditPageComponent implements OnInit {
  faPlane = faPlane;

  public aircraft: ApiAircraftsItem;
  public callsign: string;

  constructor(private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.callsign = params['callsign'] ? params['callsign'] : undefined;
    });
   }

  ngOnInit() {
  }

}
