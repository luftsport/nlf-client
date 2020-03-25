import { Component, OnInit } from '@angular/core';
import { ApiNlfClubsService } from 'app/api/api-nlf-clubs.service';
import { ApiLocationsService } from 'app/api/api-locations.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';


@Component({
  selector: 'nlf-organization-locations-edit',
  templateUrl: './organization-locations-edit.component.html',
  styleUrls: ['./organization-locations-edit.component.css']
})
export class NlfOrganizationLocationsEditComponent implements OnInit {

  org_id: number;
  org;
  idx: number;

  constructor(
    private orgService: ApiNlfClubsService,
    private route: ActivatedRoute,
    private locationsService: ApiLocationsService,
  ) {

    this.route.params.subscribe(params => {
      this.org_id = params['id'] ? params['id'] : 0;
      this.idx = params['idx'] ? params['idx'] : 0;

      this.getOrg();
      //this.app.setTitle(' Organization locations edit');
    });
  }

  ngOnInit() {

  }

  private getOrg() {
    this.orgService.getClub(this.org_id).subscribe(
      data => {
        this.org = data;
      },
      err => console.log(err),
      () => {}
    );
  }

}
