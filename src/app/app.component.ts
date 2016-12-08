import { Component, ViewChild, Inject } from '@angular/core';
import { Nav, NavController, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { BmcPage } from '../pages/bmc/bmc';
import { PersonasPage } from '../pages/personas/personas';
import { ProdFitPage } from '../pages/prod-fit/prod-fit';
import { HomePage } from '../pages/home/home';
import { ProjectOverviewPage } from '../pages/project-overview/project-overview';

import { StatusService } from '../providers/status-service';

import { AngularFire } from 'angularfire2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = HomePage;
  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public af: AngularFire, public statusService: StatusService) {
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
     af.auth.subscribe( user => {
        if (user) {
          this.rootPage = HomePage;
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
      console.log('openPage setting root');
      console.log(data);
      console.log(this.statusService);
    })
    //this.nav.push(page.component);
  }

  
}
