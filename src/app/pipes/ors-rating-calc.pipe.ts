import { Pipe, Input, PipeTransform } from '@angular/core';
import { ApiObservationRatingInterface } from 'app/api/api.interface';
import { calculateRating } from 'app/interfaces/functions';
@Pipe({
  name: 'nlfOrsRatingCalc',
  pure: false
})
export class NlfOrsRatingCalcPipe implements PipeTransform {

  transform(rating: ApiObservationRatingInterface): number {


    return calculateRating(rating.actual, rating.potential);
    const max = 7;  // 8 - 1 = 7
    const powa = 2; // Actual
    const powp = 3; // Potential
    // return Math.round((((((rating.actual -1 + Math.pow(rating.potential-1, 2) / max) - ((1 + Math.pow(1, 2)) / max)) / ((max + Math.pow(max, 2)) / max)))  ) * 100);
    /**
    let calc: number = Math.round((((((rating.actual-1 + Math.pow(rating.potential-1, 2) / max) - ((1 + Math.pow(1, 2)) / max)) / ((max + Math.pow(max, 2)) / max)))  / 1.7142857142857142 )  * 100);
    if (calc < 1) {
      calc = 1;
    } **/

    //let calc2: number = Math.round(Math.sqrt((rating.actual - 1 + Math.pow(rating.potential - 1, pow)) / (max + Math.pow(max, pow))) * 100);
    let calc: number = Math.round(Math.sqrt((Math.pow(rating.actual - 1, powa) + Math.pow(rating.potential - 1, powp)) / (Math.pow(max, powa) + Math.pow(max, powp))) * 100);

    if (calc < 1) {
      calc = 1;
    }

    return calc;


  }

}

    /// 1.777777777777778 9
    /// / 1.75 8
    /// 8-1 = 7 '
    // 7: 1.7142857142857142
