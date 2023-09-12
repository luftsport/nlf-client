import { Pipe, PipeTransform, Inject, Input } from '@angular/core';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfConfigItem } from 'app/api/api.interface';
import { timeout, catchError } from 'rxjs/operators';

@Pipe({
  name: 'nlfOrsRating'
})
export class NlfOrsRatingPipe implements PipeTransform {

  public config: NlfConfigItem;

  constructor(private configService: NlfConfigService) {
    this.configService.observableConfig.pipe(timeout(10000), catchError(error => error = error)).subscribe(
      data => {
        this.config = data;
      },
      e => console.log(e),  
      () => {}
    );

  }

  transform(rating: number, activity: string): any {
    if (rating > 0 && rating < 9) {
      return this.config[activity].observation.rating[rating]['label'];
    }
  }

}
