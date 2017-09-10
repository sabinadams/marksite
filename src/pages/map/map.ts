import { Component } from '@angular/core';
import { GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';
import { NavInterceptor } from '../../shared/services/nav-interceptor';
import { LoginPage } from '../login/login';
@Component({
    templateUrl: 'map.html'
})
export class MapPage {
    map: GoogleMap;
    
    constructor( public _navCtrl: NavInterceptor) {
        // console.log("Enterred Map Page")
    }
    ngAfterViewInit() {
        // console.log("Initializing app page")
        this.initMap();
    }
    
    initMap(){
        this.map = new GoogleMap('map');
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });
    }

    logout() {
        localStorage.removeItem('TestToken');
        this._navCtrl.navigateUnprotected('clear');
    }
}