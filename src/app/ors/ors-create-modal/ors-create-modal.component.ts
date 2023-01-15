import { ApiOptionsInterface, NlfConfigItem } from 'app/api/api.interface';
import { Component, Input, OnInit, AfterViewInit, Inject } from '@angular/core';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { Router } from '@angular/router';
import { LungoOrganizationsService } from 'app/api/lungo-organizations.service';
import { ApiUserService } from 'app/api/api-user.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NlfUserSubjectService } from 'app/user/user-subject.service';
import { NlfAlertService } from 'app/services/alert/alert.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { NlfConfigService } from 'app/nlf-config.service';
import { NlfOrsEditorService } from 'app/ors/ors-editor/ors-editor.service';
// import { ApiObservationsItem} from 'app/api/api.interface';


@Component({
  selector: 'nlf-ors-create-modal',
  templateUrl: './ors-create-modal.component.html',
  styleUrls: ['./ors-create-modal.component.css']
})
export class NlfOrsCreateModalComponent implements OnInit {

  ENV = environment;
  public config: NlfConfigItem;

  userid: number;
  bsValue: Date = new Date();
  ismeridian = false;
  mytime: Date = new Date();
  public selectedMoment = new Date();

  public clubid: string;

  withDate = false;

  clubs;
  clubChooser: FormControl;
  selected;
  dataReady = false; // render when true
  loading = false; // On create
  settings;

  showDefault = true;
  showDefaultActivity = false;
  showAll = false;

  // observation: ApiObservationsItem;

  constructor(
    private configService: NlfConfigService,
    private orsService: ApiObservationsService,
    private orgService: LungoOrganizationsService,
    private alertService: NlfAlertService,
    private userData: NlfUserSubjectService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private subject: NlfOrsEditorService
  ) {

    this.configService.observableConfig.subscribe(
      data => {
        this.config = data;

        this.userData.observable.subscribe(
          user_data => {
            if (!!user_data && user_data.hasOwnProperty('settings')) {
              this.settings = user_data.settings;
              this.dataReady = true;
            }
          });

      }
    );



    // Need to access reset
    this.subject.observableObservation.subscribe(
      observation => {
        // this.observation = observation;
      }
    );

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Subscribe to changes!
    /**this.clubChooser.valueChanges
      .subscribe(club => {
        this.selected = club;
      });
       */
  }

  public getActivityName() {
    return this.config.inv_mapping[this.settings.default_activity];
  }

  public getORSName() {
    console.log(this.config, this.userData);
    return this.config[this.config.inv_mapping[this.settings.default_activity]]['observation']['app_name'];
  }

  public canCreateDefault() {
    try {
      return this.config[this.config.inv_mapping[this.settings.default_activity]].observation.create[this.ENV._name];
    } catch (e) {
      console.log('Error create default', e);
      return false;
    }
  }

  public getClubs() {

    const options: ApiOptionsInterface = {
      query: {
        where: {
          'main_activity.id': this.settings.default_activity,
          type_id: 14, // Gren
          is_active: true
        },
        projection: { id: 1, _id: 1, name: 1 }
      }
    };
    this.orgService.getOrganizations(options).subscribe(
      data => {
        this.clubs = data._items;
        this.dataReady = true;
      },
      err => console.error(err)
    );

  }

  public createObservation(club_id, discipline, activity) {
    //console.log('Create through modal: ', club_id, discipline, activity);
    //return;


    if (this.selected === '') {
      this.alertService.error('Ingen klubb valgt, velg klubb først', false, true, 10);
      return;
      this.loading = false;
      // @TODO: alert here!
    }
    this.loading = true;
    this.alertService.clear();

    this.orsService.create({ 'club': this.selected }).subscribe(
      data => {
        this.subject.reset();
        console.log('OBSREG Created', data);
        if (!!data._id && !!data.id) {

          this.router.navigateByUrl('/ors/' + activity + '/edit/' + data.id);
        }
      },
      err => {
        this.alertService.error('Kunne ikke opprette OBSREG: ' + err.message);
        this.loading = false;
      },
      () => console.log('Created observation')
    );
  }

}
