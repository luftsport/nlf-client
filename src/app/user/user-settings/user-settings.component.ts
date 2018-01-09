import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '../../api/api-user.service';
import { NlfLocalStorageService } from '../../services/storage/local-storage.service';
import { ApiOptionsInterface } from '../../api/api.interface';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'nlf-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class NlfUserSettingsComponent implements OnInit {

  model: any = {};
  user: any = {};

  /**
  Define our reactive form
  **/
  settingsForm: FormGroup;

  constructor(private apiUserService: ApiUserService,
              private storage: NlfLocalStorageService,
              private fb: FormBuilder) {

    this.user.id = storage.getId();
    this.getCurrentUser();
    this.createForm();
  }

  /**
  Get data from /users/this.user
  **/
  public getCurrentUser() {

    let options: ApiOptionsInterface = {query: {projection: {avatar: 0, acl: 1}}};
    this.apiUserService.getUser(this.user.id, options).subscribe(
      data => {
        this.model = data;
        console.log(this.model);
        this.populateForm();

      },
      err => console.error(err),
      () => console.log('Done')
    );

  }

  public setClub(club) {

    this.model.default_club = club;
  }

  ngOnInit() {

  }

  /**
  Build the forms
  **/
  createForm() {

    this.settingsForm = this.fb.group({
      harnessType: '',
      harnessExperience: '',
      mainCanopyType: '',
      mainCanopySize: '',
      mainCanopyExperience: '',
      reserveCanopyType: '',
      reserveCanopySize: '',
      aadType: '',
      rigger: '',
      total_jumps: '',
    });
  }

  populateForm() {
    // populate:
    this.settingsForm.setValue({
      harnessType: this.model.settings.gear.harnessType,
      harnessExperience: this.model.settings.gear.harnessExperience,
      mainCanopyType: this.model.settings.gear.mainCanopyType,
      mainCanopySize: this.model.settings.gear.mainCanopySize,
      mainCanopyExperience: this.model.settings.gear.mainCanopyExperience,
      reserveCanopyType: this.model.settings.gear.reserveCanopyType,
      reserveCanopySize: this.model.settings.gear.reserveCanopySize,
      aadType: this.model.settings.gear.aadType,
      rigger: this.model.settings.gear.rigger,
      total_jumps: this.model.settings.total_jumps
  });
  }
  get diagnostic() { return JSON.stringify(this.model); }

}
