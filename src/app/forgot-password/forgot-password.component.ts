import { Component, OnInit } from '@angular/core';
import { FormGroup } from '../../../node_modules/@angular/forms';
import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public isSubmitDisable:boolean=false;
  public model={emailId:''};
  public errors=[];
  public successResult='';
  constructor(private currentUser:CurrentUserService) { }

  ngOnInit() {
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

  public resetPassword(){
    if(this.isSubmitDisable)
    {
      return;
    }
    this.isSubmitDisable=true;
    this.currentUser.resetPassword(this.model).subscribe((response:any)=>{
      this.isSubmitDisable=false;
      this.successResult='A password reset email link is sent to your registered email address.';
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
}
