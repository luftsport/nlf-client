import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NlfOrsEditorService } from "app/ors/ors-editor/ors-editor.service";
import { ApiObservationsItem } from "app/api/api.interface";
import { E5XRiskAssessmentClass } from "app/interfaces/e5x.interface";
import { NlfUserSubjectService } from 'app/user/user-subject.service';
import { ApiUserDataSubjectItem } from 'app/api/api.interface';

@Component({
  selector: "nlf-ors-editor-e5x-risk",
  templateUrl: "./ors-editor-e5x-risk.component.html",
  styleUrls: ["./ors-editor-e5x-risk.component.css"],
})
export class NlfOrsEditorE5xRiskComponent implements OnInit {
  @Input() occurrence: any;
  @Output() occurrenceChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Input() disabled: boolean = false;

  riskMatrix = [
    {
      key: "none",
      name: "No Accident outcome",
      description: "No potential damage or injury could occur",
      effective: 1,
      limited: 1,
      minimal: 1,
      notEffective: 1,
    },
    {
      key: "minor",
      name: "Minor Injuries or damage",
      description: "Minor injuries, minor damage to aircraft",
      effective: 2,
      limited: 3,
      minimal: 20,
      notEffective: 100,
    },
    {
      key: "major",
      name: "Major Accident",
      description: "Serious injuries, major damage to the aircraft",
      effective: 10,
      limited: 21,
      minimal: 101,
      notEffective: 500,
    },
    {
      key: "catastrophic",
      name: "Catastrophic Accident",
      description: "Loss of aircraft",
      effective: 50,
      limited: 102,
      minimal: 502,
      notEffective: 2500,
    },
  ];

  effectivenessMatrix = [
    { name: "Effective", key: "effective" },
    { name: "Limited", key: "limited" },
    { name: "Minimal", key: "minimal" },
    { name: "Not Effective", key: "notEffective" },
  ];

  riskValue;
  effectivenessValue;

  observation: ApiObservationsItem;
  userData: ApiUserDataSubjectItem;

  dataReady = false;

  constructor(private userSubject: NlfUserSubjectService) {
      this.userSubject.observable.subscribe(data => this.userData = data);
  }

  ngOnInit() {

    if (!this.occurrence.entities.reportingHistory[0].attributes?.riskClassification?.value) {
      try {
        this.occurrence.entities.reportingHistory[0].attributes.riskClassification.value = undefined;
      } catch { }
    }

    this.loadEventRiskClassification();

  }

  public hasRole(role) {
    if(this.userData.acl.map((v) => v.role).indexOf(role)>-1) {
      return true;
    }

    return false;
    
  }

  public update() {
    //this.subject.update(this.observation);
    this.occurrenceChange.emit(this.occurrence);
    this.change.emit(true);
  }

  setRisk(value) {
    if (this.disabled) {
      return;
    }

    this.riskValue = value.key;
    this.updateEventRiskClassification();
  }

  setEffectiveness(value) {
    if (this.disabled) {
      return;
    }

    this.effectivenessValue = value.key;
    this.updateEventRiskClassification();
  }

  updateEventRiskClassification() {
    if (this.disabled) {
      return;
    }

    if (!this.riskValue || (!this.effectivenessValue && this.riskValue !== 'none')) {
      return;
    }

    const risk = this.riskMatrix.filter((r) => r.key === this.riskValue)[0];

    if (risk.key === 'none' && !this.effectivenessValue) {
      this.effectivenessValue = 'effective';
    }

    this.occurrence.entities.reportingHistory[0].attributes.riskClassification.value = risk[this.effectivenessValue];
    this.occurrence.entities.reportingHistory[0].attributes.riskMethodology.value = "Event Risk Classification";
    this.update();
  }

  loadEventRiskClassification() {
    console.log('Loading...');
    if (this.occurrence.entities.riskAssessment.length === 0) {
      const riskAssessment = new E5XRiskAssessmentClass().riskAssessment;
      this.occurrence.entities.riskAssessment.push(riskAssessment);
    }

    //if (!this.occurrence.entities.riskAssessment[0].attributes.riskLevel) {
    if (!this.occurrence.entities.reportingHistory[0].attributes.riskClassification.value) {
      console.log('No riskClassification value set');
      this.dataReady = true;
      return;
    }

    const riskLevel = this.occurrence.entities.reportingHistory[0].attributes.riskClassification.value;
    console.log('RISK LEVEL', riskLevel);
    const matchingRisk = this.riskMatrix.filter((r) => r.effective === riskLevel || r.limited === riskLevel || r.minimal === riskLevel || r.notEffective === riskLevel);
    if (!matchingRisk || matchingRisk.length === 0) {
      console.log('No matching risk?');

      return;
    }
    console.log('MATCHING RISK LEVEL', matchingRisk);
    this.riskValue = matchingRisk[0].key;
    if (matchingRisk[0].effective === riskLevel) {
      this.effectivenessValue = "effective";
    }
    if (matchingRisk[0].limited === riskLevel) {
      this.effectivenessValue = "limited";
    }
    if (matchingRisk[0].minimal === riskLevel) {
      this.effectivenessValue = "minimal";
    }
    if (matchingRisk[0].notEffective === riskLevel) {
      this.effectivenessValue = "notEffective";
    }

    console.log('EFFECTIVE', this.effectivenessValue);

    this.dataReady = true;
  }
}
