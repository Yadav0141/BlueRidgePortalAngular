import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BackupOrRestoreComponent} from './backup-or-restore/backup-or-restore.component';
import { UserListingComponent } from './user-listing/user-listing.component';
import { Resolve } from '@angular/router';
import { SignalR, ISignalRConnection } from 'ng2-signalr';
import { Injectable } from '@angular/core';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { BlueRidgeUtilityAuthGuard } from '../authguards/blue-ridge-portal-utility-auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { BackupRestoreHistoryListComponent } from './backup-restore-history-list/backup-restore-history-list.component';

@Injectable()
export class ConnectionResolver implements Resolve<ISignalRConnection> {

    constructor(private _signalR: SignalR)  { }

    resolve() {
        console.log('ConnectionResolver. Resolving...');
        return this._signalR.connect();
    }
}


const routes: Routes = [{path:'backup',component:BackupOrRestoreComponent,resolve: { connection: ConnectionResolver },canActivate: [BlueRidgeUtilityAuthGuard]},
                        {path:'user_list',component:UserListingComponent,canActivate: [BlueRidgeUtilityAuthGuard]},
                        {path:'add_edit_user',component:AddEditUserComponent,canActivate: [BlueRidgeUtilityAuthGuard]},
                        {path:'add_edit_user/:userId',component:AddEditUserComponent,canActivate: [BlueRidgeUtilityAuthGuard]},
                        {path:'login',component:UserLoginComponent},
                        {path:'forgot_password',component:ForgotPasswordComponent},
                        {path:'resetpassword/:resetToken',component:PasswordResetComponent},
                        {path:'bkp_history',component:BackupRestoreHistoryListComponent,canActivate: [BlueRidgeUtilityAuthGuard]},
                        {path:'',redirectTo:'login', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
