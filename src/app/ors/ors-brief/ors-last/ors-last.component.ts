import { Component, Input, OnInit } from '@angular/core';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { ApiOptionsInterface, ApiObservationsList } from 'app/api/api.interface';
import { ApiCacheService } from 'app/api/api-cache.service';

@Component({
  selector: 'nlf-ors-last',
  templateUrl: './ors-last.component.html',
  styleUrls: ['./ors-last.component.css']
})
export class NlfOrsLastComponent implements OnInit {

  @Input() number;
  @Input() activity: string;

  dataReady = false;
  total: number = 0;
  data: any;
  error = false;

  constructor(private orsService: ApiObservationsService,
              private apiCache: ApiCacheService) {

  }

  ngOnInit() {

    this.data = [];
    this.total = 0;
    this.orsService.setActivity(this.activity);

    if (typeof this.number === 'undefined') {
      this.number = 3;
    }

    const options: ApiOptionsInterface = {
      query: {
        max_results: this.number,
        sort: [{ when: -1 }],
        where: { 'workflow.state': 'closed' },
        // projection: {id: 1}
        // projection: {id: 1, _id: 1, _updated: 1, tags: 1, rating: 1}
      },
    };

    this.apiCache.get(
      ['ors-last', options.query, this.activity],
      this.orsService.getObservations(options), 1 * 60 * 1000).subscribe(
      data => {
        this.data = data._items;
        this.total = data._meta.total || 0;
        this.error = false;
      },
      err => {
        console.log(err);
        this.error = true;
      }
        ,
      () => this.dataReady = true
    );
  }

}
