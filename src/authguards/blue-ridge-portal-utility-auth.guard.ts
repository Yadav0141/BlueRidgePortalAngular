import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Router} from '@angular/router';
import { CurrentUserService } from '../services/current-user.service';
import { Observable } from 'rxjs';
@Injectable()
export class BlueRidgeUtilityAuthGuard implements CanActivate {
  constructor(private currentUser: CurrentUserService,
    private router: Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.currentUser.authenticated=='true'){
      return true;
    }else{
      this.router.navigate(["login"]);
      return false;
    }
  }
}