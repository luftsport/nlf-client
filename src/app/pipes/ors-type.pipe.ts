import { Pipe, PipeTransform, Inject } from '@angular/core';
import { NLF_CONFIG, NlfConfig } from '../nlf-config.module';

@Pipe({
  name: 'nlfOrsType'
})
export class NlfOrsTypePipe implements PipeTransform {

  constructor(@Inject(NLF_CONFIG) private config: NlfConfig) {}

  transform(value: string): string {
    let data = '';
    if (value === '' || typeof value === 'undefined') {
      return 'NA';
    }

    try {
      data = this.config.observation.types[value]['label'];
    }  catch (e) {
      data = 'Ukjent';
    }

    return data;
  }

}
