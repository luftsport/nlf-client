import { Component, OnInit } from "@angular/core";
import {} from "@fortawesome/free-solid-svg-icons";
import { ApiObservationsItem } from "app/api/api.interface";
import { NlfOrsEditorService } from "app/ors/ors-editor/ors-editor.service";

@Component({
  selector: "nlf-ors-editor-alert",
  templateUrl: "./ors-editor-alert.component.html",
  styleUrls: ["./ors-editor-alert.component.css"],
})
export class NlfOrsEditorAlertComponent implements OnInit {
  dataReady = false;
  observation: ApiObservationsItem;

  constructor(private subject: NlfOrsEditorService) {
    this.subject.observableObservation.subscribe((observation) => {
      this.observation = observation;

      this.dataReady = true;
    });
  }

  ngOnInit() {}

  public show() {
    if (!this.observation?.flags?.aviation || this.observation.workflow.state !== "draft") {
      return false;
    }

    if (!this.observation.aircrafts || this.observation.aircrafts.length === 0 || !this.observation?.occurrence?.attributes?.locationName?.value || this.observation?.occurrence?.attributes?.locationName?.value?.trim().length === 0) {
      return true;
    }

    if (this.observation.aircrafts.length > 0) {
      if (!this.observation.aircrafts[0].flight || this.observation.aircrafts[0].flight.length === 0) {
        return true;
      }
    }

    return false;
  }
}
