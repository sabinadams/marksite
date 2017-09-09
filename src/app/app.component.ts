import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AppContainer } from '../pages/app-container/app-container';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {

  rootPage:any = LoginPage;
  mainPage:any = AppContainer;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  // If you were previously logged in, bypass login screen
  ngOnInit() {
    if( localStorage.getItem('TestToken') == 'TestToken') {
      this.rootPage = this.mainPage;
    }
  }

}
