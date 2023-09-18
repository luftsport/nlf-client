import { Pipe, PipeTransform, Inject, Input } from '@angular/core';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfConfigItem } from 'app/api/api.interface';
import { timeout, catchError } from 'rxjs/operators';
import { has as _has } from 'lodash';

@Pipe({
  name: 'nlfOrsRating'
})
export class NlfOrsRatingPipe implements PipeTransform {

  public config: NlfConfigItem;

  // If safari
  private _rating = [
    {
      "label": null,
      "value": 0,
      "badge": "danger"
    },
    {
      "label": "Alt OK",
      "value": 1,
      "badge": "success"
    },
    {
      "label": "Til ettertanke",
      "value": 2,
      "badge": "info"
    },
    {
      "label": "Mindre skade",
      "value": 3,
      "badge": "warning"
    },
    {
      "label": "Middels skade",
      "value": 4,
      "badge": "warning"
    },
    {
      "label": "Alvorlig skade",
      "value": 5,
      "badge": "danger"
    },
    {
      "label": "Alvorlig skade/men",
      "value": 6,
      "badge": "danger"
    },
    {
      "label": "Død",
      "value": 7,
      "badge": "dark"
    },
    {
      "label": "Flere døde",
      "value": 8,
      "badge": "dark"
    }
  ];


  constructor(private configService: NlfConfigService) {
    this.configService.observableConfig.subscribe( // pipe(timeout(10000), catchError(error => error = error)).
      data => {
        this.config = data;
      },
      e => console.error(e),
      () => { }
    );
    // Convert to promise making constructor wait until data arrives
    this.configService.observableConfig.toPromise().then(x => console.log('toPromise', x));
  }

  transform(rating: number, activity: string): any {
    if (rating > 0 && rating < 9) {

      try {
        return this.config[activity].observation.rating[rating]['label'];
      } catch (error) {
        console.log('Could not assign label from config', error);
      }
      return this._rating[rating || 0]['label'];
    }

    return 'Ukjent';

  }



}
