import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavInterceptor } from '../../shared/services/nav-interceptor';
import { MapService } from './map-service';

declare var google;
@Component({
    selector: 'map-page',
    templateUrl: 'map.html'
})
export class MapPage {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    mapOptions: any;
    constructor( public _navCtrl: NavInterceptor, private geolocation: Geolocation, private _mapService: MapService ) {
      this._mapService.$locationStream.subscribe( loc => {
        let newLocation = new google.maps.LatLng(loc.lat, loc.long);
        this.map.panTo( newLocation );
      });
    }
    
    ionViewDidLoad(){
        this._mapService.locationPoll();
        this.loadMap();
    }
     
    placeMarkerAndPanTo(latLng, map) {
      let marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
      let newLocation = new google.maps.LatLng(latLng.lat(), latLng.lng());
      map.panTo(newLocation);
    }

    loadMap(){
    
      this.mapOptions = {
        zoom: 15,
        disableDefaultUI: true,
        // mapTypeControl: true,
        // mapTypeControlOptions: {
        //   style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        //   mapTypeIds: ['roadmap', 'terrain'],
        //   position: google.maps.ControlPosition.TOP_LEFT
        // },
        styles: [
          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#5298af'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#5298af'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#5298af'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
          }
        ]
      }
      
      if ( localStorage.getItem('last_location') != undefined ) {
        // Show some sort of loading thing over map until done finding new location
        let loc = JSON.parse(localStorage.getItem('last_location'));
        this.mapOptions['center'] = new google.maps.LatLng(loc.lat,loc.long);
        this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
        this.geolocation.getCurrentPosition().then((resp) => {
          localStorage.setItem('last_location', JSON.stringify({
            lat: resp.coords.latitude,
            long: resp.coords.longitude
          }));
          let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
          this.map.panTo(latLng);
          this.addListeners();  
          }).catch( error => {
            console.log('Error getting location', error);
          });


      } else {

        this.geolocation.getCurrentPosition().then((resp) => {
          localStorage.setItem('last_location', JSON.stringify({
            lat: resp.coords.latitude,
            long: resp.coords.longitude
          }));
          this.mapOptions['center'] = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
          this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
          this.addListeners();
          }).catch( error => {
            console.log('Error getting location', error);
          });

      }     
      
    }
  
    addListeners() {
      this.map.addListener('click', e => {
        console.log( e.latLng.lat(), e.latLng.lng())
        this.placeMarkerAndPanTo(e.latLng, this.map);
      });
    }
  
    logout() {
        localStorage.removeItem('TestToken');
        this._navCtrl.navigateUnprotected('clear');
    }

}