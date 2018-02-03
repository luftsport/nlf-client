import { ApiObservationComponentAttributesInterface } from './../../../api/api.interface';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { NLF_CONFIG, NlfConfig } from '../../../nlf-config.module';

@Component({
  selector: 'nlf-resolve-observation-component-attributes',
  templateUrl: './resolve-observation-component-attributes.component.html',
  styleUrls: ['./resolve-observation-component-attributes.component.css']
})
export class NlfResolveObservationComponentAttributesComponent implements OnInit {

  @Input() attributes: ApiObservationComponentAttributesInterface;
  @Input() badge?: boolean;
  @Input() icon?: boolean;


  constructor(@Inject(NLF_CONFIG) public config: NlfConfig) { }

  ngOnInit() {


  }

}
