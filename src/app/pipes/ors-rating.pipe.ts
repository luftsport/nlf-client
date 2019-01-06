import { Pipe, PipeTransform, Inject, Input } from '@angular/core';
import { NLF_CONFIG, NlfConfig } from 'app/nlf-config.module';

@Pipe({
  name: 'nlfOrsRating'
})
export class NlfOrsRatingPipe implements PipeTransform {

  constructor(@Inject(NLF_CONFIG) private config: NlfConfig) {};

  transform(rating: any): any {
    if (rating > 0 && rating < 9) {
      return this.config.observation.rating[rating]['label'];
    }
  }

}
