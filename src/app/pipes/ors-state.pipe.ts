import { Pipe, PipeTransform, Inject } from '@angular/core';
import {  NlfConfigService } from 'app/nlf-config.service';
import { NlfConfigItem } from 'app/api/api.interface';

@Pipe({
  name: 'nlfOrsState'
})
export class NlfOrsStatePipe implements PipeTransform {

  public config: NlfConfigItem;

  constructor(private configService: NlfConfigService) {
    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
      }
    );

  }

  transform(value: any, activity: string, args?: any): any {

    let data = '';

    try {
      data = this.config[activity].observation.state[value]['label'];
    } catch (e) {
      data = 'Ukjent';
    }
    return data;
  }

}
