import { Router } from '@angular/router';
import { ApiObservationAskTextInterface, NlfConfigItem } from 'app/api/api.interface';
import { Component, Input, OnInit, AfterContentChecked, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NlfConfigService } from 'app/nlf-config.service';

@Component({
  selector: 'nlf-ors-report-ask-text',
  templateUrl: './report-ask-text.component.html',
  styleUrls: ['./report-ask-text.component.css']
})
export class NlfOrsReportAskTextComponent implements OnInit, AfterContentChecked {

  @Input() comments: ApiObservationAskTextInterface;
  @Input() activity: string;
  @Input() excludes = [];

  public roles;
  checked = false;
  public config: NlfConfigItem;

  constructor(
    public domSanitizer: DomSanitizer,
    private router: Router,
    private configService: NlfConfigService) {


  }

  ngOnInit() {
    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
        try {
          this.roles = this.config[this.activity].observation.stateRoles;
        } catch (e) {
          this.roles = { draft: 'Observatør' };
          console.log('ERR stateRoles ', e);
        }
      }
    );


    // this.comments.draft = this.comments.draft.replace(/<(?:.|\n)*?>/gm, '');
  }

  ngAfterContentChecked() {

    if (!this.checked) {
      let children = document.getElementsByClassName('macrolink');

      for (let i = 0; i < children.length; i++) {

        if (!!children[i]['attributes'] && !!children[i]['attributes']['data-url']) {
          children[i].addEventListener('click', (event: Event) => {

            if (!!event['originalTarget']['attributes']['data-url']['value']) {
              this.router.navigate([event['originalTarget']['attributes']['data-url']['value']]);
            }
          });
        }
      }
    }
  }

}
