import { Component, OnInit, ViewChild } from '@angular/core';
import {BackupOrRestoreService} from '../../services/backup-or-restore.service'; 
import { FormGroup } from '@angular/forms';
import { v4 as uuid } from 'uuid';
import { SignalRConnection } from 'ng2-signalr';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-backup-or-restore',
  templateUrl: './backup-or-restore.component.html',
  styleUrls: ['./backup-or-restore.component.css']
})
export class BackupOrRestoreComponent implements OnInit {
  private _connection: SignalRConnection;
  @ViewChild('contentBackupResult') contentBackupResult:any;
  constructor(private BackupOrRestoreService:BackupOrRestoreService,private route: ActivatedRoute,
    private _modalService: NgbModal) { }
  sourceDatabases:any;
  destinationDBServers:any;
  backupOrRestoreModel:any={sourceDatabaseId:'',sourceServerId:'',sourceDatabaseSelected:''
                           ,sourceDatabaseName:'',destinationDatabaseName:''
                           ,uniqueTaskId:uuid(),destinationServerId:'' };
  isSubmitDisable:boolean=false;
  errors=[];
  backup_PercentComplete:any=0;
  myRestore_PercentComplete:any=0;
  
  ngOnInit() {
    this._connection = this.route.snapshot.data['connection'];
    this._connection.listenFor("backup_Complete").subscribe((response:any)=>{

      
    });
    this._connection.listenFor("backup_PercentComplete").subscribe((response:any)=>{
      
      if(response.taskId==this.backupOrRestoreModel.uniqueTaskId)
      {
        this.backup_PercentComplete=response.percent;
      }

    });
    this._connection.listenFor("myRestore_Complete").subscribe((response:any)=>{

    
    });
    this._connection.listenFor("myRestore_PercentComplete").subscribe((response:any)=>{
    
      if(response.taskId==this.backupOrRestoreModel.uniqueTaskId)
      {
        this.myRestore_PercentComplete=response.percent;
      }
    });

    this.BackupOrRestoreService.GetAllSourceDatabaseNames().subscribe((x:any)=>{
      this.sourceDatabases=x.sourceServerSelectList;
      this.destinationDBServers=x.destinationDBServers;
      
    
    },(error_response:any)=>{
      console.log(error_response)
      if(error_response.status==400)
      {

        this.errors=this.parseErrors(error_response);
      }
    });
  }

  //separate method for parsing errors into a single flat array
public parseErrors(response) {
  var errors = [];
  for (var key in response.error.ModelState) {
      for (var i = 0; i < response.error.ModelState[key].length; i++) {
          errors.push(response.error.ModelState[key][i]);
      }
  }
  return errors;
}

  public markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
    return true;
  }
  public TakeBackupAndRestore(){

    this.isSubmitDisable=true;
    if(this.sourceDatabases && this.sourceDatabases.length>0)
    {
      let selectedDatabase=this.sourceDatabases.filter(database => database.value==this.backupOrRestoreModel.sourceDatabaseSelected);
    
      if(selectedDatabase && selectedDatabase.length>0)
      { 
        this.backupOrRestoreModel.sourceDatabaseName=selectedDatabase[0].name;
        this.backupOrRestoreModel.sourceDatabaseId=this.backupOrRestoreModel.sourceDatabaseSelected.split('_')[1];
        this.backupOrRestoreModel.sourceServerId=this.backupOrRestoreModel.sourceDatabaseSelected.split('_')[0];
        this.backupOrRestoreModel.destinationDatabaseName=`${this.backupOrRestoreModel.sourceDatabaseName}_${this.backupOrRestoreModel.destinationDatabaseName}`;
      }
    }
   
    this.BackupOrRestoreService.TakeBackup_Restore(this.backupOrRestoreModel).subscribe(x=>{
      this._modalService.open(this.contentBackupResult);
      this.isSubmitDisable=false;

    },(error_response:any)=>{
      console.log(error_response);
      this.isSubmitDisable=false;
      if(error_response.status==400)
      {

        this.errors=this.parseErrors(error_response);
      }
    });
  }

  public open(content)
  {
      this._modalService.open(content).result.then((result) => {
        this.TakeBackupAndRestore();
      }, (reason) => {
        
      });

  }
}
