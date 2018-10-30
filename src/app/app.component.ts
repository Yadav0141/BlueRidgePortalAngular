import { Component } from '@angular/core';
import { CurrentUserService } from '../services/current-user.service';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BlueRidge Utility';
 
  constructor(public currentUserService:CurrentUserService,private router:Router) {
   

  }
  logout(){

    this.currentUserService.Logout().subscribe((response:any)=>{
        this.currentUserService.ClearUser();
        this.router.navigate(['/login']);
    });
  }
}
