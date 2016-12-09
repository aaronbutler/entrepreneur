import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { BmcPage } from '../pages/bmc/bmc';
import { PersonasPage } from '../pages/personas/personas';
import { ProdFitPage } from '../pages/prod-fit/prod-fit';
import { HomePage } from '../pages/home/home';
import { ProjectOverviewPage } from '../pages/project-overview/project-overview';

import { StatusService } from '../providers/status-service';
import { LogService } from '../providers/log-service';

import { AngularFire } from 'angularfire2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = HomePage;
  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public af: AngularFire, public statusService: StatusService, public log: LogService) {
    this.initializeApp(af);

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      //{ title: 'Page One', component: Page1 },
      { title: 'Project Overview',component: ProjectOverviewPage},
      { title: 'Page Two', component: Page2 },
      { title: 'Business Model Canvas', component: BmcPage },
      { title: 'Personas', component: PersonasPage },
      { title: 'Product-Customer Fit', component: ProdFitPage }
    ];

  }

  initializeApp(af: AngularFire) {
    this.log.setLevel(3);
    this.log.log(1,"MyApp", "initializeApp","test low level log");
    this.log.log(5,"MyApp", "initializeApp","test high level log");
     af.auth.subscribe( user => {
        if (user) {
          //this.rootPage = HomePage;
          this.rootPage = Page2;
        } else {
          this.rootPage = Page1;
        }
      });

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

     


      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component).then((data) => {
      this.log.log(3,"MyApp","openPage",'setting root',page.component,"data",data,"statusService",this.statusService);
      
    })
    //this.nav.push(page.component);
  }

  
}
