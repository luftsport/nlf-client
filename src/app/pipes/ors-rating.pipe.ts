import { Pipe, PipeTransform, Inject, Input } from '@angular/core';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfConfigItem } from 'app/api/api.interface';

@Pipe({
  name: 'nlfOrsRating'
})
export class NlfOrsRatingPipe implements PipeTransform {

  public config: NlfConfigItem;

  constructor(private configService: NlfConfigService) {
    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
      }
    );

  }

  transform(rating: number, activity: string): any {
    if (rating > 0 && rating < 9) {
      return this.config[activity].observation.rating[rating]['label'];
    }
  }

}
