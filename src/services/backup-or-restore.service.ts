import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BackupOrRestoreService {

  constructor(private http:HttpClient) { 


  }

  GetAllSourceDatabaseNames() {
    return this.http.get(environment.API_URL+'BackupOrRestore/GetAllSourceDatabaseNames');
  }
  TakeBackup_Restore(model:any){

    return this.http.post(environment.API_URL+'BackupOrRestore/Backup_Restore',model);
  }

  GetBackupHistorybyUser(pageNumber,pageCount){
    return this.http.get(environment.API_URL+`BackupOrRestore/getbackuphistorybyuser?pageNumber=${pageNumber}&pageCount=${pageCount}`);
  }
}
