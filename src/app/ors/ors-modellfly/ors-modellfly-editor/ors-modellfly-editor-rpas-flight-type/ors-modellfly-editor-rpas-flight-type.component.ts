import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiOptionsInterface, ApiObservationsItem, NlfConfigItem } from 'app/api/api.interface';
import { NlfConfigService } from 'app/nlf-config.service';

@Component({
  selector: 'nlf-ors-modellfly-editor-rpas-flight-type',
  templateUrl: './ors-modellfly-editor-rpas-flight-type.component.html',
  styleUrls: ['./ors-modellfly-editor-rpas-flight-type.component.css']
})
export class NlfOrsModellflyEditorRpasFlightTypeComponent implements OnInit {

  @Input() rpasFlightType: string;
  @Input() disable: boolean = false;
  @Output() rpasFlightTypeChange: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  public config: NlfConfigItem;

  constructor(private configService: NlfConfigService) { 
    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
        //this.activity_config = this.config[this.activity]
      }
    );

  }

  ngOnInit(): void {
  }

  onChange($event) {
    this.rpasFlightTypeChange.emit(this.rpasFlightType);
    this.change.emit(true);
  }

}
