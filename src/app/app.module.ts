import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, ConnectionResolver } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackupOrRestoreComponent } from './backup-or-restore/backup-or-restore.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {BackupOrRestoreService} from '../services/backup-or-restore.service'; 
import { SignalRModule } from 'ng2-signalr';
import { SignalRConfiguration } from 'ng2-signalr';
import { ObjectUnsubscribedError } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { environment } from '../environments/environment';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserListingComponent } from './user-listing/user-listing.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { FileUploadComponent } from './common/file-upload/file-upload.component';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { ManageUserService } from '../services/manage-user.service';
import { UserLoginComponent } from './user-login/user-login.component';
import { CurrentUserService } from '../services/current-user.service';
import { HeaderInterceptor } from '../Interceptors/HeaderInterceptor';
import { CookieService } from 'ngx-cookie-service';
import { BlueRidgeUtilityAuthGuard } from '../authguards/blue-ridge-portal-utility-auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
// >= v2.0.0
export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'BlueRidgePortalHub';
  c.qs = { user: uuid() };
  c.url = environment.SIGNALR_URL;
  c.logging = true;
  
  // >= v5.0.0
  c.executeEventsInZone = true; // optional, default is true
  c.executeErrorsInZone = false; // optional, default is false
  c.executeStatusChangeInZone = true; // optional, default is true
  return c;
}
@NgModule({
  declarations: [
    AppComponent,
    BackupOrRestoreComponent,
    UserListingComponent,
    AddEditUserComponent,
    FileUploadComponent,
    UserLoginComponent,
    ForgotPasswordComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    SignalRModule.forRoot(createConfig),
    Ng2ImgMaxModule ,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      
    })
  ],
  providers: [BackupOrRestoreService,ManageUserService,
              CurrentUserService,ConnectionResolver,
              { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
              CookieService,BlueRidgeUtilityAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
