import { Component, Input, OnInit, Inject } from '@angular/core';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfConfigItem } from 'app/api/api.interface';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-resolve-observation-flags',
  templateUrl: './resolve-observation-flags.component.html',
  styleUrls: ['./resolve-observation-flags.component.css']
})
export class NlfResolveObservationFlagsComponent implements OnInit {

  @Input() flag: string;
  @Input() activity: string;
  @Input() badge?: boolean;
  @Input() icon?: boolean;

  name: string;
  public config: NlfConfigItem;

  faFlag = faFlag;

  constructor(private configService: NlfConfigService) {
  }

  ngOnInit() {
    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
        try {
          this.name = this.config[this.activity].observation.flags[this.flag]['label'];
        } catch (e) {
          console.error(this.activity, this.config); //[this.activity].observation.flags);
          this.name = 'Ukjent';
        }
      }
    );
  }

}
