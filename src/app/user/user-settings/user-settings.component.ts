import { Component, OnInit } from '@angular/core';
import { ApiUserService } from 'app/api/api-user.service';
import { ApiOptionsInterface } from 'app/api/api.interface';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NlfUserSubjectService } from 'app/user/user-subject.service';

@Component({
  selector: 'nlf-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class NlfUserSettingsComponent implements OnInit {

  model: any = {};
  user: any = {};
  render = false;

  /**
  Define our reactive form
  **/
  settingsForm: FormGroup;

  constructor(
    private userSubject: NlfUserSubjectService,
    private apiUserService: ApiUserService,
    private fb: FormBuilder) {

    this.userSubject.observable.subscribe(
      data => {
        if (!!data) {
          this.getCurrentUser(data.person_id);
          this.createForm();
        }
      }
    );
  }

  /**
  Get data from /users/this.user
  **/
  public getCurrentUser(id) {

    let options: ApiOptionsInterface = { query: { projection: { avatar: 0, acl: 1 } } };
    this.apiUserService.getUser(this.user.id, options).subscribe(
      data => {
        this.model = data;
        this.render = true;
        console.log(this.model);
        this.populateForm();

      },
      err => console.error(err),
      () => { }
    );

  }

  public setClub(discipline) {

    this.model.default_discipline = discipline;
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
