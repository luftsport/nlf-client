import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiOptionsInterface, ApiObservationsItem, NlfConfigItem } from 'app/api/api.interface';
import { NlfConfigService } from 'app/nlf-config.service';

@Component({
  selector: 'nlf-ors-modellfly-editor-rpas-type',
  templateUrl: './ors-modellfly-editor-rpas-type.component.html',
  styleUrls: ['./ors-modellfly-editor-rpas-type.component.css']
})
export class NlfOrsModellflyEditorRpasTypeComponent implements OnInit {

  @Input() rpasType: string;
  @Input() disable: boolean = false;
  @Output() rpasTypeChange: EventEmitter<any> = new EventEmitter();
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
    this.rpasTypeChange.emit(this.rpasType);
    this.change.emit(true);
  }

}
