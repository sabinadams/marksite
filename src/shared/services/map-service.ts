import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base-service';
import { Observable } from 'rxjs/Rx';
import { Geolocation } from '@ionic-native/geolocation';
import { CurrentLocation } from '../models/location-model';
import { Subject } from 'rxjs/Rx';
import { HttpClient } from '../../shared/services/http-interceptor';
import { Marker } from '../../shared/models/marker-model';

@Injectable()
export class MapService extends BaseService {
    currentLocation: CurrentLocation;
    private locationEvent = new Subject<any>();
    $locationStream = this.locationEvent.asObservable();
    constructor(  private _http: HttpClient, private geolocation: Geolocation ) { super(); }
    private markerEvent = new Subject<any>();
    $markerStream = this.markerEvent.asObservable();

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
    
    // Should also add marker to localstorage
    newMarker( data: Marker ) {
      return this._http.securePost(`${this.env.api}/markers/new`, data ).map( res => {
        let resp = res.json();
        if ( resp.valid ) {
          this.updateMarkers('add', resp.marker );
        } else {
          // Error thingy
        }
        return res.json();
      });
    }
    

    getMarkers() {
      // Should save markers to local storage
      return this._http.secureGet(`${this.env.api}/markers`).map( data => {
        let resp = data.json();
        if ( resp.valid ) {
          return resp.markers;
        } else {
          // Error thingy
          return [];
        }
      });
    }
    
    // Should delete from local storage as well
    deleteMarker( data ) {
     return this._http.securePost(`${this.env.api}/markers/delete`, {ID: data.ID}).map( res => {
       let resp = res.json();
       if ( resp.valid ) {
         this.updateMarkers('delete', data);
       } else {
         // Error thingy
       }
       return resp;
     })
    }

    updateMarkers( type, marker ) {
      this.markerEvent.next({type, marker});
    }

    sendMarkerToUser( markerID, tagQuery ) {
      return this._http.securePost(`${this.env.api}/markers/send`, { marker: markerID, tag: tagQuery.tag}).map( res => {
        console.log(res.json())
        if ( res.valid ) {
          return res.json();
        } else {
          // Error thingy
        }
        
      });
    }
}