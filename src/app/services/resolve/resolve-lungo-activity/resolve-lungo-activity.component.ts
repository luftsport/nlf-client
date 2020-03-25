import { Component, OnInit, Input } from '@angular/core';
import { ApiCacheService } from 'app/api/api-cache.service';
import { LungoActivitiesService } from 'app/api/lungo-activities.service';
import { ApiOptionsInterface } from 'app/api/api.interface';
import { LungoActivitiesItem } from 'app/api/lungo.interface';

@Component({
  selector: 'nlf-resolve-lungo-activity',
  templateUrl: './resolve-lungo-activity.component.html',
  styleUrls: ['./resolve-lungo-activity.component.css']
})
export class NlfResolveLungoActivityComponent implements OnInit {


  @Input() activity_id: string;
  @Input() link: false;
  @Input() long: false;

  activity: LungoActivitiesItem;
  dataReady = false;

  constructor(private activitiesService: LungoActivitiesService,
              private apiCache: ApiCacheService) { }

  ngOnInit() {

    const options: ApiOptionsInterface = {
      query: { projection: { name: 1, id: 1 } }
    };

    this.apiCache.get(['get-lungo-activity', this.activity_id, options.query],
                      this.activitiesService.getActivity(this.activity_id, options)).subscribe(
      data => {
        this.activity = data;

        /* @TODO: see if long should be used? BFSK, Bergen, Bergen Fallskjermklubb
        if (this.long = true) {
          this.activityName = data.name;
        }
        else {
          this.activityName = data.name.replace(' Fallskjermklubb', '');
        }
        */
      },
      err => this.activity = { name: 'Ukjent aktivitet', id: 0, _id: '' },
      () => this.dataReady = true
    );
  }

}
