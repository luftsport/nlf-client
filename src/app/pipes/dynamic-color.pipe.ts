import { NlfOrsRatingCalcPipe } from './ors-rating-calc.pipe';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nlfDynamicColor'
})
export class NlfDynamicColorPipe implements PipeTransform {

  transform(value: any): any {
    let type: string;
   
    if (value < 15 ) {
      type = 'secondary';
    } else if (value < 25) {
      type = 'info';
    } else if (value < 40) {
      type = 'primary';
    } else if (value < 70) {
      type = 'warning';
    } else if (value < 85) {
      type = 'danger';
    } else {
      type = 'dark';
    }

    return type;
  }

}
