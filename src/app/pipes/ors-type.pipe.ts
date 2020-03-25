import { Pipe, PipeTransform, Inject } from '@angular/core';
import {  NlfConfigService } from 'app/nlf-config.service';
import { NlfConfigItem } from 'app/api/api.interface';

@Pipe({
  name: 'nlfOrsType'
})
export class NlfOrsTypePipe implements PipeTransform {
  public config: NlfConfigItem;

  constructor(private configService: NlfConfigService) {

    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
      }
    );
  }

  transform(value: string, activity: string): string {
    let data = '';
    if (value === '' || typeof value === 'undefined') {
      return 'NA';
    }

    try {
      data = this.config[activity].observation.types[value]['label'];
    } catch (e) {
      data = 'Ukjent';
    }

    return data;
  }

}
