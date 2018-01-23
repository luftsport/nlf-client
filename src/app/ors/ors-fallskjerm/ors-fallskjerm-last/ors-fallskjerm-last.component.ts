import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiObservationsService } from '../../../api/api-observations.service';
import { ApiOptionsInterface, ApiObservationsList } from '../../../api/api.interface';
import { ApiCacheService } from '../../../api/api-cache.service';

@Component({
  selector: 'nlf-ors-fallskjerm-last',
  templateUrl: './ors-fallskjerm-last.component.html',
  styleUrls: ['./ors-fallskjerm-last.component.css']
})
export class NlfOrsFallskjermLastComponent implements OnInit {

  @Input() number;
  dataReady = false;

  data: any;

  constructor(private orsService: ApiObservationsService,
    private apiCache: ApiCacheService) { }

  ngOnInit() {
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

    this.apiCache.get(['ors-last', options.query], this.orsService.getObservations(options), 1 * 60 * 1000).subscribe(
      data => {
        this.data = data._items;
      },
      err => console.log(err),
      () => this.dataReady = true
    );
  }

}
