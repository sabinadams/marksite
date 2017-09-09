import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavInterceptor } from '../../shared/services/nav-interceptor';
import { LoginPage } from '../login/login';
import { AuthGuard } from '../../shared/services/auth-guard';
import { AuthService } from '../../shared/services/auth-service';

import { GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html'
})
export class FriendsPage {
  map: GoogleMap;;
  constructor(public navCtrl: NavInterceptor, public _authService: AuthService ) {
  }
  
  logout() {
    this._authService.logout();
  }
 
  ngAfterViewInit() {
    this.initMap();
  }

  initMap(){
  
        this.map = new GoogleMap('map');
    
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });
    
    }
  
}
