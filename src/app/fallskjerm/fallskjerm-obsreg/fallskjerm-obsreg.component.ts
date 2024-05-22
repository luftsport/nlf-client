import { Component, OnInit } from '@angular/core';
import { ApiObservationsAggService } from 'app/api/api-observations-agg.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

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
  activity = 'fallskjerm';
  person;

  constructor(
    private aggService: ApiObservationsAggService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.aggService.setActivity('fallskjerm');

    setTimeout(() => {
      const focusEl: any = document.querySelector('#personSearch').querySelector('input');
      focusEl.focus();
    }, 250);

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

  goToPerson($event) {
    console.log(this.person.id);
    this.router.navigateByUrl('/' + this.activity + '/obsreg/user/reports/' + this.person.id);
  }

}
