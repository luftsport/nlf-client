import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NlfOrsEditorService } from "app/ors/ors-editor/ors-editor.service";
import { ApiObservationsItem } from "app/api/api.interface";
import { E5XRiskAssessmentClass } from "app/interfaces/e5x.interface";
@Component({
  selector: "nlf-ors-editor-e5x-risk",
  templateUrl: "./ors-editor-e5x-risk.component.html",
  styleUrls: ["./ors-editor-e5x-risk.component.css"],
})
export class NlfOrsEditorE5xRiskComponent implements OnInit {
  @Output() riskAssessmentChange: EventEmitter<any> = new EventEmitter();
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

  constructor(private subject: NlfOrsEditorService) {
    this.subject.observableObservation.subscribe((observation) => {
      this.observation = observation;
      this.loadEventRiskClassification();
    });
  }

  ngOnInit() {}

  public update() {
    this.subject.update(this.observation);
  }

  setRisk(value) {
    this.riskValue = value.key;
    this.updateEventRiskClassification();
  }

  setEffectiveness(value) {
    this.effectivenessValue = value.key;
    this.updateEventRiskClassification();
  }

  updateEventRiskClassification() {
    if (!this.riskValue || (!this.effectivenessValue && this.riskValue !== 'none')) {
      return;
    }

    const risk = this.riskMatrix.filter((r) => r.key === this.riskValue)[0];

    if (risk.key === 'none' && !this.effectivenessValue) {
      this.effectivenessValue = 'effective';
    }

    if (typeof this.observation.occurrence.entities.riskAssessment[0].attributes.riskLevel !== 'object') {
      this.observation.occurrence.entities.riskAssessment[0].attributes.riskLevel = {value: undefined};
    }

    this.observation.occurrence.entities.riskAssessment[0].attributes.riskLevel.value = risk[this.effectivenessValue];
    this.observation.occurrence.entities.riskAssessment[0].attributes.riskMethod = "Event Risk Classification";
    this.update();
  }

  loadEventRiskClassification() {
    if (this.observation.occurrence.entities.riskAssessment.length === 0) {
      const riskAssessment = new E5XRiskAssessmentClass().riskAssessment;
      this.observation.occurrence.entities.riskAssessment.push(riskAssessment);
    }

    if (!this.observation.occurrence.entities.riskAssessment[0].attributes.riskLevel) {
      return;
    }

    const riskLevel = this.observation.occurrence.entities.riskAssessment[0].attributes.riskLevel.value;

    const matchingRisk = this.riskMatrix.filter((r) => r.effective === riskLevel || r.limited === riskLevel || r.minimal === riskLevel || r.notEffective === riskLevel);
    if (!matchingRisk || matchingRisk.length === 0) {
      return;
    }

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
  }
}
