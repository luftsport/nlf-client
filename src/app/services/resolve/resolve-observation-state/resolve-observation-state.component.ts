import { Component, Input, OnInit, Inject } from '@angular/core';
import { environment } from 'environments/environment';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfConfigItem } from 'app/api/api.interface';
import {
  faExclamation,
  faBan,
  faPencil,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'nlf-resolve-observation-state',
  templateUrl: './resolve-observation-state.component.html',
  styleUrls: ['./resolve-observation-state.component.css']
})
export class NlfResolveObservationStateComponent implements OnInit {

  @Input() state: string;
  @Input() activity: string;
  @Input() badge: boolean = true;
  @Input() icon: boolean;
  public config: NlfConfigItem;

  public icons = {
    exclamation: faExclamation,
    ban: faBan,
    pencil: faPencil,
    check: faCheck,
    clock: faClock
  };

  constructor(private configService: NlfConfigService) { }

  ngOnInit() {
    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
        if (!this.state || !this.config[this.activity].observation.state[this.state]) {
          this.state = 'unknown';
        }
      }
    );


  }

}
