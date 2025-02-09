import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApiOptionsInterface } from 'app/api/api.interface';
import { LungoIntegrationService } from 'app/api/lungo-integration.service';
import { LungoPersonsService } from 'app/api/lungo-persons.service';
import { LungoCompetencesService } from 'app/api/lungo-competences.service';
import { LungoPersonsItem, LungoNIFCompetencesList, LungoNIFLicensesList, LungoCompetencesList, LungoCompetencesItem } from 'app/api/lungo.interface';
import { faExclamationTriangle, faRefresh, faUsers, faSave, faTable, faSearch, faSpinner, faCheck, faRemove, faClock } from '@fortawesome/free-solid-svg-icons';
import { error } from 'console';

@Component({
  selector: 'nlf-nif-compare',
  templateUrl: './nif-compare.component.html',
  styleUrls: ['./nif-compare.component.css']
})
export class NlfNifCompareComponent implements OnInit {

  @Input() person_id: number;
  @Output() personChanged: EventEmitter<boolean> = new EventEmitter();
  @Input() sleep: number = 10000;
  @Input() generate: boolean = true;
  @Input() showSuccess: boolean = true;


  faUsers = faUsers;
  faSave = faSave;
  faTable = faTable;
  faSearch = faSearch;
  faSpinner = faSpinner;
  faCheck = faCheck;
  faRemove = faRemove;
  faExclamationTriangle = faExclamationTriangle;
  faRefresh = faRefresh;
  faClock = faClock;

  nifCompetences = [];
  nifLicenses = [];
  competences = [];
  apiData = { competences: [], licenses: [] };

  deltaLicenses = [];
  deltaCompetences = [];
  competencesToUpdate = undefined;

  progress = '0%';

  status: string = '';
  error: string = '';

  constructor(
    private integrationService: LungoIntegrationService,
    private personService: LungoPersonsService,
    private competencesService: LungoCompetencesService
  ) { }

  ngOnInit(): void {
    this.status = 'loading';


    forkJoin(
      [
        this.integrationService.getNifCompetences(this.person_id),
        //this.integrationService.getNifLicenses(this.person_id),
        this.personService.getUser(this.person_id)
      ]
    ).subscribe(
      data => {
        this.nifCompetences = data[0]['_items']; //.map(x=>x.CompetenceId);
        //this.nifLicenses = data[1]['_items'].filter((x) => { return x.IsActive }); //.map(x=>x.LicenseId);
        this.apiData = {
          competences: data[1].competences, //.map(x=>x.id), 
          licenses: data[1].licenses, //.map(x=>x.id)
        };
      },
      err => {
        console.error(err);
        this.status = 'error';
        this.error = err;
        this.nifCompetences = [];
      },
      () => {
        this.compare()
      }
    )
  }

  compare() {
    this.status = 'comparing';
    this.deltaCompetences = this.nifCompetences.map(x => x.CompetenceId).filter(x => !this.apiData.competences.map(x => x.id).includes(x));
    this.deltaLicenses = this.nifLicenses.filter(x => !this.apiData.licenses.map(x => x.id).includes(x));
    this.getCompetencesToUpdate();
  }

  getCompetencesToUpdate() {

    let toUpdate = this.nifCompetences.filter(x => !this.apiData.competences.map(x => x.id).includes(x.id));

    const options: ApiOptionsInterface = {
      query: {
        where: {
          person_id: this.person_id,
          id: { $in: toUpdate.map(x => x.id) }
        }
      }
    };

    this.competencesService.getCompetences(options).subscribe(

      data => {
        this.competencesToUpdate = toUpdate.filter(x => !data._items.map(x => x.id).includes(x.id));

        if (this.competencesToUpdate.length > 0 && this.generate) {
          this.generateChangeMessages();
        }
        else {
          this.status = 'finished';
        }
      },
      err => console.error(err),
      () => { }
    );

  }

  generateChangeMessagePerson() {
    this.integrationService.generateChangeMessage(this.person_id, 'Person').subscribe(
      result => {
        console.log('Change message for person', result)
      },
      err => console.error('Failed sending change message for person', err),
      () => { }
    );
  }

  generateChangeMessages() {
    // this.integrationService.
    this.status = 'generate';
    this.competencesToUpdate.forEach((key, index) => {
      this.integrationService.generateChangeMessage(this.competencesToUpdate[index]['id'], 'Competence').subscribe(
        (result) => {
          this.competencesToUpdate[index]['ready'] = true;
        },
        (error) => {
          this.competencesToUpdate[index]['ready'] = false;
          this.error = error;
          this.status = 'error';
        },
        () => {
          this.status = 'reloading';

          setTimeout(() => {
            this.personChanged.next(true)
          }, this.sleep);
        }
      )
    });

  }

}
