import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { AppContainer } from '../shared/components/app-container/app-container';
import { NavInterceptor } from '../shared/services/nav-interceptor';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp  {
  @ViewChild('nav') nav: NavController;
  rootPage:any;
  mainPage:any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, navInt: NavInterceptor) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // Subscribes to the nav stream. Handles navigation after middleware authorizes
      navInt.$navObserver.subscribe( page => {
          this.navigate( page );
      });
      if( localStorage.getItem('TestToken') == null ) {
        this.rootPage = LoginPage;
      } else {
        this.rootPage = AppContainer;
      }
    });
  }

  // If you were previously logged in, bypass login screen
  // ngOnInit() {
  //   if( localStorage.getItem('TestToken') == 'TestToken') {
  //     this.rootPage = this.mainPage;
  //   }
  // }

  // Custom navigate implementation
  navigate( page: any ) {
      if( page == 'clear') {
        this.nav.popToRoot();
      } else {
        this.nav.push( page );        
      }
  }

}
