import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base-service';
import { Observable } from 'rxjs/Rx';
import { Geolocation } from '@ionic-native/geolocation';
import { CurrentLocation } from './location-model';
import { Subject } from 'rxjs/Rx';
@Injectable()
export class MapService extends BaseService {
    currentLocation: CurrentLocation;
    private locationEvent = new Subject<any>();
    $locationStream = this.locationEvent.asObservable();
    constructor(  private geolocation: Geolocation ) { super(); }
    
    locationPoll() {
        setInterval(() => {
            this.geolocation.getCurrentPosition().then((resp) => {
              localStorage.setItem('last_location', JSON.stringify({
                lat: resp.coords.latitude,
                long: resp.coords.longitude
              }));
             }).catch((error) => {
               console.log('Error getting location', error);
             });
          }, 60000);
    }

    updateLocation( loc: CurrentLocation ) {
      this.currentLocation = loc;
      this.locationEvent.next( loc );
    }

    getLocation(): CurrentLocation {
      return this.currentLocation;
    }

}