import { Component, OnInit } from '@angular/core';
import { ManageUserService } from '../../services/manage-user.service';

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
  constructor(private manageUserService:ManageUserService) { }

  ngOnInit() {
    this.manageUserService.GetAllUsers(this.currentPageNumber,this.pageCount).subscribe((x:any)=>{
      this.lstUsers=x.lstUsers;
      this.totalCount=x.totalCount;
      var startUserCount=((this.currentPageNumber-1) * this.pageCount)+1;
      this.lstUsers.forEach(user => {
        user.srNo=startUserCount;
        startUserCount++;
      });
    })
  }

}
