import { Component, OnInit } from '@angular/core';
import { BackupOrRestoreService } from '../../services/backup-or-restore.service';

@Component({
  selector: 'app-backup-restore-history-list',
  templateUrl: './backup-restore-history-list.component.html',
  styleUrls: ['./backup-restore-history-list.component.css']
})
export class BackupRestoreHistoryListComponent implements OnInit {
  public lstHistory=[];
  public totalCount=0;
  public currentPageNumber=1;
  public pageCount=10;
  constructor(private backupRestoreService:BackupOrRestoreService) { }

  ngOnInit() {
     this.backupRestoreService.GetBackupHistorybyUser(this.currentPageNumber,this.pageCount).subscribe((response:any)=>{
            this.lstHistory=response.lstBackupRestoreHistoryListByUserModel;
            this.totalCount=response.totalCount;
            var startHistoryCount=((this.currentPageNumber-1) * this.pageCount)+1;
      this.lstHistory.forEach(history => {
        history.srNo=startHistoryCount;
        startHistoryCount++;
      });
     })
  }

}
