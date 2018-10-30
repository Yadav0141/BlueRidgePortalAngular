import { Component, OnInit } from '@angular/core';
import { FormGroup } from '../../../node_modules/@angular/forms';
import { ActivatedRoute, ParamMap } from '../../../node_modules/@angular/router';
import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  public isResetTokenValid=false;
  public isSubmitDisable:boolean=false;
  public successResult='';
  public model={password:'',confirmPassword:'',resetRequestToken:''};
  public errors=[];
  public tokenmodel={resetRequestToken:''};
 
 
  constructor(private route:ActivatedRoute,private currentUser:CurrentUserService) { }

  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) =>  {
      this.tokenmodel.resetRequestToken = params.get('resetToken');
      this.model.resetRequestToken=params.get('resetToken');
      if(this.tokenmodel.resetRequestToken)
      {
        this.currentUser.validateResetToken(this.tokenmodel).subscribe((response:any)=>{
          this.isResetTokenValid=true;
         
         
        },(error)=>{
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

  public resetPassword(){
  this.isSubmitDisable=true;
  this.currentUser.setPassword(this.model).subscribe((response)=>{
    this.isSubmitDisable=false;
    this.successResult='Password Reset Successfully.';
  },(error)=>{
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
