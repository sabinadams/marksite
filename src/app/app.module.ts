import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SettingsPage } from '../pages/settings/settings';
import { MarkersPage } from '../pages/markers/markers';
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
import { Geolocation } from '@ionic-native/geolocation';
import { MapPage } from '../pages/map/map';
import { FriendFilter } from '../shared/pipes/friend-filter-pipe';
import { MapService } from '../shared/services/map-service';
import { MapModalPage } from '../pages/map/modal-page/modal-page';
import { RegisterPage } from '../pages/login/register-page/register-page';
import { ForgotPasswordPage } from '../pages/login/forgot-password/forgot-password';

@NgModule({
  declarations: [
    MyApp,
    MarkersPage,
    SettingsPage,
    TabsPage,
    LoginPage,
    AppContainer,
    MapPage,
    FriendFilter,
    MapModalPage,
    RegisterPage,
    ForgotPasswordPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top', tabsHighlight: true, mode:'md'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MarkersPage,
    SettingsPage,
    TabsPage,
    AppContainer,
    LoginPage,
    MapPage,
    MapModalPage,
    RegisterPage,
    ForgotPasswordPage
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
    Geolocation,
    MapService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
