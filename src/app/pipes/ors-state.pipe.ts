import { Pipe, PipeTransform, Inject } from '@angular/core';
import { NLF_CONFIG, NlfConfig } from 'app/nlf-config.module';

@Pipe({
  name: 'nlfOrsState'
})
export class NlfOrsStatePipe implements PipeTransform {

  constructor(@Inject(NLF_CONFIG) private config: NlfConfig) {}

  transform(value: any, args?: any): any {

    let data = '';

    try {
      data = this.config.observation.state[value]['label'];
    } catch (e) {
      data = 'Ukjent';
    }
    return data;
  }

}
