import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SettingsPage } from '../pages/settings/settings';
import { MarkersPage } from '../pages/markers/markers';
import { FriendsPage } from '../pages/friends/friends';
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
import { GoogleMaps } from '@ionic-native/google-maps';

@NgModule({
  declarations: [
    MyApp,
    MarkersPage,
    FriendsPage,
    SettingsPage,
    TabsPage,
    LoginPage,
    AppContainer,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top', tabsHighlight: true})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MarkersPage,
    FriendsPage,
    SettingsPage,
    TabsPage,
    AppContainer,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuard,
    NavInterceptor,
    HttpClient,
    AuthService,
    BaseService,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
