import { Pipe, Input, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nlfOrsRating'
})
export class NlfOrsRatingPipe implements PipeTransform {

  @Input() rating: number;
  @Input() badge?: boolean;

  map: Array<string> = [ null,
                        'Alt OK', // 1
                        'Til ettertanke', // 2
                        'Mindre skade', // 3
                        'Middels skade', // 4
                        'Alvorlig skade', // 5
                        'Alvorlig skade/men', // 6
                        'Død', // 7
                        'Flere døde' // 8
                      ];

  transform(rating: any): any {
    if (rating > 0 && rating < 9) {

      return this.map[rating];
    }
  }

}
