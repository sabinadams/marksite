import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavInterceptor } from '../../shared/services/nav-interceptor';
declare var google;
@Component({
    selector: 'map-page',
    templateUrl: 'map.html'
})
export class MapPage {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    constructor( public _navCtrl: NavInterceptor ) {}
    
    ionViewDidLoad(){
        this.loadMap();
      }
     
      loadMap(){
     
        let latLng = new google.maps.LatLng(-34.9290, 138.6010);
     
        let mapOptions = {
          center: latLng,
          zoom: 15
        }
     
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
     
      }

    logout() {
        localStorage.removeItem('TestToken');
        this._navCtrl.navigateUnprotected('clear');
    }
}