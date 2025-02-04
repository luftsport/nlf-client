import { Component, OnInit, Input, Inject } from '@angular/core';
import { ApiOptionsInterface, NlfConfigItem } from 'app/api/api.interface';
import { ApiE5XChoicesService } from 'app/api/api-e5x-choices.service';
import { ApiE5XAttributesService } from 'app/api/api-e5x-attributes.service';
import { e5xParseLabel } from 'app/interfaces/functions';
import { NlfConfigService } from 'app/nlf-config.service';
import { ApiCacheService } from 'app/api/api-cache.service';
// import { forkJoin } from 'rxjs';

@Component({
  selector: 'nlf-ors-editor-tag-e5x-render',
  templateUrl: './ors-editor-tag-e5x-render.component.html',
  styleUrls: ['./ors-editor-tag-e5x-render.component.css']
})
export class NlfOrsEditorTagE5xRenderComponent implements OnInit {
  @Input() items: any; // Value or array of
  @Input() path: string;
  @Input() unit: string;
  @Input() customLabel: string;
  @Input() showLabel = true;
  @Input() classes: string;
  @Input() activity: string = 'motorfly';

  arr = [];
  label: string;
  rit_version: string;
  private config: NlfConfigItem;

  constructor(
    private attributeService: ApiE5XAttributesService,
    private choicesService: ApiE5XChoicesService,
    private configService: NlfConfigService,
    private apiCache: ApiCacheService) {


    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
        this.rit_version = this.config[this.activity]['observation']['e5x']['rit_version'];
      }
    );
  }

  ngOnInit() {

    if (!Array.isArray(this.items)) {
      console.log('ERR', 'Not array in render', this.items);
    }

    this.items = this.items.map(function (x) { 
      return parseInt(x, 10); 
    });

    this.label = e5xParseLabel(this.path);

    const options: ApiOptionsInterface = {
      query: {
        where: {
          attribute: this.path,
          rit_version: this.rit_version
        }
      }
    }
    this.apiCache.get(
      ['e5x-attribute', this.activity, options.query],
      this.attributeService.getAttributes(options)).subscribe(
        data => {
          if (data._items.length > 0) {

            if (!!data._items[0].choices_key) {
              const coptions: ApiOptionsInterface = {
                query: {
                  where: {
                    key: data._items[0].choices_key,
                    id: { $in: this.items },
                    rit_version: this.rit_version
                  }
                }
              }
              this.choicesService.getChoices(coptions).subscribe(
                data => {
                  data._items.forEach(row => {
                    this.arr.push(row.label);
                  })
                }
              )
            } else {
              this.arr = this.items;
            }
        } else {
          this.arr = this.items;
        }
      },
      err => {
        console.log('Error getting choices', err);
        this.arr = this.items;
      },
    )
  }

}
