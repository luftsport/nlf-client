import { Component, OnInit } from '@angular/core';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
import { ApiObservationsItem } from 'app/api/api.interface';
import {
  E5XAerodromeGeneralClass,
  E5XSeparationClass,
  E5XAerodromeWeatherReportsClass,
  E5XAirspaceClass,
  E5XAirNavigationServiceClass,
  E5XPrecipitationAndOtherWeatherPhenomenaClass,
  E5XRunwayIncursionClass,
  // Not in use
  E5XDangerousGoodsClass,
  E5XEventsClass,
  // here??
  E5XRiskAssessmentClass,
  E5XReportingHistoryClass,
  E5XNarrativeClass,
} from 'app/interfaces/e5x.interface';

@Component({
  selector: 'nlf-ors-editor-e5x-entities',
  templateUrl: './ors-editor-e5x-entities.component.html',
  styleUrls: ['./ors-editor-e5x-entities.component.css']
})
export class NlfOrsEditorE5xEntitiesComponent implements OnInit {

  observation: ApiObservationsItem;


  constructor(
    private subject: NlfOrsEditorService
  ) {

    this.subject.observableObservation.subscribe(observation => this.observation = observation);
  }

  ngOnInit() {

    // Entities
    /**
    if (this.observation.occurrence.entities.aerodromeGeneral.length === 0) {
      this.observation.occurrence.entities.aerodromeGeneral.push(new E5XAerodromeGeneralClass().aerodromeGeneral);
    }
    if (this.observation.occurrence.entities.airSpace.length === 0) {
      this.observation.occurrence.entities.airSpace.push(new E5XAirspaceClass().airSpace);
    }
    if (this.observation.occurrence.entities.precipitationAndOtherWeatherPhenomena.length === 0) {
      this.observation.occurrence.entities.precipitationAndOtherWeatherPhenomena.push(new E5XPrecipitationAndOtherWeatherPhenomenaClass().precipitationAndOtherWeatherPhenomena);
    }

    if (this.observation.occurrence.entities.separation.length === 0) {
      this.observation.occurrence.entities.separation.push(new E5XSeparationClass().separation);
    }
    if (this.observation.occurrence.entities.runwayIncursion.length === 0) {
      this.observation.occurrence.entities.runwayIncursion.push(new E5XRunwayIncursionClass().runwayIncursion);
    }
    if (this.observation.occurrence.entities.airNavigationService.length === 0) {
      this.observation.occurrence.entities.airNavigationService.push(new E5XAirNavigationServiceClass().airNavigationService);
    }

    if (this.observation.occurrence.entities.reportingHistory.length === 0) {
      this.observation.occurrence.entities.reportingHistory.push(new E5XReportingHistoryClass().reportingHistory);
    }

    if (this.observation.occurrence.entities.narrative.length === 0) {
      this.observation.occurrence.entities.narrative.push(new E5XNarrativeClass().narrative);
    }
    **/
  }

  update() {
    this.subject.update(this.observation);
  }

}
