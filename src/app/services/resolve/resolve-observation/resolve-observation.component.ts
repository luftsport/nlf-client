import { ApiOptionsInterface } from 'app/api/api.interface';
import { Component, Input, OnInit } from '@angular/core';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { ApiCacheService } from 'app/api/api-cache.service';

@Component({
  selector: 'nlf-resolve-observation',
  templateUrl: './resolve-observation.component.html',
  styleUrls: ['./resolve-observation.component.css']
})
export class NlfResolveObservationComponent implements OnInit {

  @Input() id: number;
  @Input() activity: string;
  @Input() link?: boolean;
  @Input() title?: boolean;
  @Input() ask?: boolean;
  @Input() state?: string;
  @Input() popover?: boolean;
  @Input() acl?: boolean;

  dataReady = false;
  observation = { title: '', id: 0, _id: '' };

  constructor(private orsService: ApiObservationsService,
    private apiCache: ApiCacheService) { }

  ngOnInit() {


    /**let options: ApiOptionsInterface = {
      query: { projection: { id: 1, tags: 1, 'workflow.state': 1 } }
    };

    this.orsService.getObservation(this.id, options).subscribe(**/
    this.apiCache.get(
      ['observation-component', this.id, {}],
      this.orsService.getObservation(this.id)
    ).subscribe(
      data => {
        this.observation.id = data.id;
        this.observation._id = data._id;
        if (!!data.tags) {
          this.observation.title = data.tags.join(' ');
        } else {
          this.observation.title = 'No title';
        }
      },
      err => {
        this.observation.title = 'Ukjent observasjon (' + this.id + ')';
        this.id = 0;
      },
      () => this.dataReady = true
    );

  }

}
