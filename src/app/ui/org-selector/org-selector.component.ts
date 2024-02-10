import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiOptionsInterface, NlfConfigItem } from 'app/api/api.interface';
import { Router } from '@angular/router';
import { LungoOrganizationsService } from 'app/api/lungo-organizations.service';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { NlfConfigService } from 'app/nlf-config.service';
import { environment } from 'environments/environment';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiCacheService } from 'app/api/api-cache.service';

@Component({
  selector: 'nlf-org-selector',
  templateUrl: './org-selector.component.html',
  styleUrls: ['./org-selector.component.css']
})
export class NlfOrgSelectorComponent implements OnInit {

  @Input() selected: number;
  @Output() selectedChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  @Input() size: string;
  @Input() activity: string;
  @Input() org_type: number = 14;
  @Input() is_active: boolean = true;

  ENV = environment;

  orgs = [];
  dataReady = false; // render when true
  public config: NlfConfigItem;

  constructor(
    private configService: NlfConfigService,
    private orgService: LungoOrganizationsService,
    private alertService: NlfAlertService,
    private router: Router,
    private apiCache: ApiCacheService

  ) { }

  ngOnInit() {
    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
        this.getClubs();
      }
    );
  }

  public getClubs() {

    const options: ApiOptionsInterface = {
      query: {
        where: {
          'main_activity.id': this.config['mapping'][this.activity],
          type_id: 14,
          is_active: true
        },
        max_results: 1000,
        projection: { id: 1, _id: 1, parent_id: 1, name: 1 }
      }
    };
    console.log('Main avc', options);

    this.apiCache.get(['get-select-organizations', this.activity, this.org_type, this.is_active, options.query],
      this.orgService.getOrganizations(options))
      .subscribe(
        data => {
          this.orgs = data._items;
          this.dataReady = true;
        },
        err => console.error(err)
      );

  }

  public update(event) {

    this.selectedChange.emit(this.selected);
    this.change.emit(true);
  }

}
