import { Router } from '@angular/router';
import { ApiObservationAskTextInterface } from 'app/api/api.interface';
import { Component, Input, OnInit, AfterContentChecked } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'nlf-ors-fallskjerm-report-ask-text',
  templateUrl: './report-ask-text.component.html',
  styleUrls: ['./report-ask-text.component.css']
})
export class NlfOrsFallskjermReportAskTextComponent implements OnInit, AfterContentChecked {

  @Input() comments: ApiObservationAskTextInterface;
  constructor(public domSanitizer: DomSanitizer,
              private router: Router) { }

  checked = false;

  ngOnInit() {

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
