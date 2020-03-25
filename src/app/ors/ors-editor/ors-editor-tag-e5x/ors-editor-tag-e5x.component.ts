import { Component, OnInit, Input, Output, EventEmitter, OnChanges, Inject } from '@angular/core';
import { ApiE5XAttributesItem, ApiE5XAttributesList, ApiE5XChoicesItem, ApiE5XChoicesList, ApiOptionsInterface, NlfConfigItem } from 'app/api/api.interface';
import { ApiE5XChoicesService } from 'app/api/api-e5x-choices.service';
import { ApiE5XAttributesService } from 'app/api/api-e5x-attributes.service';
import { distinctUntilChanged, debounceTime, switchMap, tap, catchError, map } from 'rxjs/operators';
import { Subject, Observable, of, concat } from 'rxjs';
import { ApiCacheService } from 'app/api/api-cache.service';
import { e5xParseLabel } from 'app/interfaces/functions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NlfConfigService } from 'app/nlf-config.service';

export interface TagInterface {
  value: number;
  label: string;
  descr?: string;
  expl?: string;
}

@Component({
  selector: 'nlf-ors-editor-tag-e5x',
  templateUrl: './ors-editor-tag-e5x.component.html',
  styleUrls: ['./ors-editor-tag-e5x.component.css']
})
export class NlfOrsEditorTagE5XComponent implements OnInit {

  @Input() items: any; //numbernumber[] = [];
  @Output() itemsChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  @Input() allowed: number[] = [];

  @Input() show_help: boolean = true;
  @Input() unit: string;
  @Input() title: string;
  @Input() type: string;

  @Input() path: string; //Occurrence.DewPoint
  @Input() label: string;
  @Input() max_results: number = 100; // Max results searching and populatiing
  @Input() classes: string = '';
  @Input() disabled: boolean = false;
  @Input() element_id: string;
  @Input() activity: string = 'motorfly';

  // ng-select
  tags$: Observable<ApiE5XChoicesItem[]> | ApiE5XChoicesItem[];
  tagsLoading = false;
  tagsInput$ = new Subject<string>();
  search = false;
  modalRef;

  selectedTags: any; //: any; //[];

  attribute: ApiE5XAttributesItem;
  choices: ApiE5XChoicesItem[] = []; //ApiE5XChoicesItem[];
  rit_version: string;
  public config: NlfConfigItem;

  constructor(
    private attributeService: ApiE5XAttributesService,
    private choicesService: ApiE5XChoicesService,
    private apiCache: ApiCacheService,
    private modalService: NgbModal,
    private configService: NlfConfigService
  ) { }

  ngOnInit() {
    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
        this.rit_version = this.config[this.activity]['observation']['e5x']['rit_version'];
        this.init();
      }
    );
  }

  ngOnChanges(changes) {
    this.init();
  }

  private init() {
    // Rebuild?
    if (!this.element_id) {
      this.element_id = this.path;
    }

    if (!this.label) {
      this.label = e5xParseLabel(this.path);
    }

    const aoptions: ApiOptionsInterface = {
      query: {
        where: {
          attribute: this.path,
          rit_version: this.rit_version
        }
      }
    }
    this.apiCache.get(
      ['e5x-attributes', aoptions.query],
      this.attributeService.getAttributes(aoptions))
      .subscribe(
        data => {
          if (data._items.length > 0) {
            this.attribute = data._items[0];

            if (!!this.attribute.choices_key) {
              let coptions: ApiOptionsInterface = {
                query: {
                  where: {
                    key: this.attribute.choices_key,
                    rit_version: this.rit_version
                  },
                  max_results: this.max_results
                },
              }

              if (this.allowed.length > 0) {
                coptions.query.where['id'] = { $in: this.allowed };
              }
              this.apiCache.get(
                ['e5x-choices', coptions.query],
                this.choicesService.getChoices(coptions))
                .subscribe(
                  data => {
                    if (data._meta.total > data._meta.max_results) {

                      this.rebuild();

                    } else {

                      this.choices = data._items;
                      /**
                      data._items.forEach(
                        ele => {
                          this.choices.push({ value: +ele.value, label: ele.label, descr: ele.descr, expl: ele.expl });
                        }
                      );
                      */
                    }
                  }
                )
            }
          } else {
            console.log('Error getting the attribute: ' + this.path);
          }
        }
      )
  }

  private rebuild() {

    this.choicesService.getChoices({
      query: {
        where: {
          key: this.attribute.choices_key,
          id: (Array.isArray(this.items)) ? { $in: this.items } : this.items,
          rit_version: this.rit_version
        },
      },
    }).subscribe(
      data => {
        if (Array.isArray(this.items)) {
          this.selectedTags = data._items;
        } else if (data._items.length === 1) {
          this.selectedTags = data._items[0];
        }

        /**
        data._items.forEach(
          ele => {
            this.choices.push({ id: +ele.value, label: ele.label, descr: ele.descr, expl: ele.expl });
          }
        )
         */
      },
      err => { },
      () => this.searchTags()
    );
  }

  /**
   * For single tag
   * @param event
   */
  public update(event) {
    this.itemsChange.emit(this.items);
    this.change.emit(true);
  }

  /**
   * For multiple tags
   * @param event
   */
  public onChange(event) {

    if (this.attribute.max > 1) {
      if (!!this.selectedTags) {
        this.itemsChange.emit(this.selectedTags.map(x => x.id));
      } else {
        this.itemsChange.emit([]);
      }
    } else {
      if (!!this.selectedTags) {
        this.itemsChange.emit(this.selectedTags.id);
      } else {
        this.itemsChange.emit(null);
      }
    }

    this.change.emit(true);

  }

  private preloadTags() {
    let a: ApiE5XChoicesItem[];
    this.tags$ = this.choicesService.getChoices({
      query: {
        where: {
          where: { key: this.attribute.choices_key },
          max_results: 100,
          rit_version: this.rit_version
        },
        sort: [{ freq: -1 }]
      }
    }).pipe(
      map((r) => a = r._items),
      catchError(() => of([])), // empty list on error
      tap(() => this.tagsLoading = false)
    );
  }

  private searchTags() {
    this.search = true;
    let a: ApiE5XChoicesItem[];
    this.tags$ = concat(
      of([]), // default items
      this.tagsInput$.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => this.tagsLoading = true),
        switchMap(term => this.choicesService.getChoices({
          query: {
            where: {
              key: this.attribute.choices_key,
              $text: { $search: term },
              rit_version: this.rit_version,
            },
            projection: { _score: { $meta: 'textScore' }, id: 1, label: 1, descr: 1, expl: 1, key: 1, value: 1 },
            sort: '[("_score", {"$meta": "textScore"})]'
          }
        }).pipe(
          map((r) => a = r._items),
          catchError(() => of([])), // empty list on error
          tap(() => this.tagsLoading = false)
        ))
      )
    );
  }

  /**
  Help stuff!
  **/
  public openModal(template) {
    this.modalRef = this.modalService.open(template, { size: 'lg', backdrop: 'static', keyboard: false });
  }

}
