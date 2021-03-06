import { Component } from '@angular/core';
import { SettingsPage } from '../../../pages/settings/settings';
import { MarkersPage } from '../../../pages/markers/markers';
import { MapPage } from '../../../pages/map/map';
import { AuthGuard } from '../../../shared/services/auth-guard';
import { NavInterceptor } from '../../../shared/services/nav-interceptor'; 
@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = MarkersPage;
  tab3Root = SettingsPage;

  constructor( public _authGuard: AuthGuard, public _navCtrl: NavInterceptor ) {

  }

  authGuard() {
     if( !this._authGuard.authenticated() ) {
       this._navCtrl.navigateUnprotected( 'clear' );
     }
  }
}
