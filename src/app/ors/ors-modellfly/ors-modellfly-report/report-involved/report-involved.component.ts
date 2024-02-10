import { ApiObservationModellflyInvolvedInterface, ApiObservationsModel, NlfConfigItem } from 'app/api/api.interface';
import { Component, Input, OnInit } from '@angular/core';
import { NlfConfigService } from 'app/nlf-config.service';
import { faTruckMedical, faHouseMedicalCircleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nlf-ors-modellfly-report-involved',
  templateUrl: './report-involved.component.html',
  styleUrls: ['./report-involved.component.css']
})
export class NlfOrsModellflyReportInvolvedComponent implements OnInit {

  @Input() involved: ApiObservationModellflyInvolvedInterface;
  @Input() model: ApiObservationsModel;
  @Input() verbose = true;

  public config: NlfConfigItem;

  faTruckMedical = faTruckMedical;
  faHouseMedicalCircleExclamation = faHouseMedicalCircleExclamation;

  constructor(private configService: NlfConfigService) {
    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
      }
    );
  }

  ngOnInit() {
  }

}
