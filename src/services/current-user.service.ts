import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor(private http:HttpClient,protected localStorage: LocalStorage) { 


  }

  Login(loginModel) {
   
    return this.http.post(environment.API_URL+'auth/login',loginModel);
  }

  Logout(){
    return this.http.delete(environment.API_URL+'auth/logout')
  }
  
  resetPassword(model){
    return this.http.post(environment.API_URL+`auth/sendresetpasswordlink`,model);

  }

  validateResetToken(model){
    return this.http.post(environment.API_URL+`auth/validateResetToken`,model);
  }
  setPassword(model){
    return this.http.post(environment.API_URL+`auth/setpassword`,model);

  }
  StoreUser(responseModel)
  {
     if(responseModel)
     {
         this.authenticated='true';
         this.firstName=responseModel.firstName;
         this.lastName=responseModel.lastName;
         this.userId=responseModel.userId;
         this.roleId=responseModel.roleId;
         this.roleDescription=responseModel.roleDescription;
         this.modules=responseModel.modules;
         this.userName=responseModel.userName;

     }
  }
  ClearUser(){
    this.authenticated='false';
    this.firstName=''
    this.lastName='';
    this.userId='';
    this.roleId='';
    this.roleDescription='';
    this.modules='';
    this.userName='';
  }

  get authenticated() {
    return localStorage.getItem('authenticated');
  }

  set authenticated(value) {
    localStorage.setItem('authenticated',value);
  }

  get userId(){
    return localStorage.getItem('userId');

  }
  set userId(value){
    localStorage.setItem('userId',value);
 }

 get firstName()
 {
    return localStorage.getItem('firstName');
 }
 set firstName(value)
 {
    localStorage.setItem('firstName',value);
 }

 get lastName()
 {
    return localStorage.getItem('lastName');
 }
 set lastName(value)
 {
    localStorage.setItem('lastName',value);
 }

 get userName()
 {
    return localStorage.getItem('userName');
 }
 set userName(value)
 {
    localStorage.setItem('userName',value);
 }
 
 get roleId()
 {
    return localStorage.getItem('roleId');
 }
 set roleId(value)
 {
    localStorage.setItem('roleId',value);
 }
 
 get roleDescription()
 {
    return localStorage.getItem('roleId');
 }
 set roleDescription(value)
 {
    localStorage.setItem('roleId',value);
 }

 get modules(){
   return  localStorage.getItem('moduleArray')
 }
 set modules(value){
    localStorage.setItem('moduleArray',JSON.stringify(value));
  }

  
}
