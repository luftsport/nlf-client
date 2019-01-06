import { ApiOptionsInterface } from 'app/api/api.interface';
import { Component, Input, OnInit } from '@angular/core';
import { NlfLocalStorageService } from 'app/services/storage/local-storage.service';
import { ApiObservationsService } from 'app/api/api-observations.service';
import { Router } from '@angular/router';
import { ApiClubsService } from 'app/api/api-clubs.service';
import { ApiUserService } from 'app/api/api-user.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'nlf-ors-create',
  templateUrl: './ors-create.component.html',
  styleUrls: ['./ors-create.component.css']
})
export class NlfOrsCreateComponent implements OnInit {

  @Input() layout: string; // inline, short, datetimepicker, calendar etc

  userid: number;
  bsValue: Date = new Date();
  ismeridian: boolean = false;
  mytime: Date = new Date();
  public selectedMoment = new Date();

  public clubid: string;

  clubs;
  defaultClub = '';
  clubChooser: FormControl;
  selected: string;
  dataReady = false; // render when true
  loading = false; // On create

  constructor(
    private storage: NlfLocalStorageService,
    private orsService: ApiObservationsService,
    private clubService: ApiClubsService,
    private userService: ApiUserService,
    private router: Router) { }

  ngOnInit() {
    this.clubChooser = new FormControl();
    this.getClubs();

  }

  ngAfterViewInit() {
    // Subscribe to changes!
    this.clubChooser.valueChanges
      .subscribe(club => {
        this.selected = club;
      });
  }

  public getClubs() {

    let options: ApiOptionsInterface = {
      query: {
        where: { 'active': true },
        projection: { id: 1, _id: 1, name: 1 }
      }
    };
    this.clubService.getClubs(options).subscribe(
      data => {
        this.clubs = data._items;

        this.userService.getUser(this.storage.getId(), { query: { projection: { 'settings.default_club': 1 } } })
          .subscribe(
          user => {
            if (!!user.settings.default_club) {
              this.selected = user.settings.default_club;
            }
          },
          err => console.log(err)
          );

        this.dataReady = true;

      },
      err => console.error(err)
    );

  }

  public createObservation() {
    if (this.selected === '') {
      return;
      // @TODO: alert here!
    }
    this.loading = true;
    this.orsService.create({ 'club': this.selected }).subscribe(
      data => {
        console.log(data);
        if (data._id) {

          // let options: ApiOptionsInterface = {
          //  query: {projection: {id: 1}}
          // }
          this.orsService.get(data._id).subscribe(
            obs => {
              console.log('Wey!');
              console.log(obs);
              this.router.navigateByUrl('/ors/fallskjerm/edit/' + obs.id);
            },
            err => {
              this.loading = false;
              this.router.navigateByUrl('/ors/fallskjerm/edit/' + data._id);
            }
          );
        }
      },
      err => {
        console.log(err);
        this.loading = false;
      },
      () => console.log('Created observation')
    );
  }

}
