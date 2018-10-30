import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ManageUserService } from '../../services/manage-user.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  constructor(private _manageUserService:ManageUserService ,private route:ActivatedRoute) { }
 public addEditModel:any={};
 public validExtensions="JPG,JPEG,PNG";
 public selectedPANCardDocument='';
 public selectedAadhaarCardDocument='';
 public isSubmitDisable:boolean=false;
public panCardSource="";
public aadhaarCardSource="";
public roleList:any;
public userList:any;
public PanCardUploadFile:File;
public AadhaarUploadFile:File;
public userId:string='';
ngOnInit() {

  
  
this.route.paramMap.subscribe((params: ParamMap) =>  {
  this.userId = params.get('userId');
  if(this.userId)
  {
    this._manageUserService.GetUserById(this.userId).subscribe((user:any)=>{
       console.log(user);
      this.addEditModel=user;
      if(this.addEditModel.panCardFileName)
      {
        this.panCardSource=`${environment.RESOURCE_URL}home/GetDocument?userId=${this.userId}&docTypeId=1`;
      }
      if(this.addEditModel.aadhaarCardFileName)
      {
        this.aadhaarCardSource=`${environment.RESOURCE_URL}home/GetDocument?userId=${this.userId}&docTypeId=2`;
      }
     
    });
  }
});
    this.addEditModel.superVisorId='';
    this.addEditModel.roleId='';
    this._manageUserService.GetAllSelectListForAddEditUser().subscribe((responseData:any)=>{
      
      this.roleList=responseData.roleList;
      this.userList=responseData.userList;
    });
  }

  addEditUserForm() {
    this.isSubmitDisable=true;
    console.log(this.addEditModel);
    var files=[];
    if(this.PanCardUploadFile)
    {
      files.push({docType:1,file:this.PanCardUploadFile});
    }
    if(this.AadhaarUploadFile)
    {
      files.push({docType:2,file:this.AadhaarUploadFile});
   
    }
    this._manageUserService.AddEditUser(this.addEditModel,files).subscribe(x=>{
       
        this.isSubmitDisable=false;
    });
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

  public uploadPANCardFile(event){
       
        if(!event.error)
        {
          this.PanCardUploadFile=event.file;
        }
        else
        {
          console.log(event);
        }
      
  }

  public uploadAadhaarCardFile(event)
  {
    if(!event.error)
    {
      this.AadhaarUploadFile=event.file;
    }
    else
    {
      console.log(event);
    }
  
  }
}
