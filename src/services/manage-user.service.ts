import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  constructor(private http:HttpClient) { 


  }

GetAllSelectListForAddEditUser()
{
    return this.http.get(environment.API_URL+'User/GetAllSelectListForAddEditUser');
}

  GetAllUsers(pageNumber,pageCount) {
    return this.http.get(environment.API_URL+`User/GetAllUsers?pageNumber=${pageNumber}&pageCount=${pageCount}`);
  }
  AddEditUser(postData: any, files: any ){
    let formData:FormData = new FormData();
   
   // For multiple files
    for (let i = 0; i < files.length; i++) {
        formData.append(`FileType-${files[i].docType}`, files[i].file, files[i].file.name);
    }
   formData.append("model",JSON.stringify(postData));
   return this.http.post(environment.API_URL+'User/AddEditUser',formData);
  }

  GetUserById(userId:string)
  {
    return this.http.get(environment.API_URL+`User/GetUserById?userId=${userId}`);

  }
}
