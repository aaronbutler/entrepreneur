import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { BmcPage } from '../pages/bmc/bmc';
import { PersonasPage } from '../pages/personas/personas';
import { ProdFitPage } from '../pages/prod-fit/prod-fit';
import { HomePage } from '../pages/home/home';
import { ProjectOverviewPage } from '../pages/project-overview/project-overview';
import { ProjectModalPage } from '../pages/project-modal/project-modal';
import { GroupModalPage } from '../pages/group-modal/group-modal';

import { BasicHeaderComponent } from '../components/basic-header/basic-header';

import { AuthData } from '../providers/auth-data';
import { AccessService } from '../providers/access-service';
import { ProjectService } from '../providers/project-service';
import { ImageService } from '../providers/image-service';
import { PersonaService } from '../providers/persona-service';
import { StatusService } from '../providers/status-service';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

export const firebaseConfig = {
    apiKey: "AIzaSyAnrqhDrwOsVslGlmNvUcwnnA41-UsVMTI",
    authDomain: "entre-de2b0.firebaseapp.com",
    databaseURL: "https://entre-de2b0.firebaseio.com",
    storageBucket: "entre-de2b0.appspot.com",
    messagingSenderId: "593190042025"
  };

  const myFirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
  }

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    BmcPage,
    PersonasPage,
    ProdFitPage,
    HomePage,
    ProjectOverviewPage,
    ProjectModalPage,
    GroupModalPage,
    BasicHeaderComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Page1,
    Page2,
    BmcPage,
    PersonasPage,
    ProdFitPage,
    ProjectOverviewPage,
    ProjectModalPage,
    GroupModalPage
  ],
  providers: [AuthData, AccessService, ProjectService, ImageService, PersonaService, StatusService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
