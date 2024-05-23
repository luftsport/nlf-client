import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NlfUserSubjectService } from 'app/user/user-subject.service';
import { ApiUserDataSubjectItem } from 'app/api/api.interface';

@Injectable({
  providedIn: 'root'
})
export class NlfRoleGuard implements CanActivate {
  
  userData: ApiUserDataSubjectItem;

  constructor(
    private userSubject: NlfUserSubjectService
  ) {
    this.userSubject.observable.subscribe(data => this.userData = data);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let url: string = state.url;
    return this.checkUserRole(route, url);
  }

  checkUserRole(route: ActivatedRouteSnapshot, url: any){
    let userRoles = this.userData.acl.map((v) => v.role);
    const includesAny = route.data.roles.some(v=>userRoles.includes(v));
    console.log(route.data.roles, userRoles);
    if(!!route.data.roles && includesAny) {
      return true;
    }
    return false;

  }
  
}
