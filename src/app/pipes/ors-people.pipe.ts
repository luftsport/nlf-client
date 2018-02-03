import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nlfOrsPeople'
})
export class NlfOrsPeoplePipe implements PipeTransform {

  /**
   * 
   * @param value Transforms { int(id): {id, fullname}} => [{id,fullname},..]
   * @param args 
   */
  transform(value: Object): any {
    let arr = [];
    for (let key of Object.keys(value)) {
      arr.push(value[key]);
    }
    return arr;
  }

}
