import { Component, OnInit } from '@angular/core';
import { LungoIntegrationChangesAggregateList } from 'app/api/api.interface';
import { LungoService } from 'app/api/lungo.service';
import { NlfAlertService } from 'app/services/alert/alert.service';

@Component({
  selector: 'nlf-changes-hour',
  templateUrl: './changes-hour.component.html',
  styleUrls: ['./changes-hour.component.css']
})
export class NlfChangesHourComponent implements OnInit {

  dataReady = false;
  hours = [];

  constructor(private lungo: LungoService,
    private alertService: NlfAlertService) {

  }


  ngOnInit() {

    this.lungo.getIntegrationChangesByHour().subscribe(
      data => {

        data._items.forEach(element => {
          if (element._id.hour < 23) {
            this.hours.push({ 'name': element._id.hour + 1, value: element.count });
          } else {
            this.hours.unshift({ 'name': 0, value: element.count });
          }
        });
      },
      err => {
        this.alertService.error(err.message);
      },
      () => this.dataReady = true
    );
  }

}
