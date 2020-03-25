import { Injectable } from '@angular/core';
import { ApiUserAcl } from 'app/api/api.interface';
import { ApiAclRoleInterface } from 'app/api/api.interface';
/**
This class/service should be the on-to-go-to for all localStorage requirements
A dumbed down approach which only serves as an abstraction to different storage
methods like localStorage, sessionStorage etc.
- For all authentication tokens et al
- for all other different stuff too.

structure:
- auth
  - token
  - id
  - valid Date()
- state
  - router.state
  - ...
- ors
  - [number]
    - complete ors except acl, workflow etc

**/

@Injectable()
export class NlfLocalStorageService {

  constructor() { }

  public saveUser(id: number | string, token: string, valid: Date | number | string) {

    localStorage.setItem('auth-token', String(token));
    localStorage.setItem('auth-id', String(id));
    localStorage.setItem('auth-valid', String(valid));

  }

  public saveDefaultClub(clubid: string) {
    localStorage.setItem('default-club', String(clubid));
  }

  public getDefaultClub() {
    return localStorage.getItem('default-club');
  }
  public saveSettings(settings: Object) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  public getSettings(): Object {
    if (!!localStorage.getItem('settings')) {
      return JSON.parse(localStorage.getItem('settings'));
    }
    return [];
  }

  public getSetting(key: string) {
    const settings = this.getSettings();
    return settings[key];
  }
  public saveAcl(acl: ApiAclRoleInterface[]) {
    localStorage.setItem('acl', JSON.stringify(acl));
  }

  public getAcl(): ApiAclRoleInterface[] {
    if (!!localStorage.getItem('acl')) {
      return JSON.parse(localStorage.getItem('acl'));
    }
    return [];
  }

  public saveActivities(activities: string[]) {
    localStorage.setItem('activities', JSON.stringify(activities));
  }

  public getActivities(): string[] {
    if (!!localStorage.getItem('activities')) {
      return JSON.parse(localStorage.getItem('activities'));
    }
    return [];
  }

  public hasActivity(activity: string) {

    const activities = this.getActivities();

    if (activities.indexOf(activity) > -1) {
      return true;
    }
    return false;
  }

  /**
  Deferred
  @todo: remove this! Use clearStorage instead!
  **/
  public deleteUser() {

    this.clearStorage();
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-id');
    localStorage.removeItem('auth-valid');
  }

  /**
  Verifying that there actually is a token
  Use it for client side verification without involving a http call
  **/
  public hasToken(valid?: boolean): boolean {

    if (!!localStorage.getItem('auth-token')) {

      if (valid && Date.now() > +localStorage.getItem('auth-valid')) {
        console.log('AUTH token Timeout');
        return false;
      }

      return true;
    }

    console.log('AUTH token do not exist');
    return false;
  }

  /**
  Returns user id/membership no
  If not set, return 0
  **/
  public getId(): number {

    if (!!localStorage.getItem('auth-id')) {

      return +localStorage.getItem('auth-id');
    }
    else {
      return 0;
    }

  }

  public getToken(): string {

    return localStorage.getItem('auth-token');

  }

  /**
  Slot for ors. Will only hold 1 ors at the moment!
  On save fire api call to user-localstorage
  **/
  public saveOrs(ors: any): boolean {

    try {
      localStorage.setItem('ors', JSON.stringify(ors));
      return true;
    }
    catch (e) {
      return false;
    }

  }

  public getOrs(): any {
    if (this.hasOrs()) {
      return JSON.parse(localStorage.getItem('ors'));
    }
    else {
      return false; //or {}?
    }
  }

  /**
  Removes only the ors item
  **/
  public clearOrs(): boolean {

    try {
      localStorage.removeItem('ors');
      return true;
    }
    catch (e) {
      return false;
    }
  }

  /**
  verify that we actually have an ors
  **/
  public hasOrs(): boolean {

    if (!!localStorage.getItem('ors')) {
      return true;
    }

    return false;
  }

  /**
  Needs to save the localstorage object before clearing!
  Example: logging out
  **/
  public clearStorage(): void {

    localStorage.clear();
  }

  public loadStorage(): boolean {
    //call user-localstorage and reload.
    //Not auth-* but the rest!
    return true; // if successfully loaded!
  }



}
