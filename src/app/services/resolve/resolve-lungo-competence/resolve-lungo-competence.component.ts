import { Component, OnInit, Input } from '@angular/core';
import { ApiCacheService } from 'app/api/api-cache.service';
import { LungoCompetencesService } from 'app/api/lungo-competences.service';
import { ApiOptionsInterface } from 'app/api/api.interface';
import { LungoCompetencesItem } from 'app/api/lungo.interface';

@Component({
  selector: 'nlf-resolve-lungo-competence',
  templateUrl: './resolve-lungo-competence.component.html',
  styleUrls: ['./resolve-lungo-competence.component.css']
})
export class ResolveLungoCompetenceComponent implements OnInit {


  competence: LungoCompetencesItem;
  dataReady = false;

  @Input() competence_id: number;

  constructor(private competencesService: LungoCompetencesService,
              private apiCache: ApiCacheService) { }

  ngOnInit() {

    //const options: ApiOptionsInterface = {
     // query: { projection: { type_name: 1, id: 1, type_id: 1, active_in_org_id: 1 } }
    //};

    this.apiCache.get(['get-lungo-competence', this.competence_id],
      this.competencesService.getCompetence(this.competence_id)).subscribe(
        data => {
          this.competence = data;
        },
        err => console.error(err),
        () => this.dataReady = true
      );
  }

}
