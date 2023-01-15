import { Component, OnInit, Input } from '@angular/core';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { ApiOptionsInterface, ApiUserORSList, ApiUserORSItem } from 'app/api/api.interface';
import { ApiUserDataSubjectItem, NlfConfigItem } from 'app/api/api.interface';
import { NlfUserSubjectService } from 'app/user/user-subject.service';
import { NlfConfigService } from 'app/nlf-config.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'nlf-user-ors',
  templateUrl: './user-ors.component.html',
  styleUrls: ['./user-ors.component.css']
})
export class NlfUserOrsComponent implements OnInit {

  @Input() activity: string;
  observations: any;
  dataReady = false;


  constructor(
    private orsService: ApiObservationsService,
  ) {
  }

  ngOnInit() {
    this.orsService.setActivity(this.activity);
    const options: ApiOptionsInterface = {
      query: {
        sort: [{ 'when': -1 }]
      },
    };
    this.orsService.getObservationsSelf(options).subscribe(
      data => {
        this.observations = data['_items'];
        this.dataReady = true;
      },
      err => console.log(err),
      () => this.dataReady = true
    )
  }

}
