import { Pipe, PipeTransform, Inject } from '@angular/core';
import {  NlfConfigService } from 'app/nlf-config.service';
import { NlfConfigItem } from 'app/api/api.interface';

/**
 * Needs to get attributes from server => resolver
 *
 * Note it needs to be used in html element as innerHTML
 */
@Pipe({
  name: 'nlfOrsComponentAttributes'
})
export class NlfOrsComponentAttributesPipe implements PipeTransform {

  public config: NlfConfigItem;

  constructor(private configService: NlfConfigService) {
    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
      }
    );
  };

  transform(value: any, activity: string, badge: boolean = true, seperator: string = ' '): any {

    if (value instanceof Array) {
      return this.multiple(value, activity, badge, seperator);
    } else if (typeof value === 'string') {
      return this.one(value, activity, badge);
    } else {
      return '';
    }
  }

  private one(value: string, activity: string, badge: boolean = true): string {

    if (badge) {
      return '<span class="badge bg-${config[activity].observation.components.attributes[value][\'color\']}">${config[activity].observation.components.attributes[value][\'label\']}</span>';
    } else {
      return this.config[activity].observation.components.attributes[value]['label'];
    }
  }

  private multiple(value: Array<string>, activity: string, badge: boolean, seperator: string) {

    if (value.length > 0) {
      let data: string[] = [];

      for (let v of value) {
        data.push(this.one(v, activity, badge));
      }

      return data.join(seperator);
    } else {
      return '';
    }

  }

}
