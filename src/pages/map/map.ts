import { Component, NgZone, ChangeDetectorRef} from '@angular/core';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions } from '@ionic-native/google-maps';
import { NavInterceptor } from '../../shared/services/nav-interceptor';

@Component({
    selector: 'map-page',
    templateUrl: 'map.html'
})
export class MapPage {
    map: GoogleMap;
    mapElement: HTMLElement;
    changeDetectorRefs:ChangeDetectorRef[] = [];
    constructor( private googleMaps: GoogleMaps, public _navCtrl: NavInterceptor, public zone: NgZone, public ChangeDetectorRef: ChangeDetectorRef ) {}

    ionViewDidLoad() {
        
        setTimeout(() => {
            this.initMap();
        }, 1000);
    }
    
    initMap() {
        let mapOptions: GoogleMapOptions = {
            camera: {
              target: {
                lat: 43.0741904,
                lng: -89.3809802
              },
              zoom: 18,
              tilt: 30
            }
          };

        this.mapElement = document.getElementById('map');
        this.zone.run(() => {
            this.map = this.googleMaps.create(this.mapElement, mapOptions);          
            // Wait the MAP_READY before using any methods.
               this.map.one(GoogleMapsEvent.MAP_READY)
               .then(() => {
                 console.log('Map is ready!');
                 this.changeDetectorRefs.forEach((detector) => {
                    detector.detectChanges();
                  });
               });
        });
    }
    logout() {
        localStorage.removeItem('TestToken');
        this._navCtrl.navigateUnprotected('clear');
    }
}