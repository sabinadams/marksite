import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { RoundButtonMenu } from '../shared/components/round-button-menu/round-button-menu';
import { TabsPage } from '../shared/components/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AppContainer } from '../shared/components/app-container/app-container';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthGuard } from '../shared/services/auth-guard';
import { AuthService } from '../shared/services/auth-service';
import { BaseService } from '../shared/services/base-service';
import { HttpClient } from '../shared/services/http-interceptor';
import { NavInterceptor } from '../shared/services/nav-interceptor';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    AppContainer,
    RoundButtonMenu
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top', tabsHighlight: true})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AppContainer,
    LoginPage,
    RoundButtonMenu
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuard,
    NavInterceptor,
    HttpClient,
    AuthService,
    BaseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
