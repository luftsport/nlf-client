import { Component, OnInit, Input } from '@angular/core';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfConfigItem } from 'app/api/api.interface';

@Component({
  selector: 'nlf-resolve-config',
  templateUrl: './resolve-config.component.html',
  styleUrls: ['./resolve-config.component.css']
})
export class NlfResolveConfigComponent implements OnInit {

  @Input() activity: string;
  @Input() category: string;
  @Input() key: string;
  @Input() value: any;
  @Input() itemKey: any;
  @Input() itemLabel: string = 'label';

  result: any;
  public config: NlfConfigItem;

  constructor(private configService: NlfConfigService) { }

  ngOnInit(): void {
    this.configService.observableConfig.subscribe(
      data => {
        try {
        //this.rendered = data[this.activity][this.category][this.key][this.value][this.label];

        this.result = Object.entries(data[this.activity][this.category][this.key]).filter(([k,v]) => {
          if(v[this.itemKey] === this.value) { //[0][0];
            return v[this.itemKey];
          }
        });
        } catch(e) {
          console.error('Could not resolve config value for ', this.activity, this.category, this.key, this.value, 'with label', this.itemKey, this.itemLabel);
        }
        //this.activity_config = this.config[this.activity]
      }
    );



  }

}
