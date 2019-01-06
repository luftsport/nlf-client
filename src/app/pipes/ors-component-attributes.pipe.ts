import { Pipe, PipeTransform, Inject } from '@angular/core';
import { NLF_CONFIG, NlfConfig } from 'app/nlf-config.module';

/**
 * Needs to get attributes from server => resolver
 * 
 * Note it needs to be used in html element as innerHTML
 */
@Pipe({
  name: 'nlfOrsComponentAttributes'
})
export class NlfOrsComponentAttributesPipe implements PipeTransform {
  
  constructor(@Inject(NLF_CONFIG) private config: NlfConfig) {};

  transform(value: any, badge: boolean = true, seperator: string = ' '): any {

    if (value instanceof Array) {
      return this.multiple(value, badge, seperator);
    } else if (typeof value === 'string') {
      return this.one(value, badge);
    } else {
      return '';
    }

  }

  private one(value: string, badge: boolean): string {

    if (badge) {
      return '<span class="badge badge-${config.observation.components.attributes[value][\'color\']}">${config.observation.components.attributes[value][\'label\']}</span>';
    } else {
      return this.config.observation.components.attributes[value]['label'];
    }
  }

  private multiple(value: Array<string>, badge: boolean, seperator: string) {

    if (value.length > 0) {
      let data: string[] = [];

      for (let v of value) {
        data.push(this.one(v, badge));
      }

      return data.join(seperator);
    } else {
      return '';
    }

  }

}
