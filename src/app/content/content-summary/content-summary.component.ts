import { Component, OnInit, Input } from '@angular/core';
import { ApiContentService } from './../../api/api-content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiOptionsInterface, ApiContentItem } from '../../api/api.interface';

@Component({
  selector: 'nlf-content-summary',
  templateUrl: './content-summary.component.html',
  styleUrls: ['./content-summary.component.css']
})
export class NlfContentSummaryComponent implements OnInit {

  @Input() key: string;

  content: ApiContentItem;
  dataReady = false;

  constructor(private apiContent: ApiContentService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.apiContent.getContent(this.key).subscribe(
      data => {
        this.content = data;
        this.content.body = this.content.body.replace(/<img[^>]*>/g, '');
      },
      err => {
        console.log(err);
        this.content = {title: 'Ikke funnet', body: err, space_key: undefined};
      },
      () => this.dataReady = true
    );

  }

}
