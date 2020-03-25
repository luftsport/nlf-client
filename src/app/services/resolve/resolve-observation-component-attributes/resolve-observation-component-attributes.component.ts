import { ApiObservationComponentAttributesInterface, NlfConfigItem } from 'app/api/api.interface';
import { Component, Input, OnInit, Inject } from '@angular/core';
import {  NlfConfigService } from 'app/nlf-config.service';

@Component({
  selector: 'nlf-resolve-observation-component-attributes',
  templateUrl: './resolve-observation-component-attributes.component.html',
  styleUrls: ['./resolve-observation-component-attributes.component.css']
})
export class NlfResolveObservationComponentAttributesComponent implements OnInit {

  @Input() attributes: ApiObservationComponentAttributesInterface;
  @Input() activity: string;
  @Input() badge?: boolean;
  @Input() icon?: boolean;
  public config: NlfConfigItem;


  constructor(private configService: NlfConfigService) {
    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
      }
    );
  }

  ngOnInit() {


  }

}
