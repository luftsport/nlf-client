import { Component, OnInit } from "@angular/core";
import {} from "@fortawesome/free-solid-svg-icons";
import { ApiObservationsItem } from "app/api/api.interface";
import { NlfOrsEditorService } from "app/ors/ors-editor/ors-editor.service";

@Component({
  selector: "nlf-ors-editor-testclub-alert",
  templateUrl: "./ors-editor-testclub-alert.component.html",
  styleUrls: ["./ors-editor-testclub-alert.component.css"],
})
export class NlfOrsEditorTestclubAlertComponent implements OnInit {
  dataReady = false;
  observation: ApiObservationsItem;

  constructor(private subject: NlfOrsEditorService) {
    this.subject.observableObservation.subscribe((observation) => {
      this.observation = observation;

      this.dataReady = true;
    });
  }

  ngOnInit() {}
}
