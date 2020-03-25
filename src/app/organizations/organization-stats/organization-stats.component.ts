import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  NlfConfigService } from 'app/nlf-config.service';
import { NlfConfigItem } from 'app/api/api.interface';


@Component({
  selector: 'nlf-organization-stats',
  templateUrl: './organization-stats.component.html',
  styleUrls: ['./organization-stats.component.css']
})
export class NlfOrganizationStatsComponent implements OnInit {

  org_id: number;
  sub;
  public config: NlfConfigItem;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private configService: NlfConfigService) {

    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;
      }
    );
    
    this.sub = this.route.parent.params.subscribe(
      params => {
        this.org_id = +params['id'];
      });

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
