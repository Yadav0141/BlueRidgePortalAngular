import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse
} from '@angular/common/http';


import { Observable } from 'rxjs';
import {catchError } from 'rxjs/operators';
import { Router } from '../../node_modules/@angular/router';
import { CurrentUserService } from '../services/current-user.service';
/** Pass untouched request through to the next request handler. */
@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private router: Router,private currentUser:CurrentUserService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

        const authReq = req.clone({withCredentials: true});
        return next.handle(authReq).pipe(catchError((err:HttpErrorResponse) => {
            if (err.status === 401) {
             this.currentUser.ClearUser();
             this.router.navigate(['/login']);
            }
            throw(err);
          })); 
   
  }
}