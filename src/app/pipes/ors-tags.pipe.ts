import { Pipe, PipeTransform } from '@angular/core';

/**
 * Just format and return the joined tags
 */
@Pipe({
  name: 'nlfOrsTags'
})
export class NlfOrsTagsPipe implements PipeTransform {

  transform(value: Array<string>, seperator: string = ' ', length: number = 1000, append: string = ''): string {

    const data = value.join('  '); // double spaces


    if ( (data.length - (value.length - seperator.length) ) > length) {
      return data.substr(0, length).trim().replace('  ', seperator) + append;
    } else {
      return data.trim().replace('  ', seperator);
    }
  }



}

