import { Component, OnInit } from '@angular/core';
import { ManageUserService } from '../../services/manage-user.service';
import { NgbModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent implements OnInit {
  public lstUsers=[];
  public totalCount=0;
  public currentPageNumber=1;
  public pageCount=10;
  constructor(private manageUserService:ManageUserService,private _modalService: NgbModal) { }

  ngOnInit() {
    this.manageUserService.GetAllUsers(this.currentPageNumber,this.pageCount).subscribe((x:any)=>{
      this.lstUsers=x.lstUsers;
      this.totalCount=x.totalCount;
      this.assignSerialNumbers();
    })
  }


  public assignSerialNumbers()
  {
    var startUserCount=((this.currentPageNumber-1) * this.pageCount)+1;
    this.lstUsers.forEach(user => {
      user.srNo=startUserCount;
      startUserCount++;
    });
  }
public deleteUser(userId){
    this.manageUserService.deleteUser(userId).subscribe((x:any)=>{
     
      this.lstUsers = this.lstUsers.filter(item => item.userId !== userId);
      this.assignSerialNumbers();
    })
}

public open(content,userId)
  {
      this._modalService.open(content).result.then((result) => {
        this.deleteUser(userId);
      }, (reason) => {
        
      });

  }

}
