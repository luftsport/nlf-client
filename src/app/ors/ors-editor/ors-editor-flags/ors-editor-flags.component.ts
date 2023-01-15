import { ApiObservationFlagsInterface, ApiObservationsItem, NlfConfigItem } from 'app/api/api.interface';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { NlfConfigService } from 'app/nlf-config.service';

import { ApiCacheService } from 'app/api/api-cache.service';
import { LungoOrganizationsService } from 'app/api/lungo-organizations.service';
import { ApiOptionsInterface } from 'app/api/api.interface';

@Component({
  selector: 'nlf-ors-editor-flags',
  templateUrl: './ors-editor-flags.component.html',
  styleUrls: ['./ors-editor-flags.component.css']
})
export class NlfOrsEditorFlagsComponent implements OnInit {

  observation: ApiObservationsItem;
  public config: NlfConfigItem;

  constructor(
    private configService: NlfConfigService,
    private subject: NlfOrsEditorService,
    private orgService: LungoOrganizationsService,
    private apiCache: ApiCacheService) {

    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
      }
    );
    this.subject.observableObservation.subscribe(
      observation => {
        this.observation = observation;

        try {
          if (!this.observation.hasOwnProperty('flags')) {
            this.observation['flags'] = {};
          }
        } catch (e) { }
      }
    );
  }

  ngOnInit() {

  }

  private school(event) {
    if (event) {
      const options: ApiOptionsInterface = {
        query: { projection: { name: 1, id: 1 } }
      };

      this.apiCache.get(['get-lungo-organization', this.observation.discipline, options.query],
        this.orgService.getOrganization(this.observation.discipline, options)).subscribe(
          data => {
            this.observation.occurrence.entities.reportingHistory[0].attributes.reportingEntity = { value: 100479, additionalText: data.name, additionalTextEncoding: 'xs:string' };
          },
          err => this.observation.occurrence.entities.reportingHistory[0].attributes.reportingEntity = { value: 100479, additionalText: 'Ukjent navn', additionalTextEncoding: 'xs:string' },
          () => { }
        );

    } else {
      this.observation.occurrence.entities.reportingHistory[0].attributes.reportingEntity = { value: 101311 };
    }
  }

  onChange(event, flag) {
    console.log('Event', event, flag);

    if (flag === 'school') {
      this.school(event);
    }

    this.subject.update(this.observation);
  }

}
