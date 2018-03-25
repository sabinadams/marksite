import { LatLng } from '@ionic-native/google-maps';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavInterceptor } from '../../shared/services/nav-interceptor';
import { MapService } from '../../shared/services/map-service';
import { AuthService } from '../../shared/services/auth-service';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { MapModalPage } from './modal-page/modal-page';
import { Marker } from '../../shared/models/marker-model';

declare var google;
@Component({
    selector: 'map-page',
    templateUrl: 'map.html'
})
export class MapPage {
    @ViewChild('map') mapElement: ElementRef;
    centering = false;
    map: any;
    markers = [];
    mapOptions = {
      zoom: 15,
      disableDefaultUI: true,
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
    };
  

    // Should also get markers from local storage first. Place those markers, then add in any extras grabbed from DB. (Loop through DB res to find new ones/remove old ones)
    // This is so that the markers show up right away rather than having to wait for response from server
    constructor( 
      private _modalCtrl: ModalController, 
      private _alertCtrl: AlertController, public _navCtrl: NavInterceptor, 
      private geolocation: Geolocation, 
      private _mapService: MapService, public _authService: AuthService 
    ) {
      this._mapService.$locationStream.subscribe( loc => {
        let newLocation = new google.maps.LatLng(loc.lat, loc.long);
        this.map.panTo( newLocation );
      });
      this._mapService.$markerStream.subscribe( evt => {
        switch ( evt.type ) {
          case 'delete':
            this.markers.map( item => {
              if ( item.ID == evt.marker.ID ) {
                item.marker.setMap(null);
              }
            });
            this.markers = this.markers.filter( item => {
              return item.ID != evt.marker.ID;
            });
          break;
          case 'add':
            this.addMarkerToView( evt.marker );
        }
      });
    }
    
    ionViewDidLoad(){
        this._mapService.locationPoll();
        this.loadMap();
    }
     
    placeMarkerAndPanTo(latLng, map) {
      let prompt = this._alertCtrl.create({
        title: 'Place Marker?',
        inputs: [
          {
            name: 'memo',
            placeholder: 'Reminder/Memo',
            type: 'text'
          }
        ],
        buttons: [
          { text: 'Cancel', handler: () => {  console.log("Cancelled Save")}},
          {
            text: 'Save',
            handler: data => {
              let newMarker: Marker = {
                xloc: latLng.lng(),
                yloc: latLng.lat(),
                memo: data.memo,
                img: '' // will be changed
              };
              this._mapService.newMarker( newMarker ).subscribe( res => {
                if ( res.valid ) {
                  newMarker.ID = res.marker.ID;
                  let location = this.addMarkerToView( newMarker );
                  this.map.panTo(location);
                } else {
                  // Error message thing
                }
              });
            }
          }
        ]
      });
      prompt.present();
    }

    loadMap(){
      // If there is a last_location found, default the map to be there before it does any async requests
      // So that the default position at least makes sense to the user
      if ( localStorage.getItem('last_location') != undefined ) {
        let loc = JSON.parse(localStorage.getItem('last_location'));
        this.mapOptions['center'] = new google.maps.LatLng(loc.lat,loc.long);
        this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
      }
    
      // Now get the actual current position of the user
      this.geolocation.getCurrentPosition().then( resp => {
        // If you had defaulted to a position, pan to the new position
        if ( localStorage.getItem('last_location') != undefined ) {
          let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
          this.map.panTo(latLng);
        //Otherwise, set the center of the map to a new position and create the map
        } else {
          this.mapOptions['center'] = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
          this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
        }
        // Store location
        localStorage.setItem('last_location', JSON.stringify({
          lat: resp.coords.latitude,
          long: resp.coords.longitude
        }));
        //Initialize listeners and user's markers
        this.addListeners();
        this.initializeMarkers();
      }).catch( error => {
        console.log('Error getting location', error);
      })


    }
    
    addListeners() {
      this.map.addListener('click', e => {
        // Popup with detail adding/confirmation
        this.placeMarkerAndPanTo(e.latLng, this.map);
      });
    }

    initializeMarkers() {
      this._mapService.getMarkers().subscribe( data => {
        for ( let marker of data ) {
          this.addMarkerToView( marker );
        }
      });
    }

    addMarkerToView( data: Marker ): LatLng {
      let newLatLng = new google.maps.LatLng(data.yloc, data.xloc);
      let marker = new google.maps.Marker({
        position: newLatLng,
        map: this.map
      });
      marker.addListener('click', () => {
        let modal = this._modalCtrl.create(MapModalPage, {
          memo: data.memo,
          img: data.img || ''
        },{
          showBackdrop: true,
          cssClass: 'mapInfoModal'
        });
        modal.onDidDismiss(modalData => {
          if ( modalData && modalData.delete ) {
            this._mapService.deleteMarker( data ).subscribe( res => {
              console.log(res);
              // Handle Error Message
            });
          } 
        });
        modal.present();
      });
      this.markers.push({
        marker: marker,
        ID: data.ID
      });
      return newLatLng;
    }
  
    centerMap() {
      this.centering = true;
      // Now get the actual current position of the user
      this.geolocation.getCurrentPosition().then( resp => {
        // If you had defaulted to a position, pan to the new position
        let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        this.map.panTo(latLng);
        //Initialize listeners and user's markers
        this.centering = false;
      }).catch( error => {
        this.centering = false;
        console.log('Error getting location', error);
      })
    }
}