import { Pipe, PipeTransform, Inject } from '@angular/core';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfConfigItem } from 'app/api/api.interface';
import { Observable } from 'rxjs';

@Pipe({
  name: 'nlfActivity'
})
export class NlfActivityPipe implements PipeTransform {
  private config: NlfConfigItem;

  constructor(private configService: NlfConfigService) {

  }

  transform(value: any, args?: any): Observable<any> {
    return Observable.create(observer => {

      this.configService.observableConfig.subscribe(
        data => {
          this.config = data;
          observer.next(this.config.inv_mapping[value]);
          observer.complete();
        }
      );
    });
  };

}
