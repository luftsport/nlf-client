import { Router } from '@angular/router';
import { ApiObservationAskTextInterface, NlfConfigItem, ApiWorkflowAuditInterface } from 'app/api/api.interface';
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
  @Input() audit = [];
  @Input() activity: string;
  @Input() excludes = [];

  public roles;
  checked = false;
  public config: NlfConfigItem;

  public person_mappings = {};
  public dataReady = false;

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

        this.fixMapping();
      },
      err => { }
    );


    // this.comments.draft = this.comments.draft.replace(/<(?:.|\n)*?>/gm, '');
  }

  private fixMapping() {

    for (let i = 0; i < this.audit.length; i++) {
      if (this.audit[i].s == null && this.audit[i].d === 'draft') {
        this.person_mappings['draft'] = this.audit[i]['u'];
      }
      else if (Object.keys(this.person_mappings).indexOf(this.audit[i].s) < 0) {
        this.person_mappings[this.audit[i]['s']] = this.audit[i]['u'];
      }
    }
    this.dataReady = true;

    console.log('Preererwer', this.person_mappings);

    /**
  this.audit.forEach(
    (element) => {
      // s=source = role!
      if(Object.keys(this.person_mappings).indexOf(element.s)<0) {
        this.person_mappings[element.s] = element.u;
      }

    }
  );
  **/


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
