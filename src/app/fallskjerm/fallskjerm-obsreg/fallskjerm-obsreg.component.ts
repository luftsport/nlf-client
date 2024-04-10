import { Component, OnInit } from '@angular/core';
import { ApiObservationsAggService } from 'app/api/api-observations-agg.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'nlf-fallskjerm-obsreg',
  templateUrl: './fallskjerm-obsreg.component.html',
  styleUrls: ['./fallskjerm-obsreg.component.css']
})
export class NlfFallskjermObsregComponent implements OnInit {

  dataReady = false;
  foreigners = [];
  userCount = [];
  usersReportingCount = [];

  discipline = 812296;

  constructor(
    private aggService: ApiObservationsAggService,
  ) { }

  ngOnInit(): void {
    this.aggService.setActivity('fallskjerm');

    forkJoin([
      this.aggService.getUsersForeign(this.discipline),
      this.aggService.getUserCount(this.discipline),
      this.aggService.getUsersCreatedReports(this.discipline)
    ]).subscribe(
      data => {
        this.foreigners = data[0]['_items'];
        this.userCount = data[1]['_items'];
        this.usersReportingCount = data[2]['_items'];

      },
      err => console.error('[ERROR]', err),
      () => this.dataReady = true
    )


  }

}
