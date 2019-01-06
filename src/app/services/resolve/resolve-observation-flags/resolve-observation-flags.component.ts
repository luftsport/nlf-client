import { Component, Input, OnInit, Inject } from '@angular/core';
import { NLF_CONFIG, NlfConfig } from 'app/nlf-config.module';

@Component({
  selector: 'nlf-resolve-observation-flags',
  templateUrl: './resolve-observation-flags.component.html',
  styleUrls: ['./resolve-observation-flags.component.css']
})
export class NlfResolveObservationFlagsComponent implements OnInit {

  @Input() flag: string;
  @Input() badge?: boolean;
  @Input() icon?: boolean;

  name: string;

  constructor(@Inject(NLF_CONFIG) private config: NlfConfig) { }

  ngOnInit() {
    try {
      this.name = this.config.observation.flags[this.flag]['label'];
    } catch (e) {
      this.name = 'Ukjent';
    }
  }

}
