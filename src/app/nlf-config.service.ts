import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { NlfConfigItem } from 'app/api/api.interface';
import { ApiConfigService } from 'app/api/api-config.service';

@Injectable()
export class NlfConfigService {

  private config = new ReplaySubject<NlfConfigItem>(); //BehaviorSubject<NlfConfigItem>(null);

  public observableConfig = this.config.asObservable();

  constructor(
    private configService: ApiConfigService
  ) {

    this.init()
  }

  public init() {
    this.configService.getConfig().subscribe(
      data => {
        this.update(data);
      },
      err => console.log('[ERR]', err)
    );
  }

  public update(data: NlfConfigItem) {

    this.config.next(data);
  }

  public reset() {
    this.config.next({});
  }

}
