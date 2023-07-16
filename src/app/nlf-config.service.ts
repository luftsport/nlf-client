import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { NlfConfigItem } from 'app/api/api.interface';
import { ApiConfigService } from 'app/api/api-config.service';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { VERSION } from 'environments/version';
import { environment } from 'environments/environment';

@Injectable()
export class NlfConfigService {

  private config = new ReplaySubject<NlfConfigItem>(); //BehaviorSubject<NlfConfigItem>(null);

  public observableConfig = this.config.asObservable();

  constructor(
    private configService: ApiConfigService,
    private alertService: NlfAlertService
  ) {

    this.init()
  }

  public init() {
    this.configService.getConfig().subscribe(
      data => {
        this.update(data);

        try {
          if(VERSION.version!=data.client_version && environment._name !== 'local') {
            let message = `Your application version "${VERSION.version}" do not correspond with the current version "${data.client_version}", please REFRESH your browser to avoid major application errors`;
            this.alertService.error(message);
            alert(message);
          }
        } catch (e) {
          console.log('Could not verify client version', e);
        }
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
