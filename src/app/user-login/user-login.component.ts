import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CurrentUserService } from '../../services/current-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public model={};
  public errors=[];
  public isSubmitDisable:boolean=false;
  constructor(private currentUserService:CurrentUserService,private router: Router) { }


  ngOnInit() {
  }

  public Login(){
    if(this.isSubmitDisable==true)
    {
      return;
    }
      this.isSubmitDisable=true;
      this.currentUserService.Login(this.model).subscribe((response:any)=>{
         this.isSubmitDisable=false;
         this.currentUserService.StoreUser(response);
         this.router.navigate(['/user_list']);
      },(error:any)=>{
        this.isSubmitDisable=false;
       if(error && error.error && error.error.ModelState)
       {
        let ModelState=error.error.ModelState;
        for (var key in ModelState) {
          for (var i = 0; i < ModelState[key].length; i++) {

              this.errors.push(ModelState[key][i]);
          }
      }
    }
    
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
}
