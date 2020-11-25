import { Component, OnInit, Input } from '@angular/core';
import { ApiUserService } from 'app/api/api-user.service';
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
    private userService: ApiUserService,
  ) {
  }

  ngOnInit() {
    const options: ApiOptionsInterface = {
      query: {
        sort: [{ 'when': -1 }]
      },
    };
    this.userService.getUserObservations(this.activity, options).subscribe(
      data => {
        this.observations = data['_items'];
        this.dataReady = true;
      },
      err => console.log(err),
      () => this.dataReady = true
    )
  }

}
