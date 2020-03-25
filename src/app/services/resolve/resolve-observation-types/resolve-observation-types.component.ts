import { Component, Input, OnInit, Inject } from '@angular/core';
import {  NlfConfigService } from 'app/nlf-config.service';
import { NlfConfigItem } from 'app/api/api.interface';

@Component({
  selector: 'nlf-resolve-observation-types',
  templateUrl: './resolve-observation-types.component.html',
  styleUrls: ['./resolve-observation-types.component.css']
})
export class NlfResolveObservationTypesComponent implements OnInit {

  @Input() type: string;
  @Input() activity: string;
  @Input() badge: boolean;

  name: string;
  color: string;
  public config: NlfConfigItem;

  constructor(private configService: NlfConfigService) { }

  ngOnInit() {

    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
        try {
          this.name = this.config[this.activity].observation.types[this.type]['label'];
          this.color = this.config[this.activity].observation.types[this.type]['badge'];
        } catch (e) {
          this.name = 'Ukjent';
          this.color = 'secondary';
        }
      }
    );

  }

}
